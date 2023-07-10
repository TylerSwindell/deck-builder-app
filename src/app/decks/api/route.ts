import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import { GathererCard, GathererUrl } from '@/types/gatherer';
import { mapCardsByQuantityToAdd } from '@/app/functions/cardFunctions';

export async function POST(request: Request) {
  console.log(`>>>${JSON.stringify(request)}`);
  try {
    const { deck, selectedColors, cardsByQuantity } =
      await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    const { data: newDeck, error: newDeckError } = await supabase
      .from('decks')
      .insert({
        comander_id: deck.commanderId,
        deck_format: deck.selectedFormat,
        name: deck.deckName,
        notes: deck.deckNotes,
        oathbreaker_id: deck.oathbreakerId,
        signature_spell_id: deck.signatureSpellId,
        user_id: user?.id,
      })
      .select();

    if (newDeckError) throw newDeckError;

    if (newDeck[0]) {
      const { id } = newDeck[0];
      console.log(id);
      const { data: version, error: versionError } = await supabase
        .from('deck_version')
        .select()
        .eq('deck_id', id);

      const colorArray = selectedColors.map((color: number) => {
        return { color_id: color, deck_id: id };
      });

      const { data: colorsData, error: colorsError } = await supabase
        .from('decks_colors')
        .insert(colorArray);
      if (colorsError) throw colorsError;
      console.log(version);
      if (version !== null) {
        const cardsToAdd = mapCardsByQuantityToAdd(
          cardsByQuantity,
          id,
          version[0].id
        );

        const { data: cardsData, error: cardsError } = await supabase
          .from('decks_cards')
          .insert(cardsToAdd);
        if (cardsError) throw cardsError;

        console.log(cardsData);
      }
    }

    return NextResponse.json(newDeck);
  } catch (e: any) {
    return new Response(JSON.stringify(e), { status: 401 });
  }
}

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export async function POST(request: Request) {
  console.log(`>>>${JSON.stringify(request)}`);
  try {
    const { deck, selectedColors } = await request.json();
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

    if (newDeck) {
      const colorArray = selectedColors.map((color: number) => {
        return { color_id: color, deck_id: newDeck[0].id };
      });

      const { data: colorsData, error: colorsError } = await supabase
        .from('decks_colors')
        .insert(colorArray);
      if (colorsError) throw colorsError;
    }

    return NextResponse.json(newDeck);
  } catch (e: any) {
    return new Response(JSON.stringify(e), { status: 401 });
  }
}

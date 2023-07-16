import React from 'react';
import { Deck, Format, Card, Database } from '../../types/supabase'; // Import the defined types
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getCardsInDeck } from '../functions/cardFunctions';
import { GathererCard } from '@/types/gatherer';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DeckDeleteButton from './deckDeleteButton';
import CardTooltip from './cardTooltip';

const DeckComponent: React.FC<{ id: number }> = async ({ id }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  let { data: deck, error: deckError } = await supabase
    .from('decks')
    .select(
      `
      user_id,
      comander_id,
      deck_format,
      id,
      name,
      oathbreaker_id,
      signature_spell_id             
      `
    )
    .eq('id', id)
    .single();

  const { data: cards, error } = await supabase.rpc(
    'get_deck_cards',
    {
      deck_id_param: id,
    }
  );
  const gathererCards = await getCardsInDeck(
    cards?.map((card) => card.multiverse_id) || []
  );
  console.log('>>> gatherer cards');
  console.log(gathererCards);

  let { data: format, error: formatError } = await supabase
    .from('decks_formats')
    .select(`*`)
    .eq('id', deck?.deck_format)
    .single();

  if (error || formatError) {
    throw error;
  }

  if (deck && format && gathererCards) {
    return (
      <div className="p-4 bg-gray-100 rounded shadow-md sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          {deck.name}
        </h2>
        {user?.id === deck.user_id && (
          <div>
            <Link
              className="jaceNeonText"
              href={`/decks/${deck.id}/edit`}
            >
              Edit
            </Link>{' '}
            <DeckDeleteButton deckId={id} />
          </div>
        )}
        <p className="text-sm sm:text-base">
          <span className="font-bold">Deck ID:</span> {deck.id}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Format:</span>{' '}
          {format.format_name}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Has Commander:</span>{' '}
          {format.has_commander ? 'Yes' : 'No'}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Has Oathbreaker:</span>{' '}
          {format.has_oath_breaker ? 'Yes' : 'No'}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Has Signature Spell:</span>{' '}
          {format.has_signature_spell ? 'Yes' : 'No'}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Card Limit:</span>{' '}
          {format.card_limit}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Allow Rares:</span>{' '}
          {format.allow_rares ? 'Yes' : 'No'}
        </p>
        <h3 className="text-lg sm:text-xl font-bold mt-4">Cards:</h3>
        <ul className="list-disc ml-8">
          {gathererCards.map((card: GathererCard) => (
            <li>
              <CardTooltip key={card.id} imageUrl={card.imageUrl}>
                {card.name}
              </CardTooltip>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default DeckComponent;

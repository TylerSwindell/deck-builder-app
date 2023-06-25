import React from 'react';
import { Deck, Format, Card } from '../../types/supabase'; // Import the defined types
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getCardsInDeck } from '../functions/cardFunctions';
import { GathererCard } from '@/types/gatherer';

const DeckComponent: React.FC<{ id: number }> = async ({ id }) => {
  const supabase = createServerComponentClient({ cookies });

  let { data, error } = await supabase
    .from('decks')
    .select(
      `
            user_id,
              comander_id,
              created_at,
              deck_format,
              id,
              last_updated,
              name,
              oathbreaker_id,
              signature_spell_id,
              decks_cards (
                  deck_id,
                  gatherer_id,
                  multiverse_id,
                  id
              ),
              decks_formats: deck_format (
                  allow_rares,
                  card_limit,
                  format_name,
                  has_commander,
                  has_oath_breaker,
                  has_signature_spell,
                  id    
              )
              `
    )
    .eq('id', id)
    .single();

  const deck = { ...data };
  const ids: number[] | undefined = data?.decks_cards.map((card) => {
    return card.multiverse_id as number;
  });

  console.log(ids);
  const cards = await getCardsInDeck(ids || []);

  console.log(cards);
  let { data: format, error: formatError } = await supabase
    .from('decks_formats')
    .select(
      `
              allow_rares,
              card_limit,
              format_name,
              has_commander,
              has_oath_breaker,
              has_signature_spell,
              id    
            `
    )
    .eq('id', data?.deck_format)
    .single();

  if (error || formatError) {
    console.log(error);
    throw error;
  }

  if (deck && format && cards) {
    return (
      <div className="p-4 bg-gray-100 rounded shadow-md sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          {deck.name}
        </h2>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Deck ID:</span> {deck.id}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Created At:</span>{' '}
          {deck.created_at}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Last Updated:</span>{' '}
          {deck.last_updated}
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
          {cards.map((card: GathererCard) => (
            <li key={card.id}>{card.name}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default DeckComponent;

import React from 'react';
import DecksTable from '../components/decksTable';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { cookies } from 'next/headers';

const DeckBuilder = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: decks, error: deckError } = await supabase
    .from('decks')
    .select(
      `
        user_id,
              comander_id,
              deck_format,
              id,
              name,
              oathbreaker_id,
              signature_spell_id,
              notes,
              decks_colors ( * )
              `
    );

  if (decks === null) return <DecksTable decks={[]} />;

  return <DecksTable decks={decks} />;
};

export default DeckBuilder;

'use client';
import DeckComponent from '@/app/components/deckComponent';
import { Card, Deck, Format } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useCallback, useEffect, useState } from 'react';

const DeckPage = ({ params }: { params: { id: number } }) => {
  const [deck, setDeck] = useState<undefined | Deck>(undefined);
  const [format, setFormat] = useState<undefined | Format>(undefined);
  const [cards, setCards] = useState<undefined | Card[]>(undefined);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  const getDeck = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from('decks')
        .select(
          `
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
        .eq('id', params.id)
        .single();

      if (error) {
        console.log(error);
        throw error;
      }

      if (data) {
        console.log(data);
        setDeck({
          comander_id: data.comander_id,
          created_at: data.created_at,
          deck_format: data.deck_format,
          id: data.id,
          last_updated: data.last_updated,
          name: data.name,
          oathbreaker_id: data.oathbreaker_id,
          signature_spell_id: data.signature_spell_id,
          user_id: null,
        });
        setCards(data.decks_cards);
        setFormat(data.decks_formats);
      }
      setLoading(false);
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [deck, supabase]);

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <div className="container mx-auto py-8">
      {deck && format && cards && (
        <DeckComponent deck={deck} format={format} cards={cards} />
      )}
    </div>
  );
};

export default DeckPage;

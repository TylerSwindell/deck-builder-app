import React from 'react';
import { Deck, Format, Card } from '../../types/supabase'; // Import the defined types

const DeckComponent: React.FC<{
  deck: Deck;
  format: Format;
  cards: Card[];
}> = ({ deck, format, cards }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{deck.name}</h2>
      <p>
        <span className="font-bold">Deck ID:</span> {deck.id}
      </p>
      <p>
        <span className="font-bold">Created At:</span>{' '}
        {deck.created_at}
      </p>
      <p>
        <span className="font-bold">Last Updated:</span>{' '}
        {deck.last_updated}
      </p>
      <p>
        <span className="font-bold">Format:</span>{' '}
        {format.format_name}
      </p>
      <p>
        <span className="font-bold">Has Commander:</span>{' '}
        {format.has_commander ? 'Yes' : 'No'}
      </p>
      <p>
        <span className="font-bold">Has Oathbreaker:</span>{' '}
        {format.has_oath_breaker ? 'Yes' : 'No'}
      </p>
      <p>
        <span className="font-bold">Has Signature Spell:</span>{' '}
        {format.has_signature_spell ? 'Yes' : 'No'}
      </p>
      <p>
        <span className="font-bold">Card Limit:</span>{' '}
        {format.card_limit}
      </p>
      <p>
        <span className="font-bold">Allow Rares:</span>{' '}
        {format.allow_rares ? 'Yes' : 'No'}
      </p>
      <h3 className="text-lg font-bold mt-4">Cards:</h3>
      <ul className="list-disc ml-8">
        {cards.map((card) => (
          <li key={card.id}>{card.gatherer_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeckComponent;

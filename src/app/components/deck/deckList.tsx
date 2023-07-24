'use client';

import { SetStateAction, useState } from 'react';
import DeckVersionFilter from './deckVersionFilter';
import { GathererCard } from '@/types/gatherer';
import CardTooltip from '../cardTooltip';
import { json } from 'stream/consumers';

type DeckListProps = {
  versions:
    | {
        created_at: string | null;
        deck_id: number | null;
        id: string;
        losses: number | null;
        wins: number | null;
      }[]
    | null;
  deck: {
    [versionId: string]: {
      id: number;
      multiverse_id: number;
      number_of_copies: number | null;
      gathererCard: GathererCard | undefined;
    }[];
  };
};

const DeckList: React.FC<DeckListProps> = ({ versions, deck }) => {
  console.log(`>>>${JSON.stringify(deck)}`);
  const [deckVersion, setDeckVersion] = useState<string | null>(
    versions && versions.length > 0 ? versions[0].id : null
  );
  return (
    <div>
      <DeckVersionFilter
        versions={versions}
        setDeckVersion={setDeckVersion}
        defaultValue={deckVersion}
      />
      {deckVersion && (
        <ul className="list-disc ml-8">
          {deck[deckVersion].map((card) => (
            <li>
              <CardTooltip
                key={card.id}
                imageUrl={card.gathererCard?.imageUrl || ''}
              >
                {card.gathererCard?.name}
              </CardTooltip>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeckList;

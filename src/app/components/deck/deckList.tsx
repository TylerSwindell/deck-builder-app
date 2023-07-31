'use client';

import { useEffect, useState } from 'react';
import DeckVersionFilter from './deckVersionFilter';
import { GathererCard } from '@/types/gatherer';
import CardTooltip from '../cardTooltip';
import VictoryTracker from './VictoryTracker';

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
  const [deckVersionArr, setDeckVersionArr] = useState(
    versions || []
  );
  const [deckVersion, setDeckVersion] = useState<string | null>(
    versions && versions.length > 0 ? versions[0].id : null
  );
  const selectedVersion = versions?.find(
    (version) => version.id === deckVersion
  );

  useEffect(() => {
    console.log(`>>>${JSON.stringify(selectedVersion)}`);
  }, [selectedVersion]);

  const updateWinsAndLossesCallback = (
    wins: number,
    losses: number,
    versionId: string
  ): void => {
    let version = deckVersionArr.find(
      (version) => version.id === versionId
    );
    if (version) {
      version.losses = losses;
      version.wins = wins;

      const allOtherDecks = deckVersionArr.filter(
        (version) => version.id !== versionId
      );

      setDeckVersionArr([...allOtherDecks, version]);
    }
  };

  return (
    <div>
      <DeckVersionFilter
        versions={versions}
        setDeckVersion={setDeckVersion}
        defaultValue={deckVersion}
      />
      {deckVersion && selectedVersion && (
        <VictoryTracker
          updateWinsAndLossesCallback={updateWinsAndLossesCallback}
          wins={selectedVersion?.wins || 0}
          losses={selectedVersion?.losses || 0}
          versionId={deckVersion}
          deckId={selectedVersion.deck_id || 0}
        />
      )}
      {deckVersion && (
        <ul className="list-disc ml-8">
          {deck[deckVersion].map((card) => (
            <li key={card.id}>
              <CardTooltip
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

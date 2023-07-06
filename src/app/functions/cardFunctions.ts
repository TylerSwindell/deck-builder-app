import { GathererCard } from '@/types/gatherer';

export async function fetchCard(id: number): Promise<GathererCard> {
  const res = await fetch(
    `http://api.magicthegathering.io/v1/cards/${id}`
  ).catch((e) => {
    console.log(JSON.stringify(e));
    throw e;
  });
  const card = await res.json();
  return card.card;
}

function filterDuplicateCards(cards: GathererCard[]): GathererCard[] {
  const uniqueCards: { [name: string]: GathererCard } = {};

  for (const card of cards) {
    if (
      !uniqueCards[card.name] ||
      card.multiverseid > uniqueCards[card.name].multiverseid
    ) {
      uniqueCards[card.name] = card;
    }
  }

  const sortedCards = Object.values(uniqueCards).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sortedCards;
}

export async function fetchCardsByName(
  name: string
): Promise<GathererCard[]> {
  const res = await fetch(
    `https://api.magicthegathering.io/v1/cards?name=${name}&contains=imageUrl|multiverseid`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).catch((e) => {
    console.log(JSON.stringify(e));
    throw e;
  });
  const card = await res.json();
  return filterDuplicateCards(card.cards);
}

export async function getCardsInDeck(
  ids: number[]
): Promise<GathererCard[]> {
  const fetchPromises = ids.map(async (id) => {
    const card = await fetchCard(id);
    return card;
  });

  const cards = await Promise.all(fetchPromises);
  return cards;
}

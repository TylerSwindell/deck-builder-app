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

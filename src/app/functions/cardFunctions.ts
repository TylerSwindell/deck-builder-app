import { GathererCard } from '@/types/gatherer';

export async function fetchCard(id: number): Promise<GathererCard> {
  const res = await fetch(
    `http://api.magicthegathering.io/v1/cards/${id}`
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const card = await res.json();
  return card.card;
}

export async function getCardsInDeck(
  ids: number[]
): Promise<GathererCard[]> {
  const fetchPromises = ids.map(async (id) => {
    const card = await fetchCard(id);
    console.log(card.name);
    return card;
  });

  const cards = await Promise.all(fetchPromises);
  console.log('>>>cards');
  console.log(cards);
  return cards;
}

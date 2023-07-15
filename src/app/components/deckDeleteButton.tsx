'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const DeckDeleteButton = ({ deckId }: { deckId: number }) => {
  const router = useRouter();

  const deleteHandler = async () => {
    const res = await fetch(
      `${location.origin}/decks/api/${deckId}`,
      {
        method: 'DELETE',
      }
    );
    if (res.status === 204 || res.status === 200) {
      router.push(`${location.origin}/dashboard`);
      router.refresh();
    } else console.log(`error: ${JSON.stringify(res)}`);
  };

  return (
    <button type="submit" onClick={deleteHandler}>
      Delete
    </button>
  );
};

export default DeckDeleteButton;

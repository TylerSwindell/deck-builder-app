'use client';
import React from 'react';

const DeckDeleteButton = ({ deckId }: { deckId: number }) => {
  const deleteHandler = async () => {
    const res = await fetch(
      `${location.origin}/decks/api/${deckId}`,
      {
        method: 'DELETE',
      }
    );
    if (res.status === 204 || res.status === 200) {
      alert('deleted');
    } else console.log(`error: ${JSON.stringify(res)}`);
  };

  return (
    <button type="submit" onClick={deleteHandler}>
      Delete
    </button>
  );
};

export default DeckDeleteButton;

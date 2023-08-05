"use client";
import React from "react";
import { useRouter } from "next/navigation";

const DeckForkButton = ({
  deckId,
}: {
  deckId: number;
  versionId: string;
  userId: string;
}) => {
  const router = useRouter();

  const forkHandler = async () => {
    console.log("forked");
    // const res = await fetch(
    //   `${location.origin}/decks/api/${deckId}`,
    //   {
    //     method: "DELETE",
    //   }
    // );
    // if (res.status === 204 || res.status === 200) {
    //   router.push(`${location.origin}/dashboard`);
    //   router.refresh();
    // } else console.log(`error: ${JSON.stringify(res)}`);
  };

  return (
    <button
      type="submit"
      onClick={() => {
        if (confirm("Are you sure you want to fork this deck?"))
          forkHandler();
      }}
    >
      Fork
    </button>
  );
};

export default DeckForkButton;

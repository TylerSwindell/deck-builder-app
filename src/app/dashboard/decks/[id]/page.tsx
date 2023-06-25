import DeckComponent from '@/app/components/deckComponent';
import { Card, Deck, Format } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useCallback, useEffect, useState } from 'react';

const DeckPage = ({ params }: { params: { id: number } }) => {
  return (
    <div className="container mx-auto py-8">
      <DeckComponent id={params.id} />
    </div>
  );
};

export default DeckPage;

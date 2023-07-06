import DeckComponent from '@/app/components/deckComponent';
import { Card, Database, Deck, Format } from '@/types/supabase';
import {
  createClientComponentClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React, { useCallback, useEffect, useState } from 'react';

const DeckPage = async ({ params }: { params: { id: number } }) => {
  return (
    <div className="container mx-auto py-8">
      <DeckComponent id={params.id} />
    </div>
  );
};

export default DeckPage;

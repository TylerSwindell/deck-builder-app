import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// export async function PUT(
//   request: Request,
//   { params }: { params: { id: number } }
// ) {
//   // we will use params to access the data passed to the dynamic route
//   const deckId = params.id;
//   return new Response(
//     `Welcome to my Next application, user: ${user}`
//   );
// }

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const id = params.id;
  // we will use params to access the data passed to the dynamic route
  const { error } = await supabase.rpc('delete_deck', {
    deck_id: id,
  });

  if (error)
    return new Response(`${JSON.stringify(error)}`, { status: 400 });

  return new Response(`Deleted Deck ${params.id}`, { status: 200 });
}

import DeckComponent from '@/app/components/deckComponent';

const DeckPage = ({ params }: { params: { id: number } }) => {
  return (
    <div className="container mx-auto py-8">
      <DeckComponent id={params.id} />
    </div>
  );
};

export default DeckPage;

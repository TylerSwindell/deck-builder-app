import { fetchCardsByName } from '@/app/functions/cardFunctions';
import { GathererCard } from '@/types/gatherer';
import React, { useState, useEffect } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<GathererCard[]>(
    []
  );
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const fetchCards = async () => {
        try {
          setIsLoading(true);
          const res = await fetchCardsByName(searchTerm);
          setSearchResults(res);
          setShowResults(true);
        } catch (error) {
          console.error('Error fetching cards:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCards();
    } else {
      setShowResults(false);
      setIsLoading(false);
    }
  }, [searchTerm]);

  const handleItemClick = (multiverseId: number) => {
    console.log('Multiverse ID:', multiverseId);
    // Perform any additional logic with the multiverseId
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {showResults && (
        <div className="mt-2 max-h-80 overflow-y-auto bg-white rounded-md shadow-md">
          {searchResults.map((card, index) => (
            <div
              key={card.multiverseid}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              } py-2 px-4 cursor-pointer`}
              onClick={() => handleItemClick(card.multiverseid)}
            >
              {card.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

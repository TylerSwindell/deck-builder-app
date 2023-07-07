'use client';

import { useState } from 'react';

interface CardProps {
  name: string;
  multiverseid: number;
}

interface Props {
  items: CardProps[];
  callback: (multiverseid: number) => void;
}

const CardList: React.FC<Props> = ({ items, callback }) => {
  const [selectedNumbers, setSelectedNumbers] = useState<{
    [key: number]: number;
  }>({});

  const handleNumberChange = (
    multiverseid: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedNumber = parseInt(event.target.value);
    setSelectedNumbers((prevSelectedNumbers) => ({
      ...prevSelectedNumbers,
      [multiverseid]: selectedNumber,
    }));
  };
  return (
    <div className="bg-white rounded p-4 mt-1">
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div key={item.multiverseid} className="flex items-center">
            <div>
              <span>{item.name}</span>
            </div>
            <div className="ml-auto flex items-center">
              <select
                className="border border-gray-300 px-2 py-1 w-50"
                value={selectedNumbers[item.multiverseid] || ''}
                onChange={(event) =>
                  handleNumberChange(item.multiverseid, event)
                }
              >
                {Array.from(
                  { length: 100 },
                  (_, index) => index + 1
                ).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              <button
                className="ml-2 text-red-500"
                onClick={() => callback(item.multiverseid)}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;

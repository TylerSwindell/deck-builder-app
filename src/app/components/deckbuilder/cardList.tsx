import React from 'react';

interface CardProps {
  name: string;
  multiverseid: number;
}

interface Props {
  items: CardProps[];
  callback: (multiverseid: number) => void;
}

const CardList: React.FC<Props> = ({ items, callback }) => {
  return (
    <div className="bg-white rounded p-4 mt-1 ">
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.multiverseid}>
            <div className="flex items-center">
              <span>{item.name}</span>
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

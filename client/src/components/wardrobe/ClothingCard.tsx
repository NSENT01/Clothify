import React from 'react';

interface ClothingItem {
  id: string;
  imageUrl: string;
  name: string;
  type: string;
}

interface ClothingCardProps {
  item: ClothingItem;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item }) => {
  return (
    <div className="aspect-square group cursor-pointer relative">
      <div className="w-full h-full border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full p-2 object-contain group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        
        {/* Hover tooltip */}
        <div className="absolute bottom-2 left-2 right-2 bg-black/80 text-white text-xs font-medium p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <p className="truncate">{item.name}</p>
          <p className="text-xs text-gray-300 truncate">{item.type}</p>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;
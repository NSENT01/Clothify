import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload } from "react-icons/fi";
import ClothingCard from './ClothingCard';

interface ClothingItem {
  id: string;
  uploadItem: string; 
  title: string;
  clothingType: string;
}

interface ClothingGridProps {
  onUploadClick: () => void;
  selectedCategory: string;
}

const ClothingGrid: React.FC<ClothingGridProps> = ({ onUploadClick, selectedCategory }) => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    {/* Fetch items from your backend */}
    axios.post('/api/images/image_retrieval/', {}, { withCredentials: true })
      .then(res => setClothingItems(res.data))
      .catch(err => console.error(err));
  }, []);

  {/* Filter items based on selected category */}
  const filteredItems = clothingItems.filter(item => item.clothingType === selectedCategory);

  const backendUrl = "http://localhost:8000";

  const getImageUrl = (uploadItem: string) => {
    if (uploadItem.startsWith('http')) return uploadItem;
    if (uploadItem.startsWith('/media/')) return `${backendUrl}${uploadItem}`;
    {/* If the backend returns just "user_images/filename.png" */}
    return `${backendUrl}/${uploadItem}`;
  };

  return (
    <div className="flex-1 relative border border-stone-200 rounded-lg bg-white text-stone-500 p-4 shadow">
      <div className="grid grid-cols-7 gap-4 auto-rows-fr">
        {/* Upload Button */}
        <div className="aspect-square">
          <button
            onClick={onUploadClick}
            className="w-full h-full flex flex-col items-center justify-center gap-2 border border-stone-300 bg-[#f5f5f4] text-stone-800 rounded-lg shadow hover:bg-[#eaeae8] transition-colors group"
          >
            <FiUpload className="w-8 h-8 text-stone-600 group-hover:text-stone-800 transition-colors" />
            <span className="text-xs font-medium text-center px-2">Add Item</span>
          </button>
        </div>

        {/* Clothing Items - Filtered by category */}
        {filteredItems.map((item) => (
          <ClothingCard
            key={item.id}
            item={{
              id: item.id,
              imageUrl: getImageUrl(item.uploadItem),
              name: item.title,
              type: item.clothingType
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothingGrid;
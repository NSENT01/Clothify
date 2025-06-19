import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiaRandomSolid } from "react-icons/lia";
import { MdSaveAlt } from "react-icons/md";
import ClothingGrid from './ClothingGrid';
import axios from "axios";

type ClothingItem = {
  id: number;
  clothingType: 'Tops' | 'Bottoms' | 'Outerwear';
  uploadItem: string; 
};

const categories = ["Tops", "Bottoms", "Outerwear"];

export default function WardBody() {
  interface ItemUpload {
    uploadItem: File | null;
    title: string;
    clothingType: string;
  }
  const backendUrl = "http://localhost:8000";

  const [selectedCategory, setSelectedCategory] = useState("Tops");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [itemImage, setItemImage] = useState<ItemUpload>({uploadItem: null, clothingType: "", title: ""});


  {/* Update form data changes before upload is clicked */}
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemImage(prev => ({ ...prev, uploadItem: e.target.files?.[0] || null }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemImage(prev => ({ ...prev, title: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemImage(prev => ({ ...prev, clothingType: e.target.value }));
  };

  {/* Appends state variables to form data, preserving file format of the image and sending it to upload view in backend */}
  const handleCreateImage = async () => {
    try {
      const formData = new FormData();
      if (itemImage.uploadItem) {
        formData.append("uploadItem", itemImage.uploadItem);
      }
      formData.append("title", itemImage.title);
      formData.append("clothingType", itemImage.clothingType);

      const clothingItem = await axios.post(
        "/api/images/image_upload/",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(clothingItem.data);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data);
      } else if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  {/* initialize state variables used in randomizer */}
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [topItem, setTopItem] = useState<ClothingItem | null>(null);
  const [bottomItem, setBottomItem] = useState<ClothingItem | null>(null);
  const [outItem, setOutItem] = useState<ClothingItem | null>(null);

  useEffect(() => {
    {/* Fetch Items from Backend */}
    axios.post('/api/images/image_retrieval/', {}, { withCredentials: true })
      .then(res => {
        console.log('Fetched clothing items: ', res.data)
        setClothingItems(res.data)
      })
      .catch(err => console.error(err));
  }, []);

  const getRandomItem = (items: ClothingItem[]) =>
    items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null;

  const [isRandomizing, setIsRandomizing] = useState(false);

  const randomizeAll = async () => {
    setIsRandomizing(true);
    
    { /* Small Delay */}
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tops = clothingItems.filter(item => 
      item.clothingType === 'Tops'
    );
    const bottoms = clothingItems.filter(item => 
      item.clothingType === 'Bottoms'
    );
    const outerwear = clothingItems.filter(item => 
      item.clothingType === 'Outerwear'
    );

    console.log('Randomizing with:', { 
      tops: tops.length, 
      bottoms: bottoms.length, 
      outerwear: outerwear.length 
    });

    setTopItem(getRandomItem(tops));
    setBottomItem(getRandomItem(bottoms));
    setOutItem(getRandomItem(outerwear));
    
    setIsRandomizing(false);
  };

  
  {/* clothing item pop-up on click of upload button */}
  const handleUploadClick = () => {
    setShowUploadModal(true);
    console.log('Upload button clicked');
  }

  return (
    <div className="flex flex-row h-screen bg-[#f5f5f4] text-stone-800 px-6 py-4">
      {/* Outfit Display Area on the Left */}
      <div className="w-1/4 h-full border-2 border-stone-600 rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center justify-between">
        <div className="flex flex-row items-baseline justify-between w-full mb-4">
          <button onClick={randomizeAll} className="cursor-pointer w-11 h-11 flex items-center border border-stone-300 justify-center bg-white text-stone-800 rounded-lg shadow hover:bg-[#eaeae8] transition">
            <LiaRandomSolid className={`w-5 h-5 ${isRandomizing ? 'animate-spin' : ''}`} />
          </button>
          <h2 className="text-xl font-semibold text-stone-600">
            Outfit Preview
          </h2>
          <button className="cursor-pointer w-11 h-11 flex items-center border border-stone-300 justify-center bg-white text-stone-800 rounded-lg shadow hover:bg-[#eaeae8] transition">
            <MdSaveAlt className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 w-full border border-stone-200 bg-[#fafaf9] rounded-lg flex flex-col item-center text-stone-400 shadow-inner">
          {/* Top section - outerwear and top */}
          <div className="relative w-full h-3/5 flex justify-end items-center -mb-16">
            {/* Outerwear */}
            <div className="absolute left-0 w-2/3 h-full flex justify-end items-center z-20">
              {outItem ? (
                <img
                  src={`${backendUrl}/${outItem.uploadItem}`}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-stone-300 text-sm"> </div>
              )}
            </div>
            
            {/* Top */}
            <div className="absolute right-0 w-2/3 h-full flex justify-end items-center z-10">
              {topItem ? (
                <img
                  src={`${backendUrl}/${topItem.uploadItem}`}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-stone-300 text-sm"> </div>
              )}
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="w-full h-1/2 flex justify-center items-center -mt-22">
            {bottomItem ? (
              <img
                src={`${backendUrl}/${bottomItem.uploadItem}`}
                alt=""
                className="max-w-full max-h-full object-contain p-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="text-stone-300 text-sm"> </div>
            )}
          </div>
          
          
        </div>
      </div>

      {/* Horizontal Category Nav to the Right of Display */}
      <div className="flex flex-col justify-start flex-1 ml-8">
        <div className="relative flex flex-row justify-start items-center gap-3 mb-6 px-4 py-2 bg-white rounded-2xl border border-stone-200 shadow">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => {
                setSelectedCategory(category);
              }}
              className={`
                relative px-5 py-2 text-lg font-semibold rounded-full cursor-pointer z-10 transition
                ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-stone-800"
                }
              `}
              style={{ minWidth: 110, textAlign: "center" }}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 bg-stone-700 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Clothing Grid Area */}
        <ClothingGrid 
          onUploadClick={handleUploadClick} 
          selectedCategory={selectedCategory}
        />

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4 border border-stone-300">
                <h3 className="text-lg font-semibold text-black">
                  Upload New Item
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-stone-300 rounded px-3 py-2"
                />
                <select
                  value={itemImage.clothingType}
                  onChange={handleCategoryChange}
                  className="w-full border border-stone-300 rounded px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      disabled={cat === "Outfits"}
                      hidden={cat === "Outfits"}  
                    >
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Enter item name"
                  value={itemImage.title}
                  onChange={handleTitleChange}
                  className="w-full border border-stone-300 rounded px-3 py-2"
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-stone-400 rounded hover:bg-stone-500 text-white"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      handleCreateImage();
                      setShowUploadModal(false);
                      setItemImage({ uploadItem: null, clothingType: "", title: "" });
                    }}
                    className="px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-600"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
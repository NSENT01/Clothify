import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload } from "react-icons/fi";

const categories = ["Tops", "Bottoms", "Outerwear", "Accessories"];


export default function WardBody() {
    const [selectedCategory, setSelectedCategory] = useState("Tops");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemCategory, setItemCategory] = useState(selectedCategory);
    const [itemImage, setItemImage] = useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemImage(e.target.files && e.target.files[0]);
    };

    return (
        <div className="flex flex-row h-screen bg-[#f5f5f4] text-stone-800 px-6 py-4">
        {/* Outfit Display Area on the Left */}
        <div className="w-1/4 h-full border-2 border-stone-600 rounded-2xl shadow-lg bg-white p-4 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-stone-600 mb-4">Outfit Preview</h2>
            <div className="flex-1 w-full border border-stone-300 bg-[#fafaf9] rounded-lg flex flex-col justify-center items-center text-stone-400">
            Selected items will appear here
            </div>
        </div>

        {/* Horizontal Category Nav to the Right of Display */}
        <div className="flex flex-col justify-start flex-1 ml-6">
            <div className="relative flex flex-row justify-start items-center space-x-4 mb-6 px-4 py-1 bg-white rounded-xl border border-stone-300 shadow-inner">
                {categories.map((category) => (
                    <div
                    key={category}
                    onClick={() => {setSelectedCategory(category); setItemCategory(category);}}
                    className="relative px-4 py-2 text-lg font-medium rounded-md cursor-pointer z-10"
                    >
                    {category}
                    {selectedCategory === category && (
                        <motion.div
                        layoutId="highlight"
                        className="absolute inset-0 bg-stone-300 rounded-md -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    </div>
                ))}
            </div>

            {/* Optional Category Content Area */}
        <div className="flex-1 relative border border-stone-500 rounded-lg bg-white text-stone-500 flex items-start justify-center p-6">
          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="absolute cursor-pointer top-4 left-4 w-30 h-30 flex items-center border border-stone-400 justify-center gap-2 px-3 py-2 bg-[#f5f5f4] text-stone-400 rounded-lg shadow hover:bg-[#eaeae8] transition"
          >
            <FiUpload className="w-10 h-10"/>
          </button>

          {/* Upload Modal */}
          <AnimatePresence>
            {showUploadModal && (
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
                  <h3 className="text-lg font-semibold text-black">Upload New Item</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border border-stone-500 rounded px-3 py-2"
                  />
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="w-full border border-stone-500 rounded px-3 py-2"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full border border-stone-300 rounded px-3 py-2 "
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 bg-stone-800 rounded hover:bg-stone-600 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-[#8e8374] text-white rounded hover:bg-[#c8b9a6]"
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
        </div>
    );
}
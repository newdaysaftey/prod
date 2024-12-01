import { motion } from "framer-motion";
import { Trash2, Upload } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  variantKey: string;
  handleImageUpload: (files: File[]) => Promise<string[]>;
}

export function ImageUploader({
  images,
  onImagesChange,
  variantKey,
  handleImageUpload,
}: ImageUploaderProps) {
  const handleImageChangeInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = await handleImageUpload(Array.from(files));
      onImagesChange([...images, ...imageUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor={`images${variantKey}`}
        className="block border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
      >
        <Upload className="mx-auto h-8 w-8 mb-2 text-slate-400" />
        <span className="text-sm text-slate-500">Click to upload images</span>
        <input
          id={`images${variantKey}`}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChangeInput}
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={index}
              className="relative group rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  removeImage(index);
                }}
                className="absolute top-2 right-2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

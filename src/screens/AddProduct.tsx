import React, { useState } from "react";
import { Upload, Plus } from "lucide-react";

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    breed: "",
    age: "",
    weight: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    alert("Product added successfully!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
        <p className="text-gray-600">List your livestock for sale.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Details
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                <option value="cattle">Cattle</option>
                <option value="sheep">Sheep</option>
                <option value="goat">Goat</option>
                <option value="pig">Pig</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Breed
              </label>
              <input
                type="text"
                value={product.breed}
                onChange={(e) =>
                  setProduct({ ...product, breed: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age (months)
              </label>
              <input
                type="number"
                value={product.age}
                onChange={(e) =>
                  setProduct({ ...product, age: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                value={product.weight}
                onChange={(e) =>
                  setProduct({ ...product, weight: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload images</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {images.length} file(s) selected
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

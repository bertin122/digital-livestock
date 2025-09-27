import React, { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

interface Product {
  id: number;
  name: string;
  breed: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Holstein Cow",
      breed: "Holstein",
      price: 1500,
      stock: 5,
      description: "High milk producing Holstein cow",
      image: "/src/assets/cattle1.jpg",
    },
    {
      id: 2,
      name: "Angus Cow",
      breed: "Angus",
      price: 2000,
      stock: 3,
      description: "Premium Angus beef cow",
      image: "/src/assets/cattle2.png",
    },
    {
      id: 3,
      name: "Jersey Cow",
      breed: "Jersey",
      price: 1200,
      stock: 7,
      description: "Excellent dairy cow with high butterfat content",
      image: "/src/assets/cattle3.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    breed: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
  });

  const breeds = ["Holstein", "Angus", "Jersey", "Hereford", "Charolais"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed =
      selectedBreed === "" || product.breed === selectedBreed;
    return matchesSearch && matchesBreed;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      breed: "",
      price: 0,
      stock: 0,
      description: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      breed: product.breed,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...formData }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...formData,
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600">Manage your cow products</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.breed}</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex items-center px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex items-center px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Breed</option>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;

import React from "react";
import { Heart, Eye, ShoppingCart } from "lucide-react";

const UserFavorites: React.FC = () => {
  const favorites = [
    {
      id: 1,
      name: "Holstein Cow",
      price: "$1,200",
      image: "/src/assets/cattle1.jpg",
      breed: "Holstein",
      age: "24 months",
    },
    {
      id: 2,
      name: "Angus Bull",
      price: "$1,800",
      image: "/src/assets/cattle2.png",
      breed: "Angus",
      age: "36 months",
    },
    {
      id: 3,
      name: "Jersey Cow",
      price: "$950",
      image: "/src/assets/cattle3.jpg",
      breed: "Jersey",
      age: "18 months",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <p className="text-gray-600">Your saved livestock items.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <div className="aspect-w-1 aspect-h-1 bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/src/assets/react.svg";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600">
                {item.breed} • {item.age}
              </p>
              <p className="text-xl font-bold text-green-600 mt-2">
                {item.price}
              </p>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center justify-center space-x-1">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600">
            Start browsing and add items to your favorites.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserFavorites;

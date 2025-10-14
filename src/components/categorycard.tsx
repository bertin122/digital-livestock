import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants/urls';

// Import static cattle images
import cattle1 from '../assets/cattle1.jpg';
import cattle2 from '../assets/cattle2.png';
import cattle3 from '../assets/cattle3.jpg';

type Category = {
  id: number;
  name: string;
  photo: string;
};

type BackendCategory = {
  id: number;
  name: string;
};

// Map category names to images
const getCategoryImage = (categoryName: string): string => {
  const categoryImages: { [key: string]: string } = {
    'Cows': cattle1,
    'Bulls': cattle2,
    'Calves': cattle3,
    'Heifers': cattle1,
    'Steers': cattle2,
  };
  
  return categoryImages[categoryName] || cattle1; // Default to cattle1 if not found
};

const CategoryCard = () => {
  const [categories, setCategories] = useState<Category[]>([]); 

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories/all`)
      .then(res => res.json())
      .then((data: BackendCategory[]) => {
        // Map backend data to include photos
        const categoriesWithPhotos = data.map(category => ({
          ...category,
          photo: getCategoryImage(category.name)
        }));
        setCategories(categoriesWithPhotos);
      }) 
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className='flex   mt-[1%] gap-[1%]  border-red-400 '>

      {categories.map((category) => (
        <div key={category.id} className='w-[15%] bg-white rounded-3xl flex flex-col h-40 shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <div className='h-[75%] w-full p-2'>
            <img 
              src={category.photo} 
              alt={category.name} 
              className='h-full w-full object-cover rounded-2xl' 
              onError={(e) => {
                console.error(`Failed to load image for ${category.name}:`, category.photo);
                (e.currentTarget as HTMLImageElement).src = cattle1; // Fallback to cattle1
              }}
            />
          </div>
          <div className='h-[25%] w-full flex items-center justify-center px-2'>
            <p className='text-sm font-medium text-gray-800 text-center'>{category.name}</p>
          </div>
        </div>
      ))}

    </div>
  );
};

export default CategoryCard;

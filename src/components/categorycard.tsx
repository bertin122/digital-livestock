import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants/urls';

type Category = {
  id: number;
  name: string;
  photo: string;
};

const CategoryCard = () => {
  const [categories, setCategories] = useState<Category[]>([]); 

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories/all`)
      .then(res => res.json())
      .then((data: Category[]) => setCategories(data)) 
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className='flex   mt-[1%] gap-[1%]  border-red-400 '>

      {categories.map((category) => (
        <div key={category.id} className='w-[15%]   bg-white rounded-3xl flex flex-col h-35 '>
          <div className='h-[80%] w-full '>
            <img 
              src={category.photo} 
              alt={category.name} 
              className='h-full w-full object-cover' 
            />
          </div>
          <div className='h-[20%] w-full  flex items-center justify-center'>
            <p>{category.name}</p>
          </div>
        </div>
      ))}

    </div>
  );
};

export default CategoryCard;

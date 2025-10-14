import React from "react";
import AddCowForm from "../components/AddCowForm";

const AddProduct: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Cow</h1>
        <p className="text-gray-600">Upload images from your computer and list your cow for sale.</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Cow Details</h2>
        </div>
        <AddCowForm />
      </div>
    </div>
  );
};

export default AddProduct;

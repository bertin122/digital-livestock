import React, { useState } from "react";
import { Upload, Plus, X, Check } from "lucide-react";
import { createCow } from "../services/cows";
import { useNavigate } from "react-router-dom";

export type AddCowFormProps = {
  onSuccess?: () => void;
};

const AddCowForm: React.FC<AddCowFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    breed: "",
    age: "",
    weight: "",
    health_status: "Healthy",
    purchase_status: "available",
    discount: "0",
  });
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      await createCow({
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: Number(form.category) || 0,
        breed: form.breed.trim(),
        age: Number(form.age) || 0,
        weight: Number(form.weight) || 0,
        health_status: form.health_status.trim(),
        purchase_status: form.purchase_status.trim(),
        discount: Number(form.discount) || 0,
      }, images);

      setSuccess("Cow added successfully!");
      if (onSuccess) onSuccess(); else navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to add cow");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-center gap-2">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Id</label>
          <input name="category" value={form.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="e.g. 1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Breed</label>
          <input name="breed" value={form.breed} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age (years)</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input name="weight" type="number" value={form.weight} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount ($)</label>
          <input name="discount" type="number" value={form.discount} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Health Status</label>
          <input name="health_status" value={form.health_status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Purchase Status</label>
          <select name="purchase_status" value={form.purchase_status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="available">available</option>
            <option value="offered">offered</option>
            <option value="purchased">purchased</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload images</span>
                <input id="file-upload" name="file-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
          </div>
        </div>
        {images.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {images.map((f, i) => (
              <div key={i} className="text-xs text-gray-600 truncate">{f.name}</div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={submitting} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2 disabled:opacity-60">
          <Plus className="w-4 h-4" />
          <span>{submitting ? "Adding..." : "Add Cow"}</span>
        </button>
      </div>
    </form>
  );
};

export default AddCowForm;

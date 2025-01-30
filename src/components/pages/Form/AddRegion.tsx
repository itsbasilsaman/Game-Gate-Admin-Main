import React, { useState, useRef } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { validateRegionAndImage } from './validation';
import toast from 'react-hot-toast';

const AddRegion: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [nameAr, setNameAr] = useState<string>('');
  const [icon, setIcon] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: '',
    icon: '',
    nameAr: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitRegion = async (event: React.FormEvent) => {
    event.preventDefault();

    const { errors: validationErrors, hasError } = validateRegionAndImage(name, nameAr, icon);
    setErrors(validationErrors);

    if (!hasError) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('nameAr', nameAr);
        if (icon) formData.append('icon', icon);

        console.log("Region data being sent:", formData);

        // Replace with your actual API endpoint
        const response = await fetch('https://your-api-endpoint.com/regions', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to add region');
        }

        const data = await response.json();
        toast.success("Region Added Successfully");
        console.log('Region added successfully:', data);

        // Reset form fields
        setName('');
        setNameAr('');
        setIcon(null);
        setImagePreview(null);
        setErrors({ name: '', icon: '', nameAr: '' });
      } catch (error) {
        console.error('Error adding region:', error);
        setErrors((prev) => ({ ...prev, form: 'Failed to add region. Please try again.' }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
      if (file.size > fileSizeLimit) {
        setErrors((prev) => ({ ...prev, icon: 'Image size exceeds 5MB.' }));
      } else {
        setIcon(file);
        setImagePreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, icon: '' }));
      }
    }
  };

  const handleUpdateImage = () => fileInputRef.current?.click();
  const handleDeleteImage = () => {
    setIcon(null);
    setImagePreview(null);
    setErrors((prev) => ({ ...prev, icon: '' }));
  };

  return (
    <>
      <Breadcrumb pageName="Region Section" />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="border-b border-stroke py-4 px-6.5">
              <h3 className="font-medium text-black">Add Region</h3>
            </div>
            <form onSubmit={handleSubmitRegion}>
              <div className="p-6.5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2.5 block text-black">Region Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    placeholder="Enter region name"
                    className="w-full rounded border border-stroke py-3 px-5 text-black outline-none focus:border-primary"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2.5 block text-black">Region Name (AR) *</label>
                  <input
                    type="text"
                    value={nameAr}
                    onChange={(e) => {
                      setNameAr(e.target.value);
                      if (e.target.value) setErrors((prev) => ({ ...prev, nameAr: '' }));
                    }}
                    placeholder="Enter Arabic region name"
                    className="w-full rounded border border-stroke py-3 px-5 text-black outline-none focus:border-primary"
                  />
                  {errors.nameAr && <p className="text-red-500 text-sm">{errors.nameAr}</p>}
                </div>

                <div className="col-span-2">
                  <h3 className="mb-2.5">Upload Image *</h3>
                  <div className="flex items-center gap-3">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-20 h-20 object-cover"
                        />
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className="text-sm text-red-500 hover:underline"
                            onClick={handleDeleteImage}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                            onClick={handleUpdateImage}
                          >
                            Update
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={handleUpdateImage}
                      >
                        Upload Image
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {errors.icon && <p className="text-red-500 text-sm">{errors.icon}</p>}
                </div>
              </div>
              <div className="p-6.5">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded hover:bg-primary-dark"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      <span>Adding...</span>
                    </div>
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRegion;
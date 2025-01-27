import React, { useState } from 'react';
import { validateSubService, FormState, FormErrors } from './validation';

const SubServiceForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    subService: '',
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    purchaseType: '',
    options: [
      {
        brandId: '09eb6b41-fb99-4fc8-85f8-161e75355c8e',
        regionIds: ['08b7bbda-0fce-41e9-b296-23b7f89b122d', '15f75da2-07b2-4d7f-a498-f139703cc97c']
      },
      {
        brandId: '7b58531b-8c28-444c-84f4-74bcb2c0d02d',
        regionIds: ['08b7bbda-0fce-41e9-b296-23b7f89b122d']
      }
    ]
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { errors, hasError } = validateSubService(formState);
    setErrors(errors);

    if (!hasError) {
      console.log('Options:', formState.options);
      console.log('Form Data:', formState);

      alert('Form submitted successfully!');
      setFormState({
        subService: '',
        name: '',
        nameAr: '',
        description: '',
        descriptionAr: '',
        purchaseType: '',
        options: []
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Sub Service</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Name</label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Arabic Name */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">اسم عربي (Arabic Name)</label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.nameAr}
                  onChange={(e) => handleChange('nameAr', e.target.value)}
                />
                {errors.nameAr && <p className="text-red-500 text-sm">{errors.nameAr}</p>}
              </div>

              {/* Description */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                <textarea
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              {/* Arabic Description */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">وصف عربي (Arabic Description)</label>
                <textarea
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.descriptionAr}
                  onChange={(e) => handleChange('descriptionAr', e.target.value)}
                ></textarea>
                {errors.descriptionAr && <p className="text-red-500 text-sm">{errors.descriptionAr}</p>}
              </div>

              {/* Purchase Type */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Purchase Type</label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.purchaseType}
                  onChange={(e) => handleChange('purchaseType', e.target.value)}
                />
                {errors.purchaseType && <p className="text-red-500 text-sm">{errors.purchaseType}</p>}
              </div>

              {/* Full width button on large screens */}
              <div className="col-span-1 lg:col-span-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubServiceForm;

import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { validateProductData } from "./validation";

const ProductData: React.FC = () => {
  const [product, setProduct] = useState<{
    serviceId: string;
    brandId: string;
    title: string;
    description: string;
    titleAr: string;
    descriptionAr: string;
    purchaseType: string;
    deliveryType: string;
    subServiceId: string;
    regionId: string;
    image: File | null;
  }>({
    serviceId: "",
    brandId: "",
    title: "",
    description: "",
    titleAr: "",
    descriptionAr: "",
    purchaseType: "",
    deliveryType: "",
    subServiceId: "",
    regionId: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = ["Service 1", "Service 2", "Service 3"];
  const brands = ["Brand 1", "Brand 2", "Brand 3"];
  const purchaseTypes = ["TOP_UP", "DIGITAL_PINS", "ACCOUNTS", "GIFT_CARD"];
  const deliveryTypes = ["INSTANT_DELIVERY", "IN_GAME", "EMAIL", "COURIER"];
  const subServices = ["Sub-Service 1", "Sub-Service 2"];
  const regions = ["Region 1", "Region 2"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductData(product);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Submitted Product Data:", product);
      alert("Product submitted successfully!");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Product Section" />

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl">
          <div className="rounded border bg-white shadow-md">
            <div className="border-b py-4 px-6">
              <h3 className="font-medium text-black">Product Section</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service ID */}
                <div>
                  <label className="block text-black">
                    Service ID <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="serviceId"
                    value={product.serviceId}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.serviceId && <p className="text-red-500 text-sm">{errors.serviceId}</p>}
                </div>

                {/* Brand ID */}
                <div>
                  <label className="block text-black">
                    Brand ID <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="brandId"
                    value={product.brandId}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  {errors.brandId && <p className="text-red-500 text-sm">{errors.brandId}</p>}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-black">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    placeholder="Enter product title"
                    className="w-full border rounded py-2 px-3"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-black">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    className="w-full border rounded py-2 px-3"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Title (Arabic) */}
                <div>
                  <label className="block text-black">Title (Arabic)</label>
                  <input
                    type="text"
                    name="titleAr"
                    value={product.titleAr}
                    onChange={handleInputChange}
                    placeholder="Enter product title in Arabic"
                    className="w-full border rounded py-2 px-3"
                  />
                    {errors.titleAr && <p className="text-red-500 text-sm">{errors.titleAr}</p>}
                </div>

                {/* Description (Arabic) */}
                <div>
                  <label className="block text-black">Description (Arabic)</label>
                  <textarea
                    name="descriptionAr"
                    value={product.descriptionAr}
                    onChange={handleInputChange}
                    placeholder="Enter product description in Arabic"
                    className="w-full border rounded py-2 px-3"
                  />
                    {errors.descriptionAr && <p className="text-red-500 text-sm">{errors.descriptionAr}</p>}
                </div>

                {/* Purchase Type */}
                <div>
                  <label className="block text-black">
                    Purchase Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="purchaseType"
                    value={product.purchaseType}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">Select purchase type</option>
                    {purchaseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.purchaseType && (
                    <p className="text-red-500 text-sm">{errors.purchaseType}</p>
                  )}
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-black">
                    Delivery Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="deliveryType"
                    value={product.deliveryType}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">Select delivery type</option>
                    {deliveryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.deliveryType && (
                    <p className="text-red-500 text-sm">{errors.deliveryType}</p>
                  )}
                </div>

                {/* Sub-Service ID */}
                <div>
                  <label className="block text-black">Sub-Service ID</label>
                  <select
                    name="subServiceId"
                    value={product.subServiceId}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">Select sub-service</option>
                    {subServices.map((subService) => (
                      <option key={subService} value={subService}>
                        {subService}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region ID */}
                <div>
                  <label className="block text-black">Region ID</label>
                  <select
                    name="regionId"
                    value={product.regionId}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">Select region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-black">
                    Upload Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full border rounded py-2 px-3"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-3 w-32 h-32 object-cover"
                    />
                  )}
                  {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductData;

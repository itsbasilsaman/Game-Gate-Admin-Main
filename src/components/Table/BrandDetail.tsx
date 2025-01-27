import { useState } from 'react';
import { BrandProduct } from '../types/brandprouduct';
import ProductOne from '../../images/product/product-01.png';
// import ProductTwo from '../../images/product/product-02.png';
// import ProductThree from '../../images/product/product-03.png';
// import ProductFour from '../../images/product/product-04.png';
import { FaEdit } from "react-icons/fa";
// import Modal from './Modal';
import { Link } from 'react-router-dom';

const productData: BrandProduct[] = [
  {
    id: 1,
    image: ProductOne,
    description: 'A great watch for fitness tracking.',
    name: 'Apple Watch Series 7',
    isActive: false,
  },
  // Additional products can be added here
];

const BrandDetail = () => {
  const [products, setProducts] = useState<BrandProduct[]>(productData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  // const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');

  const handleDeleteClick = (id: number) => {
    // setSelectedProductId(id);
    setModalMessage("Are you sure you want to delete this sub-service? This will also delete any related branches.");
    setModalAction(() => () => {
      setProducts(products.filter(product => product.id !== id));
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (id: number, name: string, description: string) => {
    setIsEditing(id);
    setEditedName(name);
    setEditedDescription(description);
  };

  const handleSaveEdit = (id: number) => {
    setProducts(
      products.map(product =>
        product.id === id
          ? { ...product, name: editedName, description: editedDescription }
          : product
      )
    );
    setIsEditing(null);
  };

  const toggleActiveStatus = (id: number, isActive: boolean) => {
    // setSelectedProductId(id);
    setModalMessage(
      `Are you sure you want to ${isActive ? 'deactivate' : 'activate'} this brand?`
    );
    setModalAction(() => () => {
      setProducts(
        products.map(product =>
          product.id === id ? { ...product, isActive: !isActive } : product
        )
      );
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">Brand List</h4>
        <Link to={'/brandAdd'}>
          <button className="px-[12px] py-[8px] bg-gray-200 font-medium border-black border hover:bg-gray-100">
            Add New Brand
          </button>
        </Link>
      </div>

      {products.map((product) => (
        <div
          className="border-t border-stroke py-6 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 flex flex-col items-center"
          key={product.id}
        >
          <div className="w-full flex flex-col items-center">
            <img
              src={product.image}
              alt="Product"
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            {isEditing === product.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border p-2 rounded mb-2 w-full"
                  placeholder="Brand Name"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Brand Description"
                />
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-black dark:text-white mb-2">{product.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{product.description}</p>
              </>
            )}
          </div>
          <div className="mt-4 flex space-x-4">
            {isEditing === product.id ? (
              <button
                onClick={() => handleSaveEdit(product.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(product.id, product.name, product.description)}
                className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            )}
            <button
              onClick={() => handleDeleteClick(product.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => toggleActiveStatus(product.id, product.isActive)}
              className={`px-4 py-2 rounded-md text-white ${
                product.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              {product.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-11/12 md:w-1/3 p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 text-[22px] mx-[5px] font-semibold hover:text-gray-900"
            >
              &times;
            </button>
            <p className="text-center text-lg font-semibold mb-4">{modalMessage}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  if (modalAction) modalAction();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Continue
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandDetail;

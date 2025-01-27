import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import { useDispatch } from 'react-redux';
import { GetServiceAction } from '../../reduxKit/actions/auth/service/serviceActions';
import { FaEdit } from "react-icons/fa";
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../reduxKit/store';

const productData: Product[] = [
  {
    id: 1,
    image: ProductOne,
    name: 'Apple Watch Series 7',
  },
  {

    
    id: 2,
    image: ProductTwo,
    name: 'Macbook Pro M1',
  },
  {
    
    id: 3,
    image: ProductThree,
    name: 'Dell Inspiron 15',
  },
  {
    id: 4,
    image: ProductFour,
    name: 'HP Probook 450',
  },
];



const ServiceListSection = () => {
  const dispatch = useDispatch<AppDispatch>();





  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resultAction = await dispatch(GetServiceAction());
        if (GetServiceAction.fulfilled.match(resultAction)) {

          console.log("Profile data fetched successfully: ", resultAction.payload);
        } else {
          console.log("Failed to fetch profile: ", resultAction.payload || resultAction.error);
        }
      } catch (error) {
        console.error("Unexpected error while fetching the profile: ", error);
      }
    };

    fetchProfile();
  }, [dispatch]);
  
 











  const [products, setProducts] = useState<Product[]>(productData); // Manage products state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track which product is being edited
  const [editedName, setEditedName] = useState<string>('');

  const handleDeleteClick = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId !== null) {
      setProducts(products.filter(product => product.id !== selectedProductId)); // Remove from list
    }
    setIsModalOpen(false);
  };

  const handleEditClick = (id: number, name: string) => {
    setIsEditing(id);
    setEditedName(name);  
  };

  const handleSaveEdit = (id: number) => {
    setProducts(
      products.map(product =>
        product.id === id ? { ...product, name: editedName } : product
      )
    );
    setIsEditing(null);  
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Service List
        </h4>
        <Link to={'/addservice'}>
          <button className="px-[12px] py-[8px] bg-gray-200 font-medium border-black border hover:bg-gray-100">
            Add Service
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Service Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Delete</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Edit</p>
        </div>
      </div>

      {products.map((product) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={product.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {isEditing === product.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  product.name
                )}
              </p>
            </div>
          </div>

          <div className="col-span-2 hidden items-center sm:flex">
            <button onClick={() => handleDeleteClick(product.id)}>
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                />
              </svg>
            </button>
          </div>

          <div className="col-span-1 flex items-center cursor-pointer">
            {isEditing === product.id ? (
              <button onClick={() => handleSaveEdit(product.id)} className="text-sm text-black dark:text-white font-bold">
                Save
              </button>
            ) : (
              <FaEdit onClick={() => handleEditClick(product.id, product.name)} />
            )}
          </div>

          <div className="col-span-1 flex items-center">
            <Link to={'/subservice'}>
              <p className="text-sm text-black dark:text-white font-bold cursor-pointer underline hover:text-blue-900">
                Sub Services
              </p>
            </Link>
          </div>
        </div>
      ))}

<Modal
  isOpen={isModalOpen}
  onClose={handleModalClose}
  onDelete={handleDeleteConfirm}
  message="Are you sure you want to delete this service? This will also delete the related Sub Services"
/>

    </div>
  );
};

export default ServiceListSection;

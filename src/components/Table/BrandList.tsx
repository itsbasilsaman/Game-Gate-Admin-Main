import { useEffect, useState } from 'react';
import {   BrandProductList } from '../types/brandprouduct';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import { GetAllBrandAction } from '../../reduxKit/actions/auth/brand/brandAction';

 
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../reduxKit/store';

const productData: BrandProductList[] = [
  {
    id: 1,
    image: ProductOne,
    description: 'A great watch for fitness tracking.',
    name: 'Apple Watch Series 7',
    brandDetail : '/brand-detail'
  },
  {
    id: 2,
    image: ProductTwo,
    description: 'Powerful laptop with M1 chip.',
    name: 'Macbook Pro M1',
        brandDetail : '/brand-detail'
  },
  {
    id: 3,
    image: ProductThree,
    description: 'Budget-friendly performance laptop.',
    name: 'Dell Inspiron 15',
        brandDetail : '/brand-detail'
  },
  {
    id: 4,
    image: ProductFour,
    description: 'Reliable business laptop.',
    name: 'HP Probook 450',
        brandDetail : '/brand-detail'
  },
];

const BrandList = () => {
  const [products, setProducts] = useState<BrandProductList[]>(productData);
  const dispatch=useDispatch<AppDispatch>()
  const [brands,setBrands]=useState()
   console.log(setProducts);
   



    useEffect(() => {
       const GetBrandList = async () => {
         try {
           const resultAction = await dispatch(GetAllBrandAction());
           if (GetAllBrandAction.fulfilled.match(resultAction)) {
            setBrands(resultAction.payload);
           } else {
             console.error("Failed to fetch services: ", resultAction.payload || resultAction.error);
           }
         } catch (error) {
           console.error("Unexpected error while fetching services: ", error);
         }
       };
       GetBrandList();
     }, [dispatch]);


  if(brands){
    console.log("the brand data of fetch ***&&&", brands);
  }
 

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Brand List
        </h4>
        <Link to={'/brandAdd'}>
          <button className="px-[12px] py-[8px] bg-gray-200 font-medium border-black border hover:bg-gray-100">
            Add New Brand
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Brand </p>
        </div>
        
      </div>

      {products.map((product) => (
        <div
          className="grid   border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={product.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
               {product.name}
            </div>
          </div>

          <div className="col-span-2 hidden items-center sm:flex">
          {product.description}
          </div>
       
        <Link to={product.brandDetail} className='underline hover:text-blue-950'>
            <div className="col-span-2 hidden items-center sm:flex">
            View More
            </div>
        </Link>
         
        </div>
      ))}

 
       
    </div>
  );
};

export default BrandList;
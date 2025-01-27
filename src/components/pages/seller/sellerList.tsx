import React, { useEffect } from "react"
import { useState } from 'react';

import Modal from "../../Table/Modal";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { getAllsellersAction } from "../../../reduxKit/actions/auth/seller/sellerAction";
import { SellerMain } from "../../../interfaces/admin/seller";




const SellerList = React.memo(()=>{


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    // const [isEditing, setIsEditing] = useState<number | null>(null); // Track which product is being edited
    // const [editedName, setEditedName] = useState<string>('');
    const [seller,setSellers]= useState<SellerMain[]>([])
    const [sellerUser,setSellerUser]=useState({})
  
const dispatch= useDispatch<AppDispatch>()
const {loading}=useSelector((state:RootState)=> state.seller)



useEffect(()=>{
  console.log("|||||||||||||||||||||||, ",seller, "dfjdksf", sellerUser);
  

},[seller,sellerUser,selectedProductId])


useEffect(() => {
  const fetchSellers = async () => {
    try {
      const resultAction = await dispatch(getAllsellersAction());
      if (getAllsellersAction.fulfilled.match(resultAction)) {
       
        const sellersArray= resultAction.payload.result.data
        setSellers(sellersArray)
        setSellerUser(sellersArray.user)

        console.log("sellers data fetched successfully: ", resultAction.payload.result.data);
  
      } else {
        console.log("Failed to fetch sellers: ", resultAction.payload || resultAction.error);
      }
    } catch (error) {
      console.error("Unexpected error while fetching the seller: ", error);
    }
  };

  fetchSellers();
}, [dispatch]);
 


if(loading){
<Loading/>
}


    const handleDeleteClick = (id: string) => {
      setSelectedProductId(id);
      setIsModalOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleDeleteConfirm = () => {
      if (selectedProductId !== null) {
       console.log("select",selectedProductId);
       
      }
      setIsModalOpen(false);
    };
  
    // const handleEditClick = (id: number, name: string) => {
    //   setIsEditing(id);
    //   setEditedName(name); // Set current name for editing
    // };


  
    // const handleSaveEdit = (id: number) => {
    //   setProducts(
    //     products.map(product =>
    //       product.id === id ? { ...product, name: editedName } : product
    //     )
    //   );
    //   setIsEditing(null); // Exit edit mode
    // };
  
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
           SellerList
          </h4>
          {/* <Link to={'/forms/form-layout'}>
            <button className="px-[12px] py-[8px] bg-gray-200 font-medium border-black border hover:bg-gray-100">
              Add Service
            </button> */}
          {/* </Link> */}
        </div>
  
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Username</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">country</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">actions</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">actions</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">actions</p>
          </div>
        </div>
  
        {seller.map((seller) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={seller.userId}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
  <img 
    src={seller.user.profileImage ?? "https://via.placeholder.com/150"} 
    alt="Profile Image" 
    className="h-full w-full object-cover rounded-md" 
  />
</div>

               
              </div>
            </div>

             <p>{seller.user.country}</p>
             <p>{seller.user.userName}</p>
  
            <div className="col-span-2 hidden items-center sm:flex">
              <button onClick={() => handleDeleteClick(seller.userId)}>
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
  
            
            <div className="col-span-1 flex items-center">
            
            </div>
          </div>
        ))}
  
        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onDelete={handleDeleteConfirm}
        />
      </div>
    );
  
  
})

export default SellerList
// This is the redux included file , I want replace here with another file change other contents and only place the redux items on the component that I given


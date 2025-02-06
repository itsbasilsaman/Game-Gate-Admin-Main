import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetAllOfferAction } from "../../../reduxKit/actions/auth/offer/offerAction";

// Define TypeScript interfaces
interface Product {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  isActive: boolean;
  brand?: {
    name: string;
    nameAr: string;
    image: string;
    description: string;
    descriptionAr: string;
    isActive: boolean;
  };
  service?: {
    name: string;
    nameAr: string;
    iconUrl: string;
    isActive: boolean;
  };
  subService?: {
    name: string;
    nameAr: string;
  };
}

interface Seller {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  userName: string;
  country: string;
  profileImage: string;
  isActive: boolean;
}

interface Offer {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  unitPriceUSD: number;
  minQty: number;
  deliveryMethods: (string | number)[];
  isActive: boolean;
  status: string;
  product: Product;
  seller: Seller;
}

const GetOffer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const response = await dispatch(GetAllOfferAction());
        setOffers(response.payload.result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOffers();
  }, [dispatch]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedProductIndex, setExpandedProductIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleProductExpand = (index: number) => {
    setExpandedProductIndex(expandedProductIndex === index ? null : index);
  };

  console.log('12345', offers);
  

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 w-full">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
        Offer List
      </h4>

      <div className="grid grid-cols-1 gap-4 w-full">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="border border-stroke dark:border-strokedark p-4 rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-lg font-semibold"><span className="text-[18px] font-medium">Title : </span>{offer.title}</h5>
              <p
                className={`text-sm font-semibold ${
                  offer.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {offer.status}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <p className="text-sm text-gray-600"><span className="text-[16px] font-medium text-black">Arabic Title : </span>{offer.titleAr}</p>
              <button
                onClick={() => toggleExpand(index)}
                className="text-blue-600 hover:text-blue-800 flex justify-center items-center uppercase gap-1"
              >
                <span className="text-[14px] font-medium">
                  {expandedIndex === index ? "View Less" : "View Details"}
                </span> <FaEye />
              </button>
            </div>

            {expandedIndex === index && (
              <div className="mt-4">
                <div className="flex w-full justify-between my-3">
                  <p className="text-sm"><span className="text-[16px] font-medium">Description : </span>{offer.description}</p>
                  <p className="text-sm"><span className="text-[16px] font-medium ">Arabic Description : </span>{offer.descriptionAr}</p>
                </div>
                <div className="flex w-full justify-between my-3">
                  <p className="text-sm"><span className="text-[16px] font-medium">Price : </span>${offer.unitPriceUSD}</p>
                  <p className="text-sm"><span className="text-[16px] font-medium">Min. Quantity : </span>{offer.minQty}</p>
                </div>
                <div className="flex w-full justify-between my-3">
                  <p className="text-sm">
                  <span className="text-[16px] font-medium">Delivery Methods : </span>{offer.deliveryMethods.join(", ")}
                  </p>
                  <div
                    className={`  px-3 py-1 font-semibold   ${
                      offer.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {offer.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4">
  <div className="w-full">
    {/* Dynamically render "Product Details" heading */}
    <h6 className="font-semibold text-center py-3 text-[20px]">
      {offer.product ? "Product Details" : ""}
    </h6>

    {offer.product && (
      <div
        onClick={() => toggleProductExpand(index)}
        className="cursor-pointer border p-5 rounded-lg mt-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="flex justify-center items-center">
          <img
            src="https://images.hdqwalls.com/wallpapers/battlefield-4-game-wide.jpg"
            alt={offer.product.title}
            className="w-[300px] h-[300px] object-cover rounded-lg mb-4"
          />
        </div>
        <p className="text-lg font-semibold text-center">
          <span className="text-[18px] font-medium"> Title : </span>
          {offer.product.title}
        </p>
        <p className="text-sm text-gray-600 text-center">
          <span className="text-[15px] font-medium">Arabic Title : </span>
          {offer.product.titleAr}
        </p>
        <div
          className={`flex justify-center font-semibold items-center px-2 py-1 my-3 text-[20px] ${
            offer.product.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {offer.product.isActive ? "Active" : "Inactive"}
        </div>
      </div>
    )}

    <AnimatePresence>
      {expandedProductIndex === index && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="mt-4">
            {offer.product && (
              <div className="w-full flex justify-between">
                <p className="text-sm mt-2">
                  <span className="text-[15px] font-medium">Description : </span>
                  {offer.product.description}
                </p>
                <p className="text-sm">
                  <span  className="text-[15px] font-medium">Description Arabic : </span>
                  {offer.product.descriptionAr}
                </p>
              </div>
            )}

            {/* Dynamically render "Brand Details" heading if brand exists */}
            {offer.product.brand && (
              <div className="mt-4">
                <h6 className="font-semibold text-center uppercase">Brand Details</h6>
                <div className="border p-4 rounded-lg mt-2 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center gap-4 justify-center">
                    <img
                      src={offer.product.brand.image}
                      alt={offer.product.brand.name}
                      className="w-[200px] h-[200px] object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-center py-2">
                      <span className="text-[15px] font-medium">Name : </span>
                      {offer.product.brand.name}
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                      <span className="text-[15px] font-medium">Arabic Name : </span>
                      {offer.product.brand.nameAr}
                    </p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="text-sm mt-2">
                      <span className="text-[15px] font-medium">Description : </span>
                      {offer.product.brand.description}
                    </p>
                    <p className="text-sm">
                      <span className="text-[15px] font-medium">Description Arabic : </span>
                      {offer.product.brand.descriptionAr}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamically render "Service Details" heading if service exists */}
            {offer.product.service && (
              <div className="mt-4">
                <h6 className="font-semibold text-center uppercase pt-3">Service Details</h6>
                <div className="border p-4 rounded-lg mt-2 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-center">
                    {offer.product.service.iconUrl && (
                      <img
                        src={offer.product.service.iconUrl}
                        alt={offer.product.service.name}
                        className="w-[200px] h-[200px] object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-center">
                      <span className="text-[15px] font-medium">Name : </span>
                      {offer.product.service.name}
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                      <span className="text-[15px] font-medium">Arabic Name : </span>
                      {offer.product.service.nameAr}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamically render "Sub Service Details" heading if subService exists */}
            {offer.product.subService && (
              <div className="mt-4">
                <h6 className="font-semibold text-center uppercase pt-3">Sub Service Details</h6>
                <div className="border p-4 rounded-lg mt-2 bg-gray-50 dark:bg-gray-700">
                  <p className="text-lg font-semibold">
                    <span className="text-[15px] font-medium">Name : </span>
                    {offer.product.subService.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="text-[15px] font-medium">Arabic Name : </span>
                    {offer.product.subService.nameAr}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
<div className="w-full">
                    <h6 className="font-semibold text-center py-3 text-[20px]">Seller Details</h6>
                    <div className="border p-5 rounded-lg mt-2">
                     <div className="flex justify-center items-center gap-[15px]
                     ">
                        <img
                          src={offer.seller.profileImage}
                          alt={offer.seller.firstName}
                          className="w-16 h-16 rounded-full object-cover mb-2"
                        />
                       <div>
                          <p className="text-lg font-semibold">{offer.seller.firstName} {offer.seller.lastName}</p>
                          <p className="text-sm text-gray-600">{offer.seller.userName}</p>
                       </div>
                     </div>
                     <div className="w-full flex justify-between items-center">
                        <div className="flex flex-col  gap-2">
                          <p className="text-sm"><span className="font-medium mr-2">Phone :</span>{offer.seller.phoneNumber}</p>
                          <p className="text-sm"><span className="font-medium mr-2">Gender :</span>{offer.seller.gender}</p>
                        </div>
                        <div  className="flex flex-col  gap-2">
                          <p className="text-sm"><span className="font-medium mr-2">Email :</span>{offer.seller.email}</p>
                          <p className="text-sm"><span className="font-medium mr-2">Country :</span>{offer.seller.country}</p>
                        </div>
                     </div>
                      <div
                        className={`flex justify-center font-semibold items-center px-2 py-1 my-3  text-[20px]   ${
                          offer.seller.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                      >
                        {offer.seller.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetOffer;
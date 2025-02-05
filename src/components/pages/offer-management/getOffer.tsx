import { useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const GetOffer = () => {
  const [offers, setOffers] = useState([
    {
      id: "3a0f17e2-4a02-40de-a2ac-0292fbb8f2d8",
      productId: "f7e35fc2-ee51-4e91-a2bb-ff59c42734ae",
      userId: "da97179d-f72a-4029-ac8a-0d2c5b37b0da",
      title: "Some Title",
      titleAr: "Title in Arabic",
      description: "Description",
      descriptionAr: "Description in AR",
      status: "APPROVED",
      adminNote: "Kidu Offer ",
      reviewedAt: "2025-01-31T05:00:47.775Z",
      unitPriceUSD: 7,
      unitPriceSAR: 10,
      minQty: 1,
      apiQty: 20,
      lowStockAlertQty: 1,
      deliveryMethods: ["EMAIL"],
      salesTerritoryId: "b7827f8f-013e-4a03-b839-4279c6833d6b",
      createdAt: "2025-01-31T03:41:27.967Z",
      updatedAt: "2025-01-31T05:00:47.777Z",
      expiresAt: null,
      deletedAt: null,
      adminId: null,
      isActive: true,
      product: {
        id: "f7e35fc2-ee51-4e91-a2bb-ff59c42734ae",
        serviceId: "efc1198c-d04c-49f0-ad95-ba8a9ef78c95",
        subServiceId: null,
        brandId: "d352c5a7-3581-4278-80ac-be2653079470",
        regionId: null,
        purchaseType: "TOP_UP",
        deliveryTypes: ["EMAIL", "INSTANT_DELIVERY"],
        title: "Test Product",
        titleAr: "منتج تجريبي",
        image: "https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg",
        description: "This is a test product description",
        descriptionAr: "هذا وصف المنتج التجريبي",
        isActive: true,
        deletedAt: null,
        createdAt: "2025-01-28T20:05:11.210Z",
        updatedAt: "2025-01-28T20:05:11.210Z",
        brand: {
          id: "d352c5a7-3581-4278-80ac-be2653079470",
          name: "Valorant 2s",
          nameAr: "",
          image: "https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg",
          description: "",
          descriptionAr: "G2",
          createdAt: "2025-01-28T20:04:23.845Z",
          updatedAt: "2025-01-29T14:13:30.626Z",
          deletedAt: "2025-01-29T14:13:30.626Z",
          isActive: true,
        },
        service: {
          id: "efc1198c-d04c-49f0-ad95-ba8a9ef78c95",
          name: "Game 2",
          nameAr: "hu",
          iconUrl: "https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg",
          createdAt: "2025-01-28T07:22:18.496Z",
          updatedAt: "2025-01-29T12:02:13.261Z",
          deletedAt: null,
          isActive: true,
        },
        subService: null,
        region: null,
      },
      seller: {
        id: "da97179d-f72a-4029-ac8a-0d2c5b37b0da",
        email: "najibpt89@gmail.com",
        phoneNumber: "+918921992380",
        firstName: "Najib",
        lastName: "Nj",
        gender: "MALE",
        profileImage: 'https://writestylesonline.com/wp-content/uploads/2016/08/Follow-These-Steps-for-a-Flawless-Professional-Profile-Picture.jpg',
        userName: "userName3",
        coverImage: null,
        country: "India",
        countryCode: "91",
        totalTransaction: 0,
        successfulDeliveries: 0,
        languages: [],
        description: null,
        onlineStatus: false,
        memberSince: "2025-01-28T18:41:30.210Z",
        rating: 0,
        createdAt: "2025-01-28T18:41:30.210Z",
        updatedAt: "2025-01-31T03:09:45.190Z",
        accountId: "ACCM6GTQ44GYIZ",
        lastLogin: "2025-01-31T03:09:45.188Z",
        fcmToken: "fcm",
        levelId: "bea36778-8d2b-4d88-a064-db1402d92c92",
        addressId: null,
        isActive: true,
        bannedAt: "2025-01-31T03:09:45.190Z",
      },
      salesTerritory: {
        id: "b7827f8f-013e-4a03-b839-4279c6833d6b",
        settingsType: "GLOBAL",
        countries: [],
        createdAt: "2025-01-31T03:41:27.967Z",
        updatedAt: "2025-01-31T03:41:27.967Z",
      },
    },
  ]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
  };

  const openSellerModal = (seller: any) => {
    setSelectedSeller(seller);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSeller(null);
  };

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
              <h5 className="text-lg font-semibold">{offer.title}</h5>
              <button
                onClick={() => toggleExpand(index)}
                className="text-blue-600 hover:text-blue-800 flex justify-center items-center uppercase gap-1"
              >
               <span className="text-[13px]">View Details</span> <FaEye />
              </button>
            </div>
            <div className="w-full flex justify-between">
              <p className="text-sm text-gray-600">{offer.titleAr}</p>
              <p
                className={`text-sm ${
                  offer.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {offer.status}
              </p>
            </div>

            {expandedIndex === index && (
              <div className="mt-4">
                <div className="flex w-full justify-between my-3">
                  <p className="text-sm">{offer.description}</p>
                  <p className="text-sm">{offer.descriptionAr}</p>
                </div>
                <div className="flex w-full justify-between my-3">
                  <p className="text-sm">Price: ${offer.unitPriceUSD}</p>
                  <p className="text-sm">Min Qty: {offer.minQty}</p>
                </div>
                <div className="flex w-full justify-between my-3">
                  <p className="text-sm">
                    Delivery Methods: {offer.deliveryMethods.join(", ")}
                  </p>
                  <div
                    className={`inline-block px-2 py-1 rounded text-sm ${
                      offer.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {offer.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="w-full flex gap-3 justify-center items-center">
                  <div className="mt-4">
                    <h6 className="font-semibold">Product</h6>
                    <div
                      onClick={() => openProductModal(offer.product)}
                      className="cursor-pointer border p-5 rounded-lg mt-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <p>{offer.product.title}</p>
                      <p>{offer.product.titleAr}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="font-semibold">Seller</h6>
                    <div
                      onClick={() => openSellerModal(offer.seller)}
                      className="cursor-pointer border p-5 rounded-lg mt-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img
                        src={offer.seller.profileImage}
                        alt={offer.seller.firstName}
                        className="w-16 h-16 rounded-full object-cover mb-2"
                      />
                      <p>{offer.seller.firstName} {offer.seller.lastName}</p>
                      <p>{offer.seller.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-boxdark px-6 pt-12 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[80%] flex flex-col justify-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="flex justify-between">
                <h5 className="text-lg font-semibold">{selectedProduct.title}</h5>
                <p className="text-sm text-gray-600">{selectedProduct.titleAr}</p>
              </div>
              <div className="">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-[100px] h-[100px] object-cover mt-2"
                />
              </div>
              <p className="text-sm mt-2">{selectedProduct.description}</p>
              <p className="text-sm">{selectedProduct.descriptionAr}</p>
              <div
                className={`inline-block px-2 py-1 rounded text-sm ${
                  selectedProduct.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {selectedProduct.isActive ? "Active" : "Inactive"}
              </div>

              {selectedProduct.brand && (
                <div className="mt-4">
                  <h6 className="font-semibold">Brand</h6>
                  <div className="border p-2 rounded-lg mt-2">
                    <p>{selectedProduct.brand.name}</p>
                    <p>{selectedProduct.brand.nameAr}</p>
                    <img
                      src={selectedProduct.brand.image}
                      alt={selectedProduct.brand.name}
                      className="w-full h-24 object-cover mt-2"
                    />
                  </div>
                </div>
              )}

              {selectedProduct.service && (
                <div className="mt-4">
                  <h6 className="font-semibold">Service</h6>
                  <div className="border p-2 rounded-lg mt-2">
                    <p>{selectedProduct.service.name}</p>
                    <p>{selectedProduct.service.nameAr}</p>
                  </div>
                </div>
              )}

              {selectedProduct.subService && (
                <div className="mt-4">
                  <h6 className="font-semibold">Sub Service</h6>
                  <div className="border p-2 rounded-lg mt-2">
                    <p>{selectedProduct.subService.name}</p>
                    <p>{selectedProduct.subService.nameAr}</p>
                  </div>
                </div>
              )}

              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedSeller && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-2xl overflow-y-auto max-h-screen relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4">
                <img
                  src={selectedSeller.profileImage}
                  alt={selectedSeller.firstName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-lg font-semibold">
                    {selectedSeller.firstName} {selectedSeller.lastName}
                  </h5>
                  <p className="text-sm text-gray-600">{selectedSeller.email}</p>
                </div>
              </div>
              <p className="text-sm mt-2">{selectedSeller.phoneNumber}</p>
              <p className="text-sm">{selectedSeller.gender}</p>
              <p className="text-sm">{selectedSeller.userName}</p>
              <p className="text-sm">{selectedSeller.country}</p>
              <div
                className={`inline-block px-2 py-1 rounded text-sm ${
                  selectedSeller.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {selectedSeller.isActive ? "Active" : "Inactive"}
              </div>

              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GetOffer;
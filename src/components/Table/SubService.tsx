import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../reduxKit/store";
import { GetSubServiceAction } from "../../reduxKit/actions/auth/subService/subServiceAction";
import { useSelector } from "react-redux";

const initialData = [
  {
    name: "Top up",
    nameAr: "خدمة فرعية مثال",
    description: "Top up description",
    descriptionAr: "وصف مثال",
    isActive: false,
  },
];

const SubService = () => {
  const [subServices, setSubServices] = useState(initialData);
  const [newsubServices, setnewSubServices] = useState([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedNameAr, setEditedNameAr] = useState("");
  const dispatch=useDispatch<AppDispatch>()
  const {loading, error}=useSelector((state:RootState)=>state.subService)

  const handleToggleActive = (index: number) => {
    setSubServices((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  if(newsubServices){
    console.log("|||||||||||",newsubServices);
    
  }


  useEffect(() => {
     const GetSubServiceList = async () => {
       try {
         const resultAction = await dispatch(GetSubServiceAction()).unwrap()
         console.log("yeeeeeeeee",resultAction);
         
         if (GetSubServiceAction.fulfilled.match(resultAction)) {
          setnewSubServices(resultAction.payload.data);
         } else {
           console.error("Failed to fetch services: ", resultAction.payload || resultAction.error);
         }
       } catch (error) {
         console.error("Unexpected error while fetching services: ", error);
       }
     };
     GetSubServiceList();
   }, [dispatch]);

  

  const handleEditClick = (index: number, name: string, nameAr: string) => {
    setIsEditing(index);
    setEditedName(name);
    setEditedNameAr(nameAr);
  };

  const handleSaveEdit = (index: number) => {
    setSubServices((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, name: editedName, nameAr: editedNameAr }
          : item
      )
    );
    console.log("Updated item:", subServices[index]);
    setIsEditing(null);
  };

  const handleDelete = (index: number) => {
    setSubServices((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex flex-wrap justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Sub Service List
        </h4>
        <Link to={"/subserviceform"}>
          <button className="mt-3 md:mt-0 px-4 py-2 bg-gray-200 font-medium border border-black hover:bg-gray-100">
            Add Sub Service
          </button>
        </Link>
      </div>

      {error && (
        <div className=" w-full justify-center flex items-center">

   
       <div className="flex items-center w-1/2  justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md animate-bounce">
      <svg
        className="w-6 h-6 mr-2 text-red-600 animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.99-.816 1.99-1.87V6.87C20.99 5.816 20.054 5 19 5H5c-1.054 0-1.99.816-1.99 1.87v8.26c0 1.054.936 1.87 1.99 1.87z"
        />
      </svg>
      <p className="font-semibold">Failed to load services. Please try again later.</p>
    </div>
    </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Table Header */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-sm md:text-base">Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-sm md:text-base">Name (Arabic)</p>
        </div>
        <div className="hidden sm:flex col-span-1 items-center">
          <p className="font-medium text-sm md:text-base">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-sm md:text-base">Edit</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-sm md:text-base">Delete</p>
        </div>
        <div className="hidden lg:flex col-span-1 items-center">
          <p className="font-medium text-sm md:text-base">Brand</p>
        </div>
      </div>

      {/* Table Rows */}
      {subServices.map((subService, index) => (
        <div
          className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={index}
        >
          {/* Name */}
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border p-1 rounded w-full text-sm md:text-base"
              />
            ) : (
              <p className="text-sm md:text-base text-black dark:text-white">
                {subService.name}
              </p>
            )}
          </div>

          {/* Name in Arabic */}
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input
                type="text"
                value={editedNameAr}
                onChange={(e) => setEditedNameAr(e.target.value)}
                className="border p-1 rounded w-full text-sm md:text-base"
              />
            ) : (
              <p className="text-sm md:text-base text-black dark:text-white">
                {subService.nameAr}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="hidden sm:flex col-span-1 items-center">
            <button
              onClick={() => handleToggleActive(index)}
              className={`px-3 py-1 rounded text-sm md:text-base ${
                subService.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {subService.isActive ? "Active" : "Not Active"}
            </button>
          </div>

          {/* Edit */}
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <button
                onClick={() => handleSaveEdit(index)}
                className="text-sm md:text-base font-bold text-blue-600"
              >
                Save
              </button>
            ) : (
              <FaEdit
                onClick={() =>
                  handleEditClick(index, subService.name, subService.nameAr)
                }
                className="cursor-pointer text-blue-600"
              />
            )}
          </div>

          {/* Delete */}
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleDelete(index)}
              className="text-sm md:text-base font-bold text-red-500"
            >
              Delete
            </button>
          </div>

          {/* Brand */}
          <div className="hidden lg:flex col-span-1 items-center">
            <Link to={"/brandlist"}>
              <p className="text-sm md:text-base font-bold underline text-blue-600 cursor-pointer">
                Brand
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubService;

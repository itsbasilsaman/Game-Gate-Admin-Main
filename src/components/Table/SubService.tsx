import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedNameAr, setEditedNameAr] = useState("");

  const handleToggleActive = (index: number) => {
    setSubServices((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

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

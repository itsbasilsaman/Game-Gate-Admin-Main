import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../reduxKit/store';
import { GetRegionAction } from '../../reduxKit/actions/auth/region/regionAction';

interface Region {
  id: string;
  name: string;
  nameAr: string;
  iconUrl: string;
  isActive: boolean;
}

const RegionListSection = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedRegion, setEditedRegion] = useState<Partial<Region>>({});
  const dispatch=useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch regions logic can be added here later
  }, []);

  console.log(isEditing ,editedRegion);

  useEffect(()=>{

    const GetRegions=async()=>{
      try {
        
        const response= await dispatch(GetRegionAction())
        console.log("got region response()()() ",response);
        //  setRegions(response.data)

      } catch (error) {
        console.error('Failed to fetch brands:', error);
      }

    }
    GetRegions()

  },[dispatch])
  

  const handleDeleteClick = (id: string) => {
    setSelectedRegionId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedRegionId) {
      setRegions(regions.filter(region => region.id !== selectedRegionId));
      toast.success("Region deleted successfully!");
    }
    setIsModalOpen(false);
  };

  const handleEditClick = (region: Region) => {
    setIsEditing(region.id);
    setEditedRegion({ ...region });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="py-6 px-4 flex justify-between">
        <h4 className="text-xl font-semibold">Region List</h4>
        <Link to={'/addregion'}>
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-100 border-black border">Add Region</button>
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t py-4 px-4">
        <p className="col-span-2 font-medium">Region Name</p>
        <p className="col-span-2 font-medium">Region Name (Arabic)</p>
        <p className="col-span-1 font-medium">Edit</p>
        <p className="col-span-1 font-medium">Delete</p>
      </div>

      {regions.map((region) => (
        <div key={region.id} className="grid grid-cols-6 border-t py-4 px-4">
          <p className="col-span-2">{region.name}</p>
          <p className="col-span-2">{region.nameAr}</p>
          <button className="col-span-1" onClick={() => handleEditClick(region)}>
            <FaEdit className='text-2xl' />
          </button>
          <button className="col-span-1" onClick={() => handleDeleteClick(region.id)}>
            <MdDelete className='text-2xl text-red-500' />
          </button>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onDelete={handleDeleteConfirm}
        message="Are you sure you want to delete this region?"
      />
    </div>
  );
};

export default RegionListSection;

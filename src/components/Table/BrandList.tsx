import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AppDispatch } from '../../reduxKit/store';
import {
  GetAllBrandAction,
  EditBrandAction,
  ActiveBrandInActiveAction,
  DeleteBrandAction,
} from '../../reduxKit/actions/auth/brand/brandAction';

interface Brand {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  isActive: boolean;
}

const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedNameAr, setEditedNameAr] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const resultAction = await dispatch(GetAllBrandAction()).unwrap();
        setBrands(resultAction);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      }
    };
    fetchBrands();
  }, [dispatch]);

  const handleToggleActive = async (index: number, id: number) => {
    try {
      await dispatch(ActiveBrandInActiveAction(id)).unwrap();
      setBrands((prev) =>
        prev.map((item, i) => (i === index ? { ...item, isActive: !item.isActive } : item))
      );
    } catch (error) {
      console.error('Failed to toggle active status:', error);
    }
  };

  const handleEditClick = (index: number, name: string, nameAr: string) => {
    setIsEditing(index);
    setEditedName(name);
    setEditedNameAr(nameAr);
  };

  const handleSaveEdit = async (index: number, id: number) => {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', editedName);
    formData.append('nameAr', editedNameAr);

    try {
      await dispatch(EditBrandAction(formData)).unwrap();
      setBrands((prev) =>
        prev.map((item, i) => (i === index ? { ...item, name: editedName, nameAr: editedNameAr } : item))
      );
      setIsEditing(null);
    } catch (error) {
      console.error('Failed to save edit:', error);
    }
  };

  const handleDelete = async (index: number, id: number) => {
    try {
      await dispatch(DeleteBrandAction(id)).unwrap();
      setBrands((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Failed to delete brand:', error);
    }
  };

  return (
    <div className="rounded-sm border bg-white shadow-default">
      <div className="py-6 px-4 flex justify-between">
        <h4 className="text-xl font-semibold">Brand List</h4>
        <Link to={'/brandAdd'}>
          <button className="px-4 py-2 bg-gray-200 border hover:bg-gray-100">Add New Brand</button>
        </Link>
      </div>

      {brands.map((brand, index) => (
        <div key={brand.id} className="grid grid-cols-6 border-t py-4 px-4">
          <div className="col-span-1 flex items-center">
            <img src={brand.image} alt={brand.name} className="h-12 w-12 rounded-md" />
          </div>
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="border p-1 rounded" />
            ) : (
              <p>{brand.name}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input type="text" value={editedNameAr} onChange={(e) => setEditedNameAr(e.target.value)} className="border p-1 rounded" />
            ) : (
              <p>{brand.nameAr}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleToggleActive(index, brand.id)}
              className={`px-3 py-1 rounded text-white ${brand.isActive ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {brand.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <button onClick={() => handleSaveEdit(index, brand.id)} className="text-blue-600 font-bold">Save</button>
            ) : (
              <FaEdit onClick={() => handleEditClick(index, brand.name, brand.nameAr)} className="cursor-pointer text-blue-600" />
            )}
          </div>
          <div className="col-span-1 flex items-center">
            <button onClick={() => handleDelete(index, brand.id)} className="text-red-500 font-bold">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandList;

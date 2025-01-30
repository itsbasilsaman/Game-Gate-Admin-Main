import { useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: "da97179d-f72a-4029-ac8a-0d2c5b37b0da",
      userName: "userName3",
      isActive: true,
      level: 1,
    },
    {
      id: "fd17596b-9c97-4dc0-899e-300dd0cd036e",
      userName: "userName",
      isActive: true,
      level: 1,
    },
  ]);

  const toggleActiveStatus = (index: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, isActive: !user.isActive } : user
      )
    );
  };
  

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex flex-wrap justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          User List
        </h4>
      </div>

      <div className="grid grid-cols-4 border-t border-stroke py-4 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <p className="font-medium text-sm md:text-base">No </p>
        <p className="font-medium text-sm md:text-base">User Name</p>
        <p className="font-medium text-sm md:text-base">Level</p>
        <p className="font-medium text-sm md:text-base text-right"> </p>
      </div>

      {users.map((user, index) => (
        <div
          className="grid grid-cols-4 border-t border-stroke py-4 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={user.id}
        >
          <p className="text-sm md:text-base text-black dark:text-white">{index + 1}</p>
          <p className="text-sm md:text-base text-black dark:text-white">{user.userName}</p>
          <p className="text-sm md:text-base text-black dark:text-white">{user.level}</p>
          <div className="flex  ">
            <button
              onClick={() => toggleActiveStatus(index)}
              className={`px-3 py-1 rounded text-sm md:text-base ${
                user.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </button>
            <Link to={`/getuser`} className="ml-4 text-blue-600 underline">
              View More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;

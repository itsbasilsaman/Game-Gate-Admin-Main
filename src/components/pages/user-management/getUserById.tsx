import React from "react";

type ProfileProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userName: string;
  gender: string;
  profileImage: string | null;
  level: {
    id: string;
    level: number;
    requiredTransactionsUSD: number;
    requiredTransactionsSR: number;
  };
};
const GetUserById: React.FC = () => {
  const profile: ProfileProps = {
    id: "da97179d-f72a-4029-ac8a-0d2c5b37b0da",
    firstName: "Najib",
    lastName: "Nj",
    email: "najibpt89@gmail.com",
    phoneNumber: "+918921992380",
    userName: "userName3",
    gender: "MALE",
    profileImage: 'https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg',
    level: {
      id: "bea36778-8d2b-4d88-a064-db1402d92c92",
      level: 1,
      requiredTransactionsUSD: 0,
      requiredTransactionsSR: 10,
    },
  };
  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-black to-gray-400 shadow-2xl rounded-3xl p-8 text-center text-white relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="absolute top-0 left-0 w-full h-1/3  opacity-10 rounded-b-3xl"></div>
      <div className="relative z-10">
        <div className="relative">
          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/150?text=Profile+Image"
            }
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <h2 className="text-2xl font-extrabold mt-4">{profile.firstName} {profile.lastName}</h2>
        <p className="text-gray-300 text-sm">@{profile.userName}</p>
        <p className="text-gray-300 text-sm">{profile.email}</p>
        <p className="text-gray-300 text-sm capitalize">{profile.gender.toLowerCase()}</p>
        <p className="mt-4 text-green-300 font-bold text-lg">{profile.phoneNumber}</p>
        <p className="text-sm text-gray-300">
            Transactions: ${profile.level.requiredTransactionsUSD} / {profile.level.requiredTransactionsSR} SR
          </p>
        <div className="mt-4 text-gray-200 bg-white bg-opacity-20 rounded-lg p-4 shadow-lg">
          <p className="text-lg font-bold">Level {profile.level.level}</p>
         
        </div>
        
      </div>
    </div>
  );
};

export default GetUserById;

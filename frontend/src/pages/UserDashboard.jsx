/* eslint-disable react/prop-types */
import axios from "axios";

import { useEffect, useState } from "react";



function UserDashboard() {

  const [cars, setCars] = useState([]);
 

  useEffect(() => {
    {
    axios
        .get("https://assignment-for-intership-ngvx.vercel.app/api/user/cars")
        .then((res) => {
          setCars(res.data);
        })
        .catch((error) => {
          throw new error();
        });
    }
  }, []);



  return (
    <div className="container h-screen bg-gray-100 px-4 py-8">
      <div className=" mt-4">
<div className="flex justify-center items-center mb-8 ">
        <div className=" w-1/2 mr-4">

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          All Cars
        </h1>
        </div>
     
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((cars) => (
            <div
              key={cars._id}
              className=" bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4 flex justify-between ">
               
                <div className="w-full  text-center">

                <h2 className="text-xl font-semibold text-blue-600">
                  {cars.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  <strong> Manufacturing Year :</strong> {cars.manufacturingYear}
                  <br />
                  <strong> Car Price :</strong> {cars.price}
                  <br />
                </p>
                
                  </div>
                  
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

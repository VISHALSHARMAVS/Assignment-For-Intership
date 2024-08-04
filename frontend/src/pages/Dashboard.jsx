/* eslint-disable react/prop-types */
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Dashboard() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
 

  useEffect(() => {
    {
    axios
        .get("http://localhost:3000/api/user/cars")
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
        <div className="w-24 mb-8">
          
        <Button onClick={()=>{
          navigate('/addcar')
        }} label={'Add Car'}
        className={'mt-4 bg-indigo-500 inline-block px-4 py-2 text-white font-semibold rounded  transition'}/>
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
                <Button
                  onClick={() => navigate(`/cars/${cars._id}`)}
                  label={"Edit Car"}
                  className="mt-4 bg-indigo-500 inline-block px-4 py-2 text-white font-semibold rounded hover:bg-blue-600 transition"
                  />
                  </div>
                  <div>
                  <Button
                  onClick={async() => {
                    try {
                      await axios.delete(`http://localhost:3000/api/admin/cars/${cars._id}`, {
                          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                      }).then(()=>{
                        navigate('/');
                      })
                      
                      
                  } catch (error) {
                      console.error(error);
                  }
              }
                  }
                  label={"Delete"}
                  className="mt-4 bg-red-500 inline-block px-4 py-2 text-white font-semibold rounded transition"
                  />
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

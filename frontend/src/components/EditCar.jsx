import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
// import InputBox from "../components/InputBox";
import Heading from "../components/Heading";

function EditCar() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [manufacturingYear, setManufacturingYear] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/admin/cars/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            const car = response.data;            
            setName(car.name);            
            setManufacturingYear(car.manufacturingYear);
            setPrice(car.price);
              
            
        }).catch((error) => {
            console.error(error);
        });
    },[id]);

    const handleEditCar = async () => {
        try {
            await axios.put(`http://localhost:3000/api/admin/cars/${id}`, {
                name,
                manufacturingYear,
                price
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Edit Car" />
    <div className="text-sm font-medium text-left py-2">Car Name</div>                
    <input value={name} onChange={(e) => setName(e.target.value)} type={'text'} placeholder={"Car Name"} className="w-full px-2 py-1 border " />

                   
                     <div className="text-sm font-medium text-left py-2">Manufacturing Year</div>                
    <input value={manufacturingYear} onChange={(e) => setManufacturingYear(e.target.value)} type={'number'} placeholder={"Manufacturing Year"} className="w-full px-2 py-1 border " />

                
  <div className="text-sm font-medium text-left py-2">Price</div>                
    <input value={price} onChange={(e) => setPrice(e.target.value)} type={'number'} placeholder={"Price"} className="w-full px-2 py-1 border " />

                    
                    <div className="pt-4">
                        <Button onClick={handleEditCar} label="Update Car" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCar;

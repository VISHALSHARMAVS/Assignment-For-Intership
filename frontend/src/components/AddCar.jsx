import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Heading from "../components/Heading";

function AddCar() {
    const [name, setName] = useState("");
    const [manufacturingYear, setManufacturingYear] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const handleAddCar = async () => {
        try {
            await axios.post("https://assignment-for-intership-ngvx.vercel.app/api/admin/cars", {
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
                    <Heading label="Add Car" />
                    <InputBox 
                        onChange={(e) => setName(e.target.value)} 
                        type="text" 
                        label="Car Name" 
                        placeholder="Car Name" 
                    />
                    <InputBox 
                        onChange={(e) => setManufacturingYear(e.target.value)} 
                        type="number" 
                        label="Manufacturing Year" 
                        placeholder="Manufacturing Year" 
                    />
                    <InputBox 
                        onChange={(e) => setPrice(e.target.value)} 
                        type="number" 
                        label="Price" 
                        placeholder="Price" 
                    />
                    <div className="pt-4">
                        <Button onClick={handleAddCar} label="Add Car" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCar;

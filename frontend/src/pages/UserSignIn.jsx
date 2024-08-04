import { useState } from "react"
import BottomWarning from "../components/BottomWarning.jsx"
import Button from "../components/Button.jsx";
import Heading from "../components/Heading.jsx";
import SubHeading from "../components/SubHeading.jsx";
import InputBox from "../components/InputBox.jsx";
import axios from "axios"
import { useNavigate } from "react-router-dom";


function UserSignin(){
    const [username,setUsername] = useState("");
 
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return (

        <div className="bg-slate-300 h-screen flex justify-center">

            <div className="flex flex-col justify-center">

                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

                <Heading label="Sign in"/>

                <SubHeading label="Enter Your Credentials to access your Account"/>

                <InputBox onChange={(e)=>{
                    setUsername(e.target.value)
                }} type={"email"} label={"Username/Email"} placeholder={"vishal123"}/>
              
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} type={"password"} placeholder={"123@vh"} label={"Password"}/>

                <div className="pt-4">
                    <Button onClick={()=>{
                        axios.post("https://assignment-for-intership-ngvx.vercel.app/api/user/login",{
                            username,
                            password
                        }).then(()=>{
                            
                            navigate('/')
                        })
                    }} label={"Sign in"}/>

                </div>

                <BottomWarning label={"Don't Have An Accout?"} buttonText={"SignUp"} to={"/signup"}/>
                
                </div>
            </div>
        </div>
    )
}
export default UserSignin
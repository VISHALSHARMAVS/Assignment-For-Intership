import BottomWarning from "../components/BottomWarning"
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import Button from "../components/Button"
import InputBox from "../components/InputBox"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup() {
    const navigate = useNavigate();
    const [username,setUsername]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your information to create an Account"} />
               
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value)
                }} type={'text'} placeholder={"vishal1234"} label={"Username"}/>
                <InputBox onChange={(e)=>{
                    setEmail(e.target.value)
                }} type={'email'} placeholder={"123@gmail.com"} label={"Email"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value)
                }} type={'password'} placeholder={"123Viw@"} label={"Password"}/>
                <div className="pt-4">
                <Button onClick={()=>{
                    try {
                        axios.post("http://localhost:3000/api/admin/register",{
                          
                            username,
                            email,
                            password
                        }).then(()=>{
navigate('/');
                        })
                    } catch (error) {
                        throw new error
                    }
                }} label={"Sign Up"}/>
                </div>
           
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
  )
}

export default Signup
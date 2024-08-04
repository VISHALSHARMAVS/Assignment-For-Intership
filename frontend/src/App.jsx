import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signin from "./pages/SignIn"
import Signup from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import UserDashboard from "./pages/UserDashboard"
import UserSignup from "./pages/UserSignUp"
import UserSignin from "./pages/UserSignIn"
function App() {
  return (
    <div>
        <BrowserRouter>
    <Routes>
      <Route path="/signup" element = {<Signup/>} />
       <Route path="/signin" element = {<Signin/>} />
       <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/addcar" element ={<AddCar/>}/>
      <Route path="/cars/:id" element ={<EditCar/>}/>
      <Route path="/user/signup" element={<UserSignup/>}/>
      <Route path="/user/signin" element={<UserSignin/>}/>
      <Route path="/" element = {<UserDashboard/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
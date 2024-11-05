import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate(); 

  const handleClick = () => setShowPassword(!showPassword);

  const handleRoute = () => {
    navigate("/registration"); 
  };

  const handleLogin = async () => {
    try {
      
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      },{
        withCredentials: true, 
      });
      console.log(response.data);
      if(response){
        const  role  = response.data;

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/profile");
        }
      }
           
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response.data.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white bg-opacity-70 backdrop-blur-md shadow-md rounded-lg p-8 w-80">
        <h4 className="text-lg font-semibold mb-6 text-center">LOGIN</h4>

        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded pr-12"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm"
            onClick={handleClick}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="flex items-center justify-center mt-4 bg-green-200 rounded-md p-2">
          Not Registered?
          <span
            className="text-red-300 ml-2 cursor-pointer"
            onClick={handleRoute}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

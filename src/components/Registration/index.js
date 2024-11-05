import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate(); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleRegistration = async () => {
    if(password!==cpassword){
        alert("Passwords do not match")
    }
    if (userType === "admin" && secretKey !== "RishaT") {
      alert("Invalid Admin");
    } else {

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: name,
        email: email,
        password: password,
        role: userType
      },{
        withCredentials: true, 
      });
      console.log(response.data);
      alert("Registration completed")
      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white bg-opacity-70 backdrop-blur-md shadow-md rounded-lg p-8 w-80">
        <h4 className="text-lg font-semibold mb-6 text-center">REGISTER</h4>
          <div className=" mb-6 text-center ">
            <input
              type="radio"
              name="UserType"
              value="user"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType == "admin" ? (
            <div className="mb-3 flex">
             
              <input
                type="password"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          placeholder="Enter Student Name"
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="email"
          placeholder="Email ID"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          className={`w-full p-2 mb-4 border border-gray-300 rounded`}
          type='password'
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <input
          className={`w-full p-2 mb-4 border border-gray-300 rounded `}
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setCpassword(e.target.value)}
        />

        <div className="flex justify-between mb-4">
          <button 
            onClick={() => setShowPassword(!showPassword)} 
            className="text-blue-600 hover:underline"
          >
            
          </button>
          <button 
            onClick={() => setShowCPassword(!showCPassword)} 
            className="text-blue-600 hover:underline"
          >
           
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
            onClick={handleRegistration}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;

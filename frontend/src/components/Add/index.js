import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const navigate = useNavigate();
  const [newName, setName] = useState('');
  const [newEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const back = () => {
    navigate('/admin');
  };

  const addItem = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/add',
        {
          name: newName,
          email: newEmail,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      navigate('/admin'); 
    } catch (error) {
      console.error('Add user error:', error);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-3">
        <h1 className="text-4xl font-extrabold bg-gradient-to-l from-purple-600 to-pink-500 bg-clip-text text-transparent ml-8">
          Add User
        </h1>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-24 mx-5">
        <div className="col-span-5">
          <label htmlFor="name" className="ml-2 text-gray-700">Name</label>
        </div>
        <div className="col-span-6 mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={newName}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="col-span-5">
          <label htmlFor="email" className="ml-2 text-gray-700">Email</label>
        </div>
        <div className="col-span-6 mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={newEmail}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="col-span-5">
          <label htmlFor="password" className="ml-2 text-gray-700">Password</label>
        </div>
        <div className="col-span-6 mb-4">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="col-span-3 flex justify-center">
          <button onClick={addItem} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Add
          </button>
        </div>
        <div className="col-span-3 flex justify-center">
          <button onClick={back} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;

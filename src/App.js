
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Admin from './components/Admin'
import Profile from './components/Profile'
import Add from './components/Add'
import Edit from './components/Edit'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/add" element={<Add/>} />
        {/* <Route path="/edit" element={<Edit/>} /> */}
      </Routes>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Edit from '../Edit';

const socket = io('http://localhost:5000'); 
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); 
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/delete',
        { id },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate('/admin'); 
    } catch (error) {
      console.error('Add user error:', error);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleEdit = (id) => {
    setEditUserId(id); 
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin', {
          withCredentials: true,
        });
        setUsers(response.data);
        const initialBlockedState = {};
        response.data.forEach(user => {
          initialBlockedState[user._id] = user.isBlocked; 
        });
        setBlockedUsers(initialBlockedState);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    socket.on('activeUsers', (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off('activeUsers'); 
    };
  }, []);

  const toggleBlockUser = async (email, isBlocked) => {
    const endpoint = isBlocked ? 'unblock' : 'block'; 
    try {
      await axios.post(`http://localhost:5000/api/user/${endpoint}`, {
        email
      }, {
        withCredentials: true
      });
      setBlockedUsers(prevState => ({
        ...prevState,
        [email]: !isBlocked 
      }));
    } catch (error) {
      console.error("Error toggling user block status:", error);
    }
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white bg-opacity-70 backdrop-blur-md shadow-md rounded-lg p-8 w-3/4">
        <h1 className="text-center text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-300 transition m-7"
          onClick={() => navigate('/add')}
        >
          Add New User
        </button>
        <ul>
          {activeUsers.map(name => (
            <li key={name}>{name}</li> 
          ))}
        </ul>
        {Array.isArray(users) && users.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition mr-7"
                      onClick={() => toggleBlockUser(user.email, blockedUsers[user._id])} 
                    >
                      {blockedUsers[user._id] ? "UnBlock" : "Block"}
                    </button>
                    <button
                      className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-200 transition mr-7"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-300 transition mr-7"
                      onClick={() => { handleDelete(user._id); }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
      
      {/* Edit Component Overlay */}
      {editUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 backdrop-blur">
          <Edit id={editUserId} onClose={() => setEditUserId(null)} />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import bananaImage from '../../image/banana.jpg';
import axios from 'axios';

const socket = io('http://localhost:5000', {
    withCredentials: true,
});

function BananaClick() {
    const [clickCount, setClickCount] = useState(0);
    const [email, setEmail] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const [users, setUsers] = useState([]);

    const handleClick = () => {
        if (!isBlocked) {
            console.log(email + " frontend");
            socket.emit('bananaClick', email); 
        } else {
            alert("You are blocked by the admin and cannot click.");
        }
    };

    useEffect(() => {
        const fetchEmailAndStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/socket/profile', {
                    withCredentials: true,
                });
                setEmail(response.data.email);
                setIsBlocked(response.data.blocked); 
                console.log(response.data); 
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchEmailAndStatus();

        if (email) {
            socket.emit('getClickCount', email); 
        }

        socket.on('updateCount', (count) => {
            setClickCount(count);
        });

        socket.emit('getAllClickCounts');
        socket.on('allClickCounts', (data) => {
            console.log('All users click counts:', data);
            const sortedUsers = data.sort((a, b) => b.clickCount - a.clickCount);
            setUsers(sortedUsers);
        });

        socket.on('allClickCountsError', (error) => {
            console.error(error.message);
        });
        
        return () => {
            socket.off('updateCount');
        };
    }, [email]);

    return (
        <div className="flex flex-row items-start justify-around min-h-screen bg-gray-100 p-4">
            {/* Left container for image, button, and click count */}
            <div className="flex flex-col items-center">
                <img src={bananaImage} alt="Banana" className="w-1/2 mb-4" />
                <h1 className="text-2xl font-semibold mb-4">Banana Click Counter</h1>
                <button
                    onClick={handleClick}
                    className={`bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition ${isBlocked ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isBlocked} // Disable button if blocked
                >
                    Banana Click
                </button>
                <h2 className="mt-4 text-xl">Your Click Count: {clickCount}</h2>
                {isBlocked && <p className="text-red-500">You are blocked by the admin.</p>}
            </div>

            {/* Right container for the table */}
            <div className="flex flex-col items-center ml-auto">
                <h2 className="text-xl font-semibold">All Users Click Counts</h2>
                <table className="mt-4 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Click Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.clickCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BananaClick;

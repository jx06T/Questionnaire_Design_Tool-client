import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';

function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError('Failed to fetch users');
                console.error(err);
            }
        }
        loadUsers();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className ="mt-6 bg-red-400">User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
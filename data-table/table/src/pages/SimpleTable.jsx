import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SimpleTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setTableData(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='container'>
            <table width="100%" border="1">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0 ? (
                        tableData.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.updatedAt}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SimpleTable;

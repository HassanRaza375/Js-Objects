import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchTable from '../components/DataSearch';
const SimpleTable = () => {
    const [tableData, setTableData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const getFilteredUsers = (searchString) => {
        console.log("table data", tableData);

        if (searchString === '') {
            setTableData(tableData);
            return;
        }

        const filteredData = tableData.filter((e) => {
            return (
                (e.name && e.name.toLowerCase().includes(searchString.toLowerCase())) ||
                (e.email && e.email.toLowerCase().includes(searchString.toLowerCase()))
            );
        });

        setTableData(filteredData);
    };

    return (
        <>
            <div className='container'>
                <div className='input-button'>
                    <button className="get_data" onClick={fetchData}>
                        Get Api User Data
                    </button>
                    <SearchTable event={getFilteredUsers} />
                </div>
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
        </>
    );
};

export default SimpleTable;

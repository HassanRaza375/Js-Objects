import React from 'react'
import { useRef } from 'react';
const TableForm = () => {
    const ID = useRef('')
    const Name = useRef('')
    const Age = useRef('')
    const Email = useRef('')
    const createdat = useRef('')
    const updateddat = useRef('')
    const toggleInputs = (type) => {
        console.log(type);
    }
    return (
        <>
            <p>
                <label htmlFor="edit_u">Edit</label> <input type="radio" id="edit_u" name="selection" onClick={() => toggleInputs('edit')} defaultChecked />
                <label htmlFor="new_u">New</label> <input type="radio" id="new_u" name="selection" onClick={() => toggleInputs('new')} />
            </p>
            <div className="inputs_tables_edit">
                <input type="number" ref={ID} placeholder="ID" id="ID" required />
                <input type="text" ref={Name} placeholder="Name" id="Name" required />
                <input type="number" ref={Age} placeholder="Age" id="Age" required />
                <input type="email" ref={Email} placeholder="Email" id="Email" required />
                <input type="email" ref={createdat} placeholder="createdat" value={new Date()} readOnly id="CreatedAt" required />
                <input type="email" ref={updateddat} placeholder="updateddat" value={new Date()} readOnly id="UpdateddAt" required />
                <button id="Submit">Submit</button>
                <button id="Create">Create</button>
                <button>Reset</button>
            </div>
        </>
    )
}

export default TableForm
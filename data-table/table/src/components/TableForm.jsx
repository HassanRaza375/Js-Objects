import React, { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react';
const TableForm = ({ DataUser, Efunct, SetEditFunc }) => {
    const [State, setState] = useState('Edit')
    const ID = useRef('')
    const Name = useRef('')
    const Age = useRef('')
    const Email = useRef('')
    const createdat = useRef('')
    const updateddat = useRef('')
    const SetDataHandler = useCallback(() => {
        if (Object.keys(DataUser).length < 1) {
            return
        }
        ID.current.value = DataUser.id
        Name.current.value = DataUser.name
        Age.current.value = DataUser.age
        Email.current.value = DataUser.email
    }, [DataUser])

    useEffect(() => {
        SetDataHandler()
    }, [DataUser, SetDataHandler])
    const toggleInputs = (type) => {

        setState(type)
    }
    const resetTableData = () => {
        ID.current.value = ''
        Name.current.value = ''
        Age.current.value = ''
        Email.current.value = ''
        createdat.current.value = ''
        updateddat.current.value = ''
        SetEditFunc({})
    }
    return (
        <>
            <p>
                <label htmlFor="edit_u">Edit</label> <input type="radio" id="edit_u" name="selection" onClick={() => toggleInputs('Edit')} defaultChecked />
                <label htmlFor="new_u">New</label> <input type="radio" id="new_u" name="selection" onClick={() => toggleInputs('Create')} />
            </p>
            <div className="inputs_tables_edit">
                {State === "Edit" ?
                    <input type="number" ref={ID} placeholder="ID" id="ID" required /> : ''
                }
                <input type="text" ref={Name} placeholder="Name" id="Name" required />
                <input type="number" ref={Age} placeholder="Age" id="Age" required />
                <input type="email" ref={Email} placeholder="Email" id="Email" required />
                <input type="email" ref={createdat} placeholder="createdat" value={new Date()} readOnly id="CreatedAt" required />
                <input type="email" ref={updateddat} placeholder="updateddat" value={new Date()} readOnly id="UpdateddAt" required />
                {State === "Edit" ?
                    <button id="edit" onClick={() => Efunct({ id: ID.current.value, name: Name.current.value, age: Age.current.value, email: Email.current.value, createdat: createdat.current.value, updateddat: updateddat.current.value }, true)}>Edit</button>
                    : ''}
                {State === "Create" ?
                    <button id="Create">Create</button> : ''}
                <button onClick={() => resetTableData()}>Reset</button>
            </div>
        </>
    )
}

export default TableForm
import React, {useState} from 'react'
import { djangoLookup } from '../../functions/lookup';
import {Dropdown} from '../templates/Forms'

export function ManageItemDatabase(props) {
    const {name, fields} = props

    const onClickCreate = (event) => {
        event.preventDefault()
        const formEl = document.getElementById(name + "-form")
        const formData = new FormData(formEl)
        let data = {}
        formData.forEach((value, key) => {
            data[key] = value;
        })
        djangoLookup("POST", "/" + name + "/create/", data, (response, status) => {
            console.log(response)
            formEl.reset()
        })
    }

    return <div>
        <h1>{name}</h1>
        <CreateNewItem name={name} fields={fields} onClickCreate={onClickCreate} />
        <DeleteExistingItem url={"/" + name} field="name" />
    </div>
}

export function CreateNewItem(props) {
    const {name, onClickCreate, fields} = props
    const inputFields = fields.map(field => {
        return <div key={name + field}><input name={field} placeholder={" " + field} /></div>
    })
    return <div>
        <form id={name + "-form"} method="POST" onSubmit={onClickCreate}>
            {inputFields}
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    </div>
}

export function DeleteExistingItem(props) {
    const {url, field} = props
    const selectRef = React.createRef()
    
    const handleDeleteButton = () => {
        djangoLookup("DELETE", url + "/delete/", {name: selectRef.current.value}, (response, status) => {
            console.log(response)
        })
    }

    return <div>
        <Dropdown url={url + "/?action=all"} selectRef={selectRef} field={field} />
        <button className="btn btn-danger" onClick={handleDeleteButton}>Delete</button>
    </div>
}


import React, { useEffect, useState } from 'react'
import { djangoLookup } from '../../functions/lookup'
import { PersonForm } from '../templates/Forms'
import $ from 'jquery'

function ManageObjects(props) {
    const {name, formEntries} = props
    const [options, setOptions] = useState([])

    useEffect(() => {
        djangoLookup("GET", "/" + name + "/?action=all", {}, (response, status) => {
            status === 200 && setOptions(response)
        })
    }, [])

    const handleObjectSubmit = (event) => {
        event.preventDefault()
        const formEl = document.getElementById(name + "-form")
        const formData = new FormData(formEl)
        const data = {}
        formData.forEach((value, key) => {
            data[key] = value
        })
        if(typeof data.time !== "undefined") {
            if(data.time !== "") {
                data.time = data["date"] + " " + data["time"]
            } else {
                data.time = data["date"]
            }
        }
        formEntries.forEach(entry => {
            if(entry.type === "dropdown") {
                data[entry.name] = $("#" + entry.name + " option:selected").val()
            }
        })
        delete data.date
        console.log(data)
        djangoLookup("POST", "/" + name + "/create/", data, (response, status) => {
        })
    }

    const handleObjectDelete = (event) => {
        event.preventDefault()
        const objectName = $("#" + name + " option:selected").val()
        djangoLookup("POST", "/" + name + "/delete/", {name: objectName}, (response, status) => {
            status === 200 && console.log(response)
            status !== 200 && console.log("Error deleting the object")
        })
    }

    const existingEntries =[{name: name, displayName: "Existing " + name, type: "dropdown", entries: options.map(option => option.name)}]

    return <div><form id={name + "-form"}>
        <h1>{"Manage " + name}</h1>
        <PersonForm entries={formEntries} />
        <button className="btn btn-primary" onClick={handleObjectSubmit}>Submit</button>
        <PersonForm entries={existingEntries} />
        </form>
        <button type="button" className="btn btn-primary" onClick={handleObjectDelete}>Delete</button>
    </div>
}

export default ManageObjects
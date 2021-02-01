import React, { useEffect, useState } from 'react'
import { djangoLookup } from '../../functions/lookup'

export function IntentForm(props) {
    let {entries, title, img_url} = props
    entries = entries.map(entry => {
        return <DesignRadioButton name={entry.name} iconName={entry.iconName} description={entry.description} text_box={entry.text_box} />
    })

    return <div className="row">
        {img_url && <div className="flash_art">
            <img src={img_url} alt="GATHR" />
        </div>}
        <div className="unterschrift titel_trenner bold"><p>{title}</p></div>
        <div className="col-sm-10 col-sm-offset-1">
            {entries}
        </div>
    </div>
}

export function PersonForm(props) {
    const {entries, img_url, title, n_columns} = props
    let formEntries = entries.map((entry, index) => {
        return <FormEntry key={index} apiUrl={entry.apiUrl} onClick={entry.onClick} displayName={entry.displayName} key={index + entry.name} name={entry.name} description={entry.description} type={entry.type} entries={entry.entries} /> 
    })

    if(n_columns === 2) {
        let left_column = [], right_column = []
        formEntries.map((entry, index) => {
            if(index % 2 === 0) {
                left_column.push(entry)
            } else {
                right_column.push(entry)
            }
            return 0
        })
        formEntries = <div>
            <div className="col-sm-5">
                {left_column}
            </div>
            <div className="col-sm-5">
                {right_column}
            </div>
        </div>
    }

    return <div className="col-sm-12">
        {img_url && <div className="flash_art">
            <img src={img_url} alt="GATHR" />
        </div>}
        <div className="unterschrift"><p>{title}</p></div>
        {formEntries}
    </div>
}

// SUB-COMPONENTS
function DesignRadioButton(props) {
    const {name, iconName, description, text_box} = props
    return <div className="col-sm-4">
        <div className="choice" data-toggle="wizard-radio" rel="tooltip" title={text_box}>
            <input type="radio" name="intent" value={name} />
            <div className="icon">
                <i className="material-icons">{iconName}</i>
            </div>
            <h6>{description}</h6>
        </div>
    </div>
}

// === FORM ENTRY ELEMENT ===
// Input field of a form. Takes name (reference), display name, data type, 
// required boolean, entries (if dropdown), icon name (e. g. material icons)
export function FormEntry(props) {
    const {name, displayName, type, required, entries, iconName, onClick, apiUrl} = props
    const label = <label className="">{displayName}</label>
    let inputField = <input name={name} type={type} className="form-control" /> 
    required && inputField.setAttribute("required", true)
    const [dropdownEntries, setDropdownEntries] = useState([])
    
    useEffect(() => {
        if(type === "dropdown" && typeof entries === "undefined") {
            djangoLookup("GET", apiUrl, {}, (response, status) => {
                status === 200 && setDropdownEntries(response.map(obj => obj.name))
            })
        } else if(type === "dropdown") {
            setDropdownEntries(entries)
        }
    }, [apiUrl, entries, type])

    let entryElement = <div></div>
    switch(type) {
        case "dropdown":    entryElement = <div>{label}<Dropdown entries={dropdownEntries} name={name} /></div>; break;
        case "radio":       entryElement = <div>{inputField}{label}</div>; break;
        case "checkbox":    inputField = <input id={name} name={name} type={type} className="form-control" onClick={onClick} /> 
                            entryElement = <div style={{textAlign: "center"}}>{inputField}{label}</div>; break;
        case "date":        inputField = <input name={name} type={type} className="form-control" defaultValue="2020-01-01" /> 
                            entryElement = <div>{label}{inputField}</div>; break;
        default:            entryElement = <div>{label}{inputField}</div>; break;
    }

    return <div className="input-group my-form-entry">
        <span className="input-group-addon">
            {iconName && <i className="material-icons">{iconName}</i>}
        </span>
        <div className="form-group label-floating">
        {entryElement}
        </div>
    </div>
}

// === DROPDOWN ===
// Takes select options, change function (if needed), and name (for value referencing)
export function Dropdown(props) {
    let {entries, onChangeFun, name} = props
    entries.sort()
    entries = entries.map((entry, index) => {
        return <option key={entry + index} value={entry}>{entry}</option>
    })
    return <div className="my-form-control">
        <select id={name.toLowerCase()} className="form-control" onChange={onChangeFun}>
        {entries}
        </select>
    </div>
}
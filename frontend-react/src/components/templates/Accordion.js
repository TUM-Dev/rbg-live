import React from 'react'

// === ACCORDION BLOCK ===
// Accordion - takes entries with properties : name (for href), title, text
function Accordion(props) {
    let {entries} = props
    entries = entries.map(entry => {
        return <AccordionElement name={entry.name} title={entry.title} text={entry.text} />
    })

    return <div className="panel-group" id="accordion">
        {entries}
    </div>
}

// Accordion Element - takes name (for href), title and text from Accordion entry
function AccordionElement(props) {
    const {name, title, text} = props
    return <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href={'#' + name}>
                    {title}
                </a>
            </h4>
        </div>
        <div id={name} className="panel-collapse collapse">
            <div className="panel-body">
                {text}
            </div>
        </div>
    </div>
}
export default Accordion

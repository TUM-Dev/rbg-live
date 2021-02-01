import React from 'react'

function Countdown(props){
    const {days, hours, minutes, seconds} = props
    const display = parseInt(days) < 0 || parseInt(hours) < 0 || parseInt(minutes) < 0 || parseInt(seconds) < 0
    return <div id="content-wrap" style={!display ? {display: "block"}: {display: "none"}}>
            <main className="row">
                <div id="main-content" className="twelve columns">
                    <div id="counter" className="group">
                        {days && <span>{days} <em>days</em></span> }
                        {hours && <span>{hours} <em>hours</em></span>}
                        {minutes && <span>{minutes} <em>minutes</em></span>}
                        {seconds && <span>{seconds} <em>seconds</em></span>}
                    </div>                  
                </div>
            </main>	      
    </div>
}

export default Countdown
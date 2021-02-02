import React from 'react'
import $ from 'jquery'

function Player(props) {
    const {setDisplayChat, stream} = props
    const toggleChatButton = (event) => {
        event.preventDefault()
        setDisplayChat(prevState => !prevState)
    }
    return <div className="row" style={{marginLeft: 25}}>
        <div style={{flex: 1}}>
            <video id="my-video" controls autoPlay muted="muted" className="video">
                <source src={`/static/assets/${stream.name}.mp4`} type="video/mp4" />
            </video>
            <VideoSpeedHandler />  
        </div>
        <div style={{marginLeft: 5, marginRight: 25}}>
        <nav className="">
        <button className="btn" onClick={toggleChatButton}><span className="navbar-toggler-icon"><i className="fa fa-bars"></i></span></button>
        </nav>
        </div>
    </div>
}

function VideoSpeedHandler(props) {

    const handleVideoSpeedChange = (event) => {
      event.preventDefault()
      const speed = $("#video-speed :selected").text()
        document.querySelector("#my-video").playbackRate = parseFloat(speed.substring(1))
    }

    return <div style={{float: "right"}}>
      <select className="form-control" id="video-speed" onChange={handleVideoSpeedChange} style={{width:100}}>
        <option selected hidden>Speed</option>
        <option>x0.25</option>
        <option>x0.5</option>
        <option>x0.75</option>
        <option>x1</option>
        <option>x1.25</option>
        <option>x1.5</option>
        <option>x1.75</option>
        <option>x2</option>
      </select>
    </div> 
}

export default Player
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Player from './Player'
import Chatbox from './Chatbox'
import { djangoLookup } from '../functions/lookup'
import openSocket from "socket.io-client"

const ENDPOINT = window.location.protocol + "//" + window.location.hostname + ":4001"

function Navbar(props) {
    const {setTheme} = props
    const [displayChat, setDisplayChat] = useState(true)
    const [lectures, setLectures] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [displaySearch, setDisplaySearch] = useState(false)
    const [stream, _setStream] = useState(false)
    const streamRef = React.useRef(stream)
    const setStream = data => {
      streamRef.current = data
      _setStream(data)
    }
    const [socket, setSocket] = useState(false)

    window.addEventListener('keydown', function(e) {
      e.stopImmediatePropagation()
      if(e.which === 27) {
        setDisplaySearch(false)
      }
    });

    if(!socket) {
      setSocket(openSocket(ENDPOINT, {transports: ['websocket']}))
    }

    useEffect(() => {
      socket.on("SetSocket", data => {
        djangoLookup("POST", "/socket/set/", {socketID: data}, (response, status) => {
          status === 200 && console.log(response)
        })
      })
    }, [])

    useEffect(() => {
      socket.emit("Join", stream)
    }, [stream])

    useEffect(() => {
      djangoLookup("GET", "/users/current/", {}, (response, status) => {
        if(status === 200) {
          setCurrentUser(response)
          djangoLookup("GET", "/lectures/?action=all", {}, (response, status) => {
            status === 200 && setLectures(response)
          })
        } else {
          djangoLookup("GET", "/lectures/?action=all", {}, (response, status) => {
            status === 200 && setLectures(response)
          })
        }
      })
      djangoLookup("GET", "/streams/?action=all", {}, (response, status) => {
        status === 200 && setStream(response[0])
        $("video")[0].load()
      })
    }, [])

    const libraryAccordions = lectures.map((lecture, index) => {
      return <LibraryAccordion key={lecture.name + index} lecture={lecture} setMainStream={setStream} />
    })

    return <div><div className="d-flex" id="wrapper">

    <div className="" id="sidebar-wrapper">
      <div className="sidebar-heading" style={{textAlign: "center", marginBottom: 40}}><img style={{width:200}} src="/static/assets/img/tum_logo.png"></img></div>
      <div className="list-group list-group-mine list-group-flush">
        {/* <a href="#" className="list-group-item list-group-item-action bg-light">Dashboard</a> */}
        {libraryAccordions}
      </div>
    </div>

    <div id="page-content-wrapper">
      <UpperNavbar setTheme={setTheme} setStream={setStream} setDisplaySearch={setDisplaySearch} displaySearch={displaySearch} user={currentUser} />
      <div className="" style={{marginTop: 20, marginBottom: 20, textAlign: "center"}}>
        {stream && <div><h2>{stream.lecture.name}</h2>
        <p style={{marginBottom:0}}>{stream.room}</p>
        <p>{stream.lecture.teacher}</p></div>}
        <p>{prettifyDate(new Date(stream.time))} : {stream.name}</p>
      </div>
      <div className="row">
        <div className={displayChat ? "col-sm-9" : ""} style={!displayChat ? {flex: 1} : {}}>
            <Player stream={stream} setDisplayChat={setDisplayChat} />
        </div>
        <div className="col-sm-3" style={displayChat ? {display: "block"} : {display: "none"}}>
            {stream && <Chatbox socket={socket} streamRef={streamRef} stream={stream} currentUser={currentUser} />}
        </div>
      </div>

    </div>

  </div>
  </div>
}

function UpperNavbar(props) {
  const {displaySearch, setDisplaySearch, setStream, setTheme} = props
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleUpdateSearch = (event) => {
    event.preventDefault()
    setSearch($("#search-box").val())
  }

  const handleThemeToggle = (event) => {
    setTheme(prevState => {
      return prevState === 'light' ? 'dark' : 'light'
    })
  }

  const handleUpdateStream = (newStream) => {
    djangoLookup("GET", "/streams/?action=stream&stream=" + newStream.name, {}, (response, status) => {
      status === 200 && setStream(response[0])
      $("video")[0].load()
    })
    setDisplaySearch(false)
  }
  
  useEffect(() => {
    djangoLookup("GET", "/streams/?action=filter&filter=" + search, {}, (response, status) => {
      status === 200 && setSearchResults(response)
    })
  }, [search])

  const handleToggleButton = (event) => {
    event.preventDefault()
    $("#wrapper").toggleClass("toggled");
  }

  const searchResultList = searchResults.map((result, index) => {
    return <li key={result.name + index} className="list-group-item"><a href="#" onClick={() => handleUpdateStream(result)}>{result.name}</a></li>
  })

  const {user} = props
  return <div>
    <nav className="navbar navbar-expand-lg">
      <button className="btn" id="menu-toggle" onClick={handleToggleButton}><span className="navbar-toggler-icon"><i className="fa fa-bars"></i></span></button>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <label className="switch" style={{marginTop: 10, marginLeft: 50}}><input onClick={handleThemeToggle} type="checkbox" />    <div></div></label>
      <i className="icon-moon" style={{marginLeft: 15, marginTop: 3}}></i>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <form style={{marginRight: 0}} className="form-inline my-2 my-lg-0">
          <button onClick={() => setDisplaySearch(true)} className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search Streams</button>
          <div className="container"></div>
        </form>
          <li className="nav-item active">
            <a style={{marginRight: 20}} className="nav-link" href={user === null ? "/login/" : "/logout/"}>{user === null ? "Login" : "Logout"}<span className="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>
    {displaySearch && <div className="search-overlay">
    <body>
        <div className="orange-search">
            <form action="search.php" method="post">
              <input autoComplete="off" onChange={handleUpdateSearch} id="search-box" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>               
            </form>
          {search !== "" && <div className="list-group">
            {searchResultList}
          </div>}
        </div>
    </body>
  </div>}
  </div>
}

function LibraryAccordion(props) {
  const {lecture, setMainStream} = props
  const [streams, setStreams] = useState([])

  const handleUpdateStream = (newStream) => {
    djangoLookup("GET", "/streams/?action=stream&stream=" + newStream.name, {}, (response, status) => {
      status === 200 && setMainStream(response[0])
      $("video")[0].load()
    })
  }

  useEffect(() => {
    djangoLookup("GET", "/streams/?action=lecture&lecture=" + lecture.name, {}, (response, status) => {
      status === 200 && setStreams(response)
    })
  }, [])

  const accordionList = streams.map((stream, index) => {
    return <li key={stream.name + index} ><a className="accordion-list-item" onClick={() => handleUpdateStream(stream)} href="#">{stream.name}</a></li>
  })

  return <div id="accordion" className="my-accordion">
      <a className="list-group-item list-group-item-action" data-toggle="collapse" data-parent="#accordion" href={"#" + lecture.name.replaceAll(" ", "")}>
        {lecture.name}
    </a>
    <div id={lecture.name.replaceAll(" ", "")} className="panel-collapse collapse in">
      <div className="panel-body">
          <ul className="accordion-list">
              {accordionList}
          </ul>
      </div>
    </div>
  </div>
}

function prettifyDate(date) {
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const displayTwoDigits = (number) => {
      if(number < 10) {
          return "0" + number
      } else {
          return number
      }
  }
  return weekdays[date.getDay()] + ", " + date.getDate() + ". " + months[date.getMonth()] + " " + date.getFullYear() + ", " + displayTwoDigits(date.getHours()) + ":" + displayTwoDigits(date.getMinutes())
}

export default Navbar
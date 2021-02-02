import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { djangoLookup } from '../functions/lookup';


function Chatbox(props) {
	const {stream, currentUser, socket, streamRef} = props
	const [messages, setMessages] = useState([])

	useEffect(() => {
		console.log(stream)
		djangoLookup("GET", "/messages/?action=stream&stream=" + stream.name, {}, (response, status) => {
			status === 200 && setMessages(response)
		})
	}, [stream])

	useEffect(() => {
		socket.on("ReceiveMessage", data => {
			setMessages(prevState => [...prevState, {content: data.content}]);
			$('.message-input input').val(null);
			$(".messages").animate({ scrollTop: $("#message-list")[0].scrollHeight }, "fast")
		})
	  }, [socket])

	useEffect(() => {
		$(".messages").animate({ scrollTop: $("#message-list")[0].scrollHeight }, "fast")
	}, [])

    const newMessage = () => {
		console.log(streamRef.current)
		let message = $(".message-input input").val();
		djangoLookup("POST", "/messages/create/", {content: message, stream: streamRef.current.name}, (response, status) => {
			console.log(response)
		})
        if($.trim(message) === '') {
            return false;
		}
		setMessages(prevState => [...prevState, {content: message, user: currentUser}]);
		$('.message-input input').val(null);
		$(".messages").animate({ scrollTop: $("#message-list")[0].scrollHeight }, "fast")
		socket.emit("SendMessage", {content: message, user: currentUser, stream: streamRef.current})
	}
	
	window.addEventListener('keyup', function(e) {
		e.stopImmediatePropagation()
		if(e.which === 13) {
			newMessage()
		}
	});
	
	const sortMessages = messages.map((message, index) => {
		let className = ""
		if(currentUser !== null && typeof message.user !== "undefined" && message.user.username === currentUser.username) {
			className = "sent"
		} else {
			className = "replies"
		}
		return <li key={index + message.content} className={className}>
			<p>{message.content}</p>
		</li>
	})

    return <div>
        <div id="frame" style={{width:"auto"}}>
	<div className="content">
		<div id="message-list" className="messages">
			<ul>
				{sortMessages}
			</ul>
		</div>
		{currentUser !== null && <div className="message-input">
			<div className="wrap">
			<input type="text" placeholder="Write your message..." style={{borderRadius: 5}} />
			<i className="fa fa-paperclip attachment" aria-hidden="true"></i>
			<button onClick={newMessage} className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
			</div>
		</div>}
	</div>
</div>
<script src='//production-assets.codepen.io/assets/common/stopExecutionOnTimeout-b2a7b3fe212eaa732349046d8416e00a9dec26eb7fd347590fbced3ab38af52e.js'></script><script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
    </div>
}

export default Chatbox
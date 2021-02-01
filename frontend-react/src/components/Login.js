import React, { useState } from 'react'
import {djangoLookup} from '../functions/lookup'
import {PersonForm} from './templates/Forms'

function Login(props) {
    const [displayError, setDisplayError] = useState(false)
    const handleLoginSubmitButton = (event) => {
        event.preventDefault()
        const formEl = document.getElementById("login-form")
        const formData = new FormData(formEl)
        const loginData = {}
        formData.forEach((value, key) => {
            loginData[key] = value
        })
        console.log(loginData)
        djangoLookup("POST", "/login/", loginData, (response, status) => {
            if(status === 200) {
                window.location.href = "/"
            }
            status !== 200 && setDisplayError(true)
        })
    }

    const login_entries = [{name: "username", displayName: "Username", type: "text"},
                            {name: "password", displayName: "Password", type: "password"},
                            {name: "sessionCookie", displayName: "Accept session cookie", type: "checkbox"}]

    return <div className="container" style={{marginTop: 200}}>
        <form id="login-form">
            <h1>Login</h1>
            <PersonForm entries={login_entries} />
            <button className="btn btn-primary" type="button" onClick={handleLoginSubmitButton}>Login</button>
            {displayError && <p style={{color: "red"}}>Wrong username or password.</p>}
        </form>
        </div>
    
//     <form id="login-form">
//     <div className="form-group row">
//       <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
//       <div className="col-sm-10">
//         <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
//       </div>
//     </div>
//     <div className="form-group row">
//       <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
//       <div className="col-sm-10">
//         <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
//       </div>
//     </div>
//     <div className="form-group row">
//       <div className="col-sm-2">Checkbox</div>
//       <div className="col-sm-10">
//         <div className="form-check">
//           <input className="form-check-input" type="checkbox" id="gridCheck1"/>
//           <label className="form-check-label" for="gridCheck1">
//             Example checkbox
//           </label>
//         </div>
//       </div>
//     </div>
//     <div className="form-group row">
//       <div className="col-sm-10">
//         <button type="button" onClick={handleLoginSubmitButton} className="btn btn-primary">Sign in</button>
//       </div>
//     </div>
//   </form>
}

export default Login
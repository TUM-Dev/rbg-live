import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage'
import Login from './components/Login'
import Manage from './components/manage/Manage'

const e = React.createElement

const mainPageEl = document.getElementById("main-page")
if(mainPageEl) {
  ReactDOM.render(e(MainPage, mainPageEl.dataset), mainPageEl)
}

const loginEl = document.getElementById("login")
if(loginEl) {
  ReactDOM.render(e(Login, loginEl.dataset), loginEl)
}

const manageEl = document.getElementById("manage")
if(manageEl) {
  ReactDOM.render(e(Manage, manageEl.dataset), manageEl)
}
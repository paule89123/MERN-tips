import React, { useState, useEffect } from 'react'
import getJwt from './helpers/getJWT'
import { Switch, Route, useHistory } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Register from './Components/Register'
import Login from './Components/Login'
import Users from './Components/Users'
import CreatePost from './Components/CreatePost'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import DetailedPostPage from './Components/DetailedPostPage'
import MyPosts from './Components/MyPosts'
import Footer from './Components/Footer'
import CSSPosts from './Components/CSSPosts'
import JavascriptPosts from './Components/JavascriptPosts'
import ReactPosts from './Components/ReactPosts'
import NodejsPosts from './Components/NodejsPosts'
import MongoDBPosts from './Components/MongoDBPosts'
import LoggedOutMessage from './Components/LoggedOutMessage'

function App() {
	let history = useHistory()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ password2, setPassword2 ] = useState("")
    const [ answer, setAnswer ] = useState("")
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ justregistered, setJustregistered ] = useState(false)
    const [ menuActive, setMenuActive ] = useState(false)

    function onChangeName(e) {
        setName(e.target.value)
    }

    function onChangeEmail(e) {
        setEmail(e.target.value)
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    function onChangePassword2(e) {
        setPassword2(e.target.value)
    }

    function onChangeAnswer(e) {
        setAnswer(e.target.value)
    }

    function toggleMenu() {
        setMenuActive(prevState => !prevState)
    }

    function register(e) {
        e.preventDefault()

        if (password !== password2) {
        	return alert('Passwords do not match')
        }

        if (email.length < 5 || email.length > 200) {
        	return alert('Email address must be between 5 and 200 characters long')
        }

        if (answer !== "true" && answer !== "True" && answer !== "TRUE") {
        	return alert('Your answer to the coding question was incorrect. Please try again')
        }

        const user = {
            name: name,
            email: email,
            password: password
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('https://merntips.herokuapp.com/api/users/', options)
        .then(res => {
        	if (!res.ok) {
        		res.json().then(data => alert(data.message))
        	}
        	else {
				const token = res.headers.get('x-auth-token')
				localStorage.setItem('jwt', token)
				setLoggedIn(true)
				setJustregistered(true)
				setTimeout(() => {
					setJustregistered(false)
					history.push('/')
				}	, 2400)
            }
        })
    }

    function login(fromLocation) {
        const user = {
            email: email,
            password: password
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('https://merntips.herokuapp.com/api/auth/', options)
            .then(res => {
                if (res.ok) {
                  const token = res.headers.get('x-auth-token')
                  localStorage.setItem('jwt', token)
                  return res
                } else {
                	throw new Error('Invalid email address or password')
                }
            })
            .then(res => res.json())
            .then(data => {
            	setName(data.name)
            	setEmail(data.email)
            	setLoggedIn(true)
            	if (fromLocation !== "CreatePost") {
            		setTimeout(() => history.push('/'), 2400)
            	}
            })
            .catch(error => alert(error.message))
    }

    function logout(e) {
        localStorage.setItem('jwt', "")
        setLoggedIn(false)
        setName("")
        setEmail("")
        setPassword("")
        setPassword2("")
        setAnswer("")
        setJustregistered(false)
        setMenuActive(false)
        history.push('/logged-out')
    }

    useEffect(() => {
        const jwt = getJwt()

        const options = {
            method: 'POST',
            headers: {
                'x-auth-token': jwt
            }
        }

        fetch('https://merntips.herokuapp.com/api/auth/check', options)
            .then(res => {
                if (res.ok) {
					setLoggedIn(true)
	                return res
                } else {
	                throw new Error('Not logged in')
	            }
            })
            .then(res => res.json())
            .then(data => {
            	setName(data.name)
            	setEmail(data.email)
            })
            .catch(error => console.log(error.message))
    }, [])

  return (
	<div className="app-container">
	    <Switch>
	  		<Route exact path="/">
			    <Navbar 
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		location="home"
		    		setMenuActive={setMenuActive}
		    	/>
			    <div className="main-content">
			    	<Home />
			    </div>
			</Route>
			<Route path="/about">
				<Navbar 
					loggedIn={loggedIn}
					location="about"
					logout={logout}
					menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
				/>
		    	<Sidebar 
		    		setMenuActive={setMenuActive}
		    	/>
			    <div className="main-content">
			    	<About />
			    </div>
			</Route>
			<Route path="/register">
			    <Navbar 
			    	loggedIn={loggedIn}
			    	location="register"
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar 
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<Register 
		    			onChangeName={onChangeName}
						onChangeEmail={onChangeEmail}
						onChangePassword={onChangePassword}
						onChangePassword2={onChangePassword2}
						onChangeAnswer={onChangeAnswer}
						register={register}
						login={login}
						logout={logout}
						name={name}
						email={email}
						password={password}
						password2={password2}
						answer={answer}
						loggedIn={loggedIn}
						justregistered={justregistered}
					/>
		    	</div>
			</Route>
	  		<Route path="/login">
			    <Navbar 
			    	location="login"
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar 
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<Login 
						onChangeEmail={onChangeEmail}
						onChangePassword={onChangePassword}
						login={login}
						name={name}
						email={email}
						password={password}
						loggedIn={loggedIn}
						fromLocation="login"
					/>
		    	</div>
			</Route>
	  		<Route path="/create-post">
			    <Navbar
				    loggedIn={loggedIn}
				    logout={logout}
				    menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar 
		    		location="create-post"
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<CreatePost 
						onChangeEmail={onChangeEmail}
						onChangePassword={onChangePassword}
						login={login}
						email={email}
						password={password}
						loggedIn={loggedIn}
		    		/>
		    	</div>
			</Route>
			<Route path="/users">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<Users />
		    	</div>
			</Route>
			<Route path="/posts/:postId">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<DetailedPostPage />
		    	</div>
			</Route>
			<Route path="/my-posts">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		location="my-posts"
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<MyPosts
		    			email={email}
		    			onChangeEmail={onChangeEmail}
						onChangePassword={onChangePassword}
		    			password={password}
		    			loggedIn={loggedIn}
		    			login={login}
		    		/>
		    	</div>
			</Route>
			<Route path="/css">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		location="home"
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<CSSPosts />
		    	</div>
			</Route>
			<Route path="/javascript">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		location="home"
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<JavascriptPosts />
		    	</div>
			</Route>
			<Route path="/react">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		location="home"
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<ReactPosts />
		    	</div>
			</Route>
			<Route path="/nodejs">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		location="home"
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<NodejsPosts />
		    	</div>
			</Route>
			<Route path="/mongodb">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		location="home"
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<MongoDBPosts />
		    	</div>
			</Route>
			<Route path="/logged-out">
			    <Navbar
			    	loggedIn={loggedIn}
			    	logout={logout}
			    	menuActive={menuActive}
			    	toggleMenu={toggleMenu}
			    	setMenuActive={setMenuActive}
			    />
		    	<Sidebar
		    		setMenuActive={setMenuActive}
		    	/>
		    	<div className="main-content">
		    		<LoggedOutMessage />
		    	</div>
			</Route>
		</Switch>
		<Footer />
	</div>
  )
}

export default App
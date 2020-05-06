import React, { useState, useEffect } from 'react';
import axios from 'axios'
import logo from '../logo.svg';
import '../App.css';
import getJwt from '../helpers/getJWT';
import { Link } from 'react-router-dom'


function Users() {
    const [ name, setName ] = useState("")
    const [ users, setUsers ] = useState([])
    // const [ password, setPassword ] = useState("")
    const [ loggedIn, setLoggedIn] = useState(false)

    // function onChangePassword(e) {
    //     setPassword(e.target.value)
    // }

    // function login(e) {
    //     e.preventDefault()

    //     const user = {
    //         email: email,
    //         password: password
    //     }

    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify(user),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }

    //     fetch('http://localhost:3000/api/auth/', options)
    //         .then(res => {
    //             if (res.status === 200) {
    //               const token = res.headers.get('x-auth-token')
    //               localStorage.setItem('jwt', token)
    //               setLoggedIn(true)
    //               return res
    //             }
    //         })
    //         .then(res => res.json())
    //         .then(jsonResponse => setName(jsonResponse.name))
    //     // window.location = '/'
    // }

    // function logout(e) {
    //     localStorage.setItem('jwt', "")
    //     setLoggedIn(false)
    // }

    useEffect(() => {
        const jwt = getJwt()

        const options = {
            method: 'POST',
            headers: {
                'x-auth-token': jwt
            }
        }

        fetch('http://localhost:3000/api/users/list', options)
        .then(res => res.json())
        .then(jsonResponse => {
            // const nameArr = jsonResponse.map(item => item.name)
            // console.log(jsonResponse)
            
            let posts = jsonResponse.map(item => 
                <div className="post">
                    <h1>{item.name}</h1>
                    <h2>{item._id}</h2>
                    <h3>{item.email}</h3>
                </div>
            )
// let list = nameArr.map(item => <li>{item}</li>)
                
            setUsers(posts)
            setLoggedIn(true)
        })
        }, []
    )

    let string = <div>You must login to be able to see the users list <Link to='/'>Login/Register</Link></div>


    return (
        <div className="App">
            <ul>{loggedIn ? 
                <div><ul>{users}</ul><Link to='/'>Return to homepage</Link></div> 
                : string
        }</ul>
            
        </div>
    )
}

export default Users;



// <input placeholder=" " type="text" name="name" id="name" required autocomplete="off" />
//                 <label for="name">
//                 <span className="label-content">Name</span>
//               </label>
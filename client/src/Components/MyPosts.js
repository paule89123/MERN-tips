import React, { useState, useEffect } from 'react'
import Post from './Post'
import Login from './Login'
import getJwt from '../helpers/getJWT'
import { Link } from 'react-router-dom'

function MyPosts(props) {
    const [ post, setPost ] = useState([])
    const [ errorMessage, setErrorMessage ] = useState("")

	useEffect(() => {

        let JWT = getJwt()

		fetch(`https://merntips.herokuapp.com/api/posts/getPostByJWT?JWT=${JWT}`)
        .then(res => { 
            if (res.ok) {
                setErrorMessage("")
                return res
            } else {
                throw new Error("There was an error loading your posts. Please refresh your browser to try again")
            }
        })
        .then(res => res.json())
        .then(data =>  {
            let post = data.map(post => 
                <Post
                    title={post.title}
                    subtitle={post.subtitle}
                    category={post.category}
                    name={post.name}
                    article={post.article}
                    id={post._id}
                />
            )
        setPost(post)
        })
        .catch(error => setErrorMessage(error.message))
	}, [props.loggedIn])

	return (
		<div>
		{props.loggedIn && post}

        {props.loggedIn && post.length === 0 && <div style={{fontWeight: "500"}}>You have not made any posts yet.</div>}

        {!props.loggedIn && 
            <div>
            <span style={{fontWeight: "500"}}>You must be logged in to see your posts. Please sign in below or <Link style={{textDecoration: "underline"}} to="/register">click here to register</Link>.</span>
            <br /><br /><br />
                <Login 
                    onChangeEmail={props.onChangeEmail}
                    onChangePassword={props.onChangePassword}
                    login={props.login}
                    email={props.email}
                    password={props.password}
                    loggedIn={props.loggedIn}
                    fromLocation="CreatePost"
                />

            </div>
        }

        {props.loggedIn && errorMessage}

		</div>
	)
}

export default MyPosts

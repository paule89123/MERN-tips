import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import getJwt from '../helpers/getJWT'
import Login from './Login'

function CreatePost(props) {
    let history = useHistory()

    const [ title, setTitle ] = useState("")
    const [ subtitle, setSubtitle ] = useState("")
    const [ category, setCategory ] = useState("css")
    const [ article, setArticle ] = useState("")

    function onChangeTitle(e) {
        setTitle(e.target.value)
    }

    function onChangeSubtitle(e) {
        setSubtitle(e.target.value)
    }

    function onChangeCategory(e) {
        setCategory(e.target.value)
    }

    function onChangeArticle(e) {
        setArticle(e.target.value)
    }

    function submitPost(e) {
        e.preventDefault()

        const jwt = getJwt()

        const post = {
            title: title,
            subtitle: subtitle,
            category: category,
            article: article
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwt
            }
        }

        fetch('https://merntips.herokuapp.com/api/posts', options)
            .then(res => {
                if (res.ok) {
                    alert("Your post was successfully submitted")
                    history.push('/')
                } else {
                    alert("There was an error. Please try submitting your post again")
                }
            })
    }

    return (
        <div>
        {props.loggedIn && (
                <div>
                    <form onSubmit={submitPost}>

                        <div className="input-container">
                            <input autoComplete="off" onChange={onChangeTitle} value={title} placeholder=" " type="text" id="title" name="title" required />
                            <label for="title">
                                <span className="label-content">Title</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                            <input autoComplete="off" onChange={onChangeSubtitle} value={subtitle} placeholder=" " type="text" id="subtitle" name="subtitle" required />
                            <label for="subtitle">
                                <span className="label-content">Subtitle</span>
                            </label>
                        </div>

                        <br />

                        <div className="input-container">
                        <label for="category">Category</label>
                        <br /><br />
                            <select value={category} onChange={onChangeCategory} id="category" name="category">
                              <option value="css">CSS</option>
                              <option value="javascript">Javascript</option>
                              <option value="react">React</option>
                              <option value="nodejs">Node.js</option>
                              <option value="mongodb">MongoDB</option>
                            </select>
                        </div>

                        <br /><br />

                        <div className="input-container">
                            <textarea onChange={onChangeArticle} value={article} placeholder="Write your post here..." type="text" id="article" name="article" required />
                        </div>

                        <br />

                        <div className="input-container submit-container">
                              <input type="submit" name="submit" value="Submit" id="submit" />
                        </div>
                    </form> 
        </div>)}

        {!props.loggedIn && 
            <div>
            <span style={{fontSize: "16px", fontWeight: "500"}}>You must be logged in to create a post. Please sign in below or <Link style={{textDecoration: "underline"}} to="/register">click here to register</Link>.</span>
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
    </div>
    )
}

export default CreatePost



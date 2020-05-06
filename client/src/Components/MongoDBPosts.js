import React, { useState, useEffect } from 'react'
import Post from './Post'
import CategoryLinks from './CategoryLinks'

function MongoDBPosts() {
    const [ post, setPost ] = useState([])
    const [ errorMessage, setErrorMessage ] = useState("")

	useEffect(() => {

		fetch("https://merntips.herokuapp.com/api/posts/getPostByCategory?category=mongodb")
        .then(res => { 
            if (res.ok) {
                setErrorMessage("")
                return res
            } else {
                throw new Error("There was an error loading the posts. Please refresh your browser to try again")
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
    }, [])

	return (
		<div>
            <CategoryLinks />
            {post}
        </div>
	)
}

export default MongoDBPosts

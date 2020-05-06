import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Post from './Post'

function DetailedPostPage(props) {
    const [ post, setPost ] = useState([])
    const [ errorMessage, setErrorMessage ] = useState("")

	const productId = useParams().postId

	useEffect(() => {

		fetch(`https://merntips.herokuapp.com/api/posts/getProductById?id=${productId}&type=single`)
        .then(res => { 
            if (res.ok) {
            	setErrorMessage("")
	            return res
            } else {
            	throw new Error('There was an error loading the post. Please refresh your browser to try again')
            }
        })
        .then(res => res.json())
        .then(jsonResponse =>  {
            let post = jsonResponse.map(post => 
                <Post
                    title={post.title}
                    subtitle={post.subtitle}
                    category={post.category}
                    name={post.name}
                    article={post.article}
                    detailedPost={true}
                />
            )
	        setPost(post)
        })
        .catch(error => setErrorMessage(error.message))
	}, [])

	return (
		<div>
			{errorMessage}
			{post}
		</div>
	)
}

export default DetailedPostPage

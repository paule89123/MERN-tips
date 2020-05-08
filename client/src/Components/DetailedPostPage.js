import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Post from './Post'

function DetailedPostPage(props) {
    const [ post, setPost ] = useState([])
    const [ errorMessage, setErrorMessage ] = useState("")
    // const [ date, setDate ] = useState("")

	const postId = useParams().postId

    function postIdToDate(postId) {
        return new Date(parseInt(postId.substring(0, 8), 16) * 1000)
    }

    const date = postIdToDate(postId)
    const monthArr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    const monthNumb = date.getMonth()
    const month = monthArr[monthNumb]
    const day = date.getDate()
    const year = date.getFullYear()
    const dateAsString = month + " " + day + ", " + year

	useEffect(() => {

        window.scrollTo(0, 0)

		fetch(`https://merntips.herokuapp.com/api/posts/getProductById?id=${postId}`)
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
                    date={dateAsString}
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

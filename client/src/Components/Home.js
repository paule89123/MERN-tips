import React, { useState, useEffect } from 'react'
import Post from './Post'
import CategoryLinks from './CategoryLinks'

let loadMoreStyle = {
    fontSize: "14px",
    padding: "12px 21px",
    margin: "4px 0px",
    cursor: "pointer",
    border: "1px solid rgb(207,215,233)",
    borderRadius: "1px",
    display: "inline-block"
}

function Home() {
    const [ posts, setPosts ] = useState([])
    const [ Skip, setSkip ] = useState(0)
    const [ Limit, setLimit ] = useState(4)
    const [ loadSize, setLoadSize ] = useState(0)
    const [ errorMessage, setErrorMessage ] = useState("")

    function loadMore() {
        getPosts()
    }

    function getPosts(firstTime) {
        let skip

        if (firstTime) {
            skip = 0
        } else {
            skip = Skip + Limit
        }

        let variables = {
            skip: skip,
            limit: Limit
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(variables),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        setSkip(skip)

        fetch('https://merntips.herokuapp.com/api/posts/getAll', options)
            .then(res => {
                if (res.ok) {
                    setErrorMessage("")
                    return res
                } else {
                    throw new Error('There was an error in loading the posts. Please refresh your browser to try again')
                }
            })
            .then(res => res.json())
            .then(data =>  {
                let newPosts = data.map(post => 
                    <Post
                        title={post.title}
                        subtitle={post.subtitle}
                        category={post.category}
                        name={post.name}
                        article={post.article}
                        id={post._id}
                    />
                )
                setLoadSize(newPosts.length)
                setPosts([...posts, newPosts])
            })
            .catch(error => setErrorMessage(error.message))
    }

    useEffect(() => {
        getPosts(true)
    }, [])

    return (
        <div>
            <CategoryLinks />

            {errorMessage}

            {posts}

            {posts.length > 0 && loadSize === Limit &&
                <div onClick={loadMore} style={loadMoreStyle}>Load more</div>
            }
        </div>
    )
}

export default Home
import React from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag'

function CategoryLinks() {
	return (
		<div>
			<Link to="/css"><Tag category="css" /></Link>
	        <Link to="/javascript"><Tag category="javascript" /></Link>
	        <Link to="/react"><Tag category="react" /></Link>
	        <Link to="/nodejs"><Tag category="nodejs" /></Link>
	        <Link to="/mongodb"><Tag category="mongodb" /></Link>
	        <div style={{height: "40px"}}></div>
        </div>
    )
}

export default CategoryLinks
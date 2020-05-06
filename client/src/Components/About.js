import React from 'react'
import { Link } from 'react-router-dom'


let paragraphStyle = {
  fontSize: "16px",
  fontWeight: "400",
    // letterSpacing: "0px"
}

let logoStyle = {
  fontSize: "14px",
  fontWeight: "900",
  letterSpacing: "1px"
}

function About(props) {
	return (
		<div>
			<span style={logoStyle}>MERN TIPS</span><span style={paragraphStyle}> is a free resource for anyone looking to increase their knowledge of the MERN stack (MongoDB, Express, React, Node.js).
				<br /><br />
				Anyone is welcome to post a MERN tip, we simply require you to answer a <Link style={{textDecoration: "underline"}} to="/register">simple coding question</Link> first to demonstrate that you are a coder.
			</span>
		</div>
	)
}

export default About

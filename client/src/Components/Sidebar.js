import React from 'react'
import { Link } from 'react-router-dom'

let inactiveStyle = {
	borderRadius: "25px",
	padding: "10px 21px",
	margin: "0px 0px 8px 0px",
	cursor: "pointer"
}

let activeStyle = {
	borderRadius: "25px",
	padding: "10px 21px",
	margin: "0px 0px 8px 0px",
	cursor: "pointer",
	backgroundColor: "rgb(207,215,233)",
	color: "rgb(16,16,22)"
}

function Sidebar(props) {

	return (
		<div>

		{props.location === "home" && 
			<div>
				<span className="mobile-only">
					<div style={{paddingLeft: "22px"}} className="sidebar-links">
						<Link to="/">
				            <div onClick={() => props.setMenuActive(false)} style={activeStyle}>Home</div>
			            </Link>
						<Link to="/my-posts">
				            <div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>My Posts</div>
			            </Link>
			            <Link to="/create-post">
			            	<div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>Create Post</div>
			            </Link>
			        </div>
			    </span>

			    <span className="desktop-only">
					<div className="sidebar-links">
						<Link to="/">
				            <div onClick={() => props.setMenuActive(false)} style={activeStyle}>Home</div>
			            </Link>
						<Link to="/my-posts">
				            <div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>My Posts</div>
			            </Link>
			            <Link to="/create-post">
			            	<div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>Create Post</div>
			            </Link>
			        </div>
			    </span>
			</div>
        }

        {props.location === "my-posts" && 
			<div className="sidebar-links">
				<Link to="/">
		            <div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>Home</div>
	            </Link>
				<Link to="/my-posts">
		            <div onClick={() => props.setMenuActive(false)} style={activeStyle}>My Posts</div>
	            </Link>
	            <Link to="/create-post">
	            	<div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>Create Post</div>
	            </Link>
            </div>
        }

        {props.location === "create-post" && 
			<div className="sidebar-links">
				<Link to="/">
		            <div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>Home</div>
	            </Link>
				<Link to="/my-posts">
		            <div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>My Posts</div>
	            </Link>
	            <Link to="/create-post">
	            	<div onClick={() => props.setMenuActive(false)} style={activeStyle}>Create Post</div>
	            </Link>
            </div>
        }

        {props.location !== "home" && props.location !== "my-posts" && props.location !== "create-post" &&
			<div className="sidebar-links">
				<Link to="/">
		            <div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>Home</div>
	            </Link>
				<Link to="/my-posts">
		            <div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>My Posts</div>
	            </Link>
	            <Link to="/create-post">
	            	<div onClick={() => props.setMenuActive(false)} style={inactiveStyle}>Create Post</div>
	            </Link>
            </div>
        }

		</div>
	)
}

export default Sidebar

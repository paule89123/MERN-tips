import React from 'react'
import { Link } from 'react-router-dom'
import menuIcon from '../images/menu.svg'

let navBarStyle = {
  height: "120px",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  wrap: "wrap",
  padding: "24px 22px 0px 22px"
}

let logoStyle = {
  fontSize: "14px",
  fontWeight: "900",
  letterSpacing: "1px"
}

let inactiveLinkStyle = {
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "1px",
  marginLeft: "40px"
}

let activeLinkStyle = {
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "1px",
  marginLeft: "40px",
  height: "20px",
  borderBottom: "1px solid rgb(207,215,233)"
}

let loginLinkStyle = {
  boxSizing: "border-box",
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "1px",
  margin: "0px",
  marginLeft: "40px",
  height: "auto",
  display: "inline",
  padding: "4px",
  border: "1px solid rgb(207,215,233)",
  backgroundColor: "rgb(207,215,233)",
  color: "rgb(16,16,22)",
  borderRadius: "4px",
  position: "relative",
  bottom: "5px",
  cursor: "pointer"
}

let linksContainer = {
  display: "flex"
}

function Navbar(props) {
	return (
		<>
			<div style={navBarStyle}>
				<div style={logoStyle}>
					<Link to="/">
						MERN TIPS
					</Link>
				</div>

				<div className="linksContainer">

					{props.location === "about" && !props.loggedIn &&
						<div style={linksContainer}>
							<div style={activeLinkStyle}><Link to="/about">ABOUT</Link></div>
				            <div style={inactiveLinkStyle}><Link to="/register">REGISTER</Link></div>
				            <div style={loginLinkStyle}><Link style={{color: "rgb(16,16,22)"}} to="/login">LOGIN</Link></div>
			            </div>
			        }

			        {props.location === "register" && !props.loggedIn &&
				        <div style={linksContainer}>
							<div style={inactiveLinkStyle}><Link to="/about">ABOUT</Link></div>
				            <div style={activeLinkStyle}><Link to="/register">REGISTER</Link></div>
				            <div style={loginLinkStyle}><Link style={{color: "rgb(16,16,22)"}} to="/login">LOGIN</Link></div>
			            </div>
			        }

			        {props.location !== "about" && props.location !== "register" && !props.loggedIn &&
				        <div style={linksContainer}>
							<div style={inactiveLinkStyle}><Link to="/about">ABOUT</Link></div>
				            <div style={inactiveLinkStyle}><Link to="/register">REGISTER</Link></div>
				            <div style={loginLinkStyle}><Link style={{color: "rgb(16,16,22)"}} to="/login">LOGIN</Link></div>
			            </div>
			        }



					{props.location === "about" && props.loggedIn &&
						<div style={linksContainer}>
							<div style={activeLinkStyle}><Link to="/about">ABOUT</Link></div>
				            <div style={inactiveLinkStyle}><Link to="/register">REGISTER</Link></div>
				            <div onClick={props.logout} style={loginLinkStyle}>LOGOUT</div>
			            </div>
			        }

			        {props.location === "register" && props.loggedIn &&
				        <div style={linksContainer}>
							<div style={inactiveLinkStyle}><Link to="/about">ABOUT</Link></div>
				            <div style={activeLinkStyle}><Link to="/register">REGISTER</Link></div>
				            <div onClick={props.logout} style={loginLinkStyle}>LOGOUT</div>
			            </div>
			        }

			        {props.location !== "about" && props.location !== "register" && props.loggedIn &&
				        <div style={linksContainer}>
							<div style={inactiveLinkStyle}><Link to="/about">ABOUT</Link></div>
				            <div style={inactiveLinkStyle}><Link to="/register">REGISTER</Link></div>
				            <div onClick={props.logout} style={loginLinkStyle}>LOGOUT</div>
			            </div>
			        }

		        </div>

		        <img src={menuIcon} className="menuIcon" onClick={props.toggleMenu} alt="menu" />

			</div>

	        {props.menuActive && !props.loggedIn &&
		        <div className="mobile-links" >
					<div onClick={() => props.setMenuActive(false)} className="mobile-link"><Link to="/about">ABOUT</Link></div>
		            <div onClick={() => props.setMenuActive(false)} className="mobile-link"><Link to="/register">REGISTER</Link></div>
		            <div onClick={() => props.setMenuActive(false)} className="mobile-link"><Link to="/login">LOGIN</Link></div>
	            </div>
	    	}

	    	{props.menuActive && props.loggedIn &&
		        <div className="mobile-links">
					<div onClick={() => props.setMenuActive(false)} className="mobile-link"><Link to="/about">ABOUT</Link></div>
		            <div onClick={() => props.setMenuActive(false)} className="mobile-link"><Link to="/register">REGISTER</Link></div>
		            <div className="mobile-link" onClick={props.logout} style={{cursor: "pointer"}}>LOGOUT</div>
	            </div>
	    	}
    	</>
	)
}

export default Navbar

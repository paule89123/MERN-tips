import React from 'react'

let footerStyle = {
  padding: "0px 22px 0px 22px",
  marginBottom: "50px",
  width: "100%"
}

let paragraphStyle = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "1.35"
}

let logoStyle = {
  fontSize: "14px",
  fontWeight: "900",
  letterSpacing: "1px",
  marginBottom: "8px"
}

function Footer(props) {
	return (
		<div style={footerStyle}>
			<div style={logoStyle}>MERN TIPS</div>
			<div style={paragraphStyle}>A free resource for coders.
			<br /><br />
			Created by <a style={{textDecoration: "underline"}} href="https://paulevans.tech" target="_blank" rel="noopener noreferrer">Paul Evans</a>.
			</div>
		</div>
	)
}

export default Footer

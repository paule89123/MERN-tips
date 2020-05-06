import React from 'react'

let cssStyle = {
	borderRadius: "1px",	
	display: "inline-block",
	padding: "7px 14px",
	fontSize: "13px",
	fontWeight: "700",
	color: "rgb(20, 179, 166)",
	backgroundColor: "rgba(20, 179, 166, 0.12)",
	marginRight: "7px"
}

let javascriptStyle = {
	borderRadius: "1px",	
	display: "inline-block",
	padding: "7px 14px",
	fontSize: "13px",
	fontWeight: "700",
	color: "rgb(29, 149, 233)",
	backgroundColor: "rgba(29, 149, 233, 0.12)",
	marginRight: "7px"
}

let reactStyle = {
	borderRadius: "1px",	
	display: "inline-block",
	padding: "7px 14px",
	fontSize: "13px",
	fontWeight: "700",
	color: "rgb(95, 92, 255)",
	backgroundColor: "rgba(95, 92, 255, 0.12)",
	marginRight: "7px"
}

let nodejsStyle = {
	borderRadius: "1px",	
	display: "inline-block",
	padding: "7px 14px",
	fontSize: "13px",
	fontWeight: "700",
	color: "rgb(168, 67, 255)",
	backgroundColor: "rgb(168, 67, 255, 0.12)",
	marginRight: "7px"
}

let mongodbStyle = {
	borderRadius: "1px",	
	display: "inline-block",
	padding: "7px 14px",
	fontSize: "13px",
	fontWeight: "700",
	color: "rgb(197, 55, 181)",
	backgroundColor: "rgb(197, 55, 181, 0.12)",
	marginRight: "7px"
}

function Tag(props) {
	return (
			<div style={{display: "inline-block"}}>
				{props.category === "css" && <div style={cssStyle}>CSS</div>}
				{props.category === "javascript" && <div style={javascriptStyle}>Javascript</div>}
				{props.category === "react" && <div style={reactStyle}>React</div>}
				{props.category === "nodejs" && <div style={nodejsStyle}>Node.js</div>}
				{props.category === "mongodb" && <div style={mongodbStyle}>MongoDB</div>}
			</div>
	)
}

export default Tag

import React from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag'

let postStyle = {
  backgroundColor: "rgb(25,25,35)",
  padding: "31px",
  margin: "0px 0px 20px 0px",
  borderRadius: "1px"
}

let detailedPostStyle = {
  margin: "0px 0px 30px 0px",
}

let titleStyle = {
	fontSize: "28px",
	lineHeight: "1.04",
	// marginBottom: "2px",
	color: "rgb(235,235,255)"
}

let detailedTitleStyle = {
	fontSize: "42px",
	lineHeight: "1.05",
	// marginBottom: "12px",
	color: "rgb(235,235,255)"
}

let subtitleStyle = {
	fontSize: "14px",
	lineHeight: "20px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	color: "rgb(148,155,160)"
}

let detailedSubtitleStyle = {
	fontSize: "24px",
	fontFamily: "Work Sans",
	fontStyle: "italic",
	// fontWeight: "400",
	color: "rgb(148,155,160)",
	lineHeight: "1.4",
	// marginBottom: "12px"
}

let nameStyle = {
	fontSize: "16px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	color: "rgb(212,220,225)",
}

let dateStyle = {
	fontSize: "16px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	color: "rgb(148,155,160)",
}

let articleStyle = {
	fontSize: "16px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	color: "rgb(212,220,225)",
	whiteSpace: "pre-wrap",
	lineHeight: "24px"
}


function Post(props) {

	return (
		<div>
			{!props.detailedPost &&
				<Link to={"/posts/" + props.id}>
					<div style={postStyle}>
						<div style={titleStyle}>{props.title}</div>
			            <div style={{height: "12px"}}></div>
			            <div style={subtitleStyle}>{props.subtitle}</div>
			            <div style={{height: "28px"}}></div>
			            <Tag category={props.category} />
					</div>
				</Link>
			}

			{props.detailedPost &&
				<div style={detailedPostStyle}>
					<div style={detailedTitleStyle}>{props.title}</div>
		            <div style={{height: "23px"}}></div>
		            <div style={nameStyle}>{props.name}</div>
		            <div style={dateStyle}>{props.date}</div>
		            <div style={{height: "28px"}}></div>
		            <Tag category={props.category} />
		            <div style={{height: "50px"}}></div>
		            <div style={detailedSubtitleStyle}>{props.subtitle}</div>
		            <div style={{height: "50px"}}></div>
		            <div style={articleStyle}>{props.article}</div>
				</div>
			}
		</div>
	)
}

export default Post

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
	fontSize: "32px",
	lineHeight: "1.04",
	marginBottom: "12px",
	color: "rgb(235,235,255)"
}

let detailedTitleStyle = {
	fontSize: "42px",
	lineHeight: "1.05",
	marginBottom: "12px",
	color: "rgb(235,235,255)"
}

let subtitleStyle = {
	fontSize: "16px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	color: "rgb(212,220,225)"
}

let detailedSubtitleStyle = {
	fontSize: "22px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	marginBottom: "12px",
	color: "rgb(212,220,225)"
}

let nameStyle = {
	fontSize: "16px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	color: "rgb(212,220,225)"
}

let articleStyle = {
	fontSize: "16px",
	fontFamily: "Work Sans",
	fontWeight: "400",
	color: "rgb(212,220,225)",
	whiteSpace: "pre-wrap"
}

function Post(props) {
	return (
		<div>
			{!props.detailedPost &&
				<Link to={"/posts/" + props.id}>
					<div style={postStyle}>
						<div style={titleStyle}>{props.title}</div>
			            <div style={subtitleStyle}>{props.subtitle}</div>
			            <div style={nameStyle}>{props.name}</div>
			            <div style={{height: "15px"}}></div>
			            <Tag category={props.category} />
					</div>
				</Link>
			}

			{props.detailedPost &&
				<div style={detailedPostStyle}>
					<div style={detailedTitleStyle}>{props.title}</div>
		            <div style={detailedSubtitleStyle}>{props.subtitle}</div>
		            <div style={nameStyle}>{props.name}</div>
		            <div style={{height: "15px"}}></div>
		            <Tag category={props.category} />
		            <div style={{height: "45px"}}></div>
		            <div style={articleStyle}>{props.article}</div>
				</div>
			}
		</div>
	)
}

export default Post

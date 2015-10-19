import React from 'react';
import ReactDOM from 'react-dom';
var marked = require('marked');

class Md_textarea extends React.Component {
    constructor() {
        super();
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(e) {
        this.props.onChanged(e.target.value);
    }
    render() {
        return  <div style={this.props.style.warpper}>
        			<textarea  style={this.props.style.textarea} onChange = {this._handleChange} /> 
        		</div>
    }
}


class React_markdown extends React.Component {
    constructor() {
        super();
        this._handleChanged = this._handleChanged.bind(this);
        this.state = {value:""};
    }

    rawMarkup() {
        var rawMarkup = marked(this.state.value.toString(), {
            sanitize: true
        });
        return {
            __html: rawMarkup
        };
    }

    _handleChanged(val) {
        this.setState({value:val});

    }


    render() {
    	var style = {
    		react_markdown : {
    			display : "block",
    			width : "100%",
    			height : "100%",
    			boxShadow: "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",
    			backgroundColor : "#fff",
    			position:"relative",
    			paddingTop:"72px",
    			boxSizing: "border-box"
    		},
    		send_title:{
    			width:"100%",
    			position:"absolute",
    			top:"0",
    			bottom:"0",
    			height:"72px"
    		},
    		title_input : {
    			display: "block",
				width: "80%",
				padding: "30px 0 20px",
				margin: "0 auto",
				border: "0",
				fontSize: "22px",
				height: "22px",
				minHeight: "22px",
				lineHeight: "1.4",
				fontWeight: "bold",
				textAlign: "center",
				overflow: "hidden",
				resize: "none",
				outline: "0"

    		},
    		main : {
    			width : "100%",
    			height : "100%",
    			borderTop: "1px solid #ccc",
    			fontSize:"0"
    		},
    		md_textarea:{
    			warpper : {
    				display:"inline-block",
    				width:"50%",
	    			height:"100%",
				    overflowY: "scroll",
				    borderRight: "1px solid #ccc",
				    boxSizing: "border-box"
    			},
    			textarea : {
    				border:"none",
				    overflow:"hidden",
				    wordWrap:"break-word",
				    resize:"none",
				    width:"100%",
				    padding:"20px 15px 20px 20px",
				    height:"100%",
				    outline:"none",
				    boxSizing:"border-box",
				    fontSize:"16px",
				    WebkitAppearance:"none",
				    WebkitRtlOrdering:"logical",
				    WebkitUserSelect: "text"
    			}
    		},
    		md_preview:{
    			verticalAlign:"top",
    			display:"inline-block",
    			width:"50%",
    			height:"100%",
			    overflowY: "scroll",
			    backgroundColor: "#f6f6f6",
			    borderLeft: "1px solid #ccc",
			    boxSizing: "border-box",
			    padding: "20px 15px 20px 20px",
			    fontSize: "16px",
			    wordWrap: "break-word"
    		}

    	}
        return  	<form action="#" style={style.react_markdown}>
        				<div style={style.send_title}>
        					<input type="text" style={style.title_input} placeholder="文档标题"/>
        				</div>
        				<div style={style.main}>
        					< Md_textarea style={style.md_textarea} onChanged = {this._handleChanged}/> 
   				    		<div style={style.md_preview} dangerouslySetInnerHTML={this.rawMarkup()} />
        				</div>
        			</form>
        	
    }
}




ReactDOM.render( < React_markdown / > , document.querySelector("#react_markdown"));

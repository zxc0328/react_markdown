import React from 'react';
import ReactDOM from 'react-dom';
var marked = require('marked');

class Md_textarea extends React.Component {
    constructor() {
        super();
        this._handleChange = this._handleChange.bind(this);
        this._handleScroll = this._handleScroll.bind(this);
    }
    _handleChange(e) {
        this.props.onChanged(e.target.value);
    }

    _handleScroll(e) {
        this.props.onScrolled(e.target);
    }

    render() {
        return  <div style={this.props.style.warpper}>
        			<textarea  style={this.props.style.textarea} value={this.props.value} onChange = {this._handleChange} 
                    onScroll = {this._handleScroll}/> 
        		</div>
    }
}


class Md_toolbar extends React.Component {
    constructor() {
        super();
        this.shortCutList = {
            img:"![图片](http://muxistudio.qiniudn.com/img.png)",
            code:"````\ncode\n````",
            italic:"*斜体*",
            link:"[链接内容](http://muxistudio.com)",
            list:"- 无序列表"  
        };
    }

    render() {
        var fileNameList = [
            "img.svg","code.svg","italic.svg","link.svg","list.svg"
        ]
        return  <div style={this.props.style.warpper}>
                    <Md_toolbar_item fileName={fileNameList[0]} scList={this.shortCutList} type="img" style={this.props.style} _handleClicked={this.props._handleClicked}/>
                    <Md_toolbar_item fileName={fileNameList[1]} scList={this.shortCutList} type="code" style={this.props.style} _handleClicked={this.props._handleClicked}/>
                    <Md_toolbar_item fileName={fileNameList[2]} scList={this.shortCutList} type="italic" style={this.props.style} _handleClicked={this.props._handleClicked}/>
                    <Md_toolbar_item fileName={fileNameList[3]} scList={this.shortCutList} type="link" style={this.props.style} _handleClicked={this.props._handleClicked}/>
                    <Md_toolbar_item fileName={fileNameList[4]} scList={this.shortCutList} type="list" style={this.props.style} _handleClicked={this.props._handleClicked}/>
                </div>
    }
}

class Md_toolbar_item extends React.Component {
    constructor() {
        super();
        this.state = {hover:false};
        this._handleClick = this._handleClick.bind(this);
        this._toggleHover = this._toggleHover.bind(this);
    }
    
    _toggleHover(){
        this.setState({hover:!this.state.hover})
    }

    _handleClick(){
        this.props._handleClicked(this.props.scList[this.props.type])
    }

    render() {
        return  <img src={"images/"+this.props.fileName} style={this.state.hover? this.props.style.item_hover:this.props.style.item} 
        onMouseEnter={this._toggleHover} onMouseLeave={this._toggleHover} 
        onClick={this._handleClick}/>
    }
}

class React_markdown extends React.Component {
    constructor() {
        super();
        this._handleChanged = this._handleChanged.bind(this);
        this._handleClicked = this._handleClicked.bind(this);
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

    _handleScrolled(t){
        t.parentNode.nextElementSibling.scrollTop = t.scrollTop;
    }

    _handleClicked(val){
        var new_val = this.state.value + val
        this.setState({value:new_val});
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
    			paddingTop:"122px",
    			boxSizing: "border-box"
    		},
    		send_title:{
    			width:"100%",
    			position:"absolute",
    			top:"0",
    			left:"0",
    			height:"72px"
    		},
            md_toolbar:{
                warpper:{
                    width:"100%",
                    position:"absolute",
                    top:"72px",
                    left:"0",
                    height:"50px",
                    borderTop: "1px solid #e3e3e3",
                    textAlign: "center",
                    lineHeight:"50px"
                },
                item:{
                    display:"inline-block",
                    height:"20px",
                    width:"auto",
                    opacity:"0.6",
                    verticalAlign:'middle',
                    cursor: "pointer",
                    marginRight:"10px"
                },
                item_hover:{
                    display:"inline-block",
                    height:"20px",
                    width:"auto",
                    opacity:"1",
                    verticalAlign:'middle',
                    cursor: "pointer",
                    marginRight:"10px"
                }
            },
            send_bottom:{
                width:"100%",
                position:"absolute",
                left:"0",
                bottom:"0",
                height:"70px",
                boxShadow: "0 -1px 2px rgba(0, 0, 0, 0.1)",
                zIndex: "100",
                borderTop: "1px solid #e3e3e3",
                padding: "0 100px",
                boxSizing:"border-box",
                backgroundColor:"#fff",
                lineHeight:'70px'
            },
            send_button:{
                display:"inline-block",
                fontSize: "14px",
                cursor: "pointer",
                border: "1px solid #cccccc",
                borderRadius: "4px",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                padding: "6px 10px",
                verticalAlign:'middle',
                backgroundColor: "#fff"
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
				    overflow: "hidden",
				    borderRight: "1px solid #ccc",
				    boxSizing: "border-box",
                    padding:"0px 0px 75px 0px"
    			},
    			textarea : {
    				border:"none",
				    overflow: "auto",
				    wordWrap:"break-word",  
				    resize:"none",
				    width:"100%",
				    height:"100%",
				    outline:"none",
				    boxSizing:"border-box",
				    fontSize:"16px",
				    WebkitAppearance:"none",
				    WebkitRtlOrdering:"logical",
				    WebkitUserSelect: "text",
                    padding:"20px 15px 0px 15px"
    			}
    		},
    		md_preview:{
    			verticalAlign:"top",
    			display:"inline-block",
    			width:"50%",
    			height:"100%",
			    overflow: "auto",
			    backgroundColor: "#f6f6f6",
			    borderLeft: "1px solid #ccc",
			    boxSizing: "border-box",
			    padding: "20px 15px 20px 15px",
			    fontSize: "16px",
			    wordWrap: "break-word"
    		}

    	}
        return  	<form action="#" style={style.react_markdown}>
        				<div style={style.send_title}>
        					<input type="text"  style={style.title_input}  placeholder="文档标题"/>
        				</div>
                        <Md_toolbar style={style.md_toolbar} _handleClicked={this._handleClicked}/>
        				<div style={style.main}>
        					< Md_textarea style={style.md_textarea} value={this.state.value} onChanged = {this._handleChanged}  onScrolled = {this._handleScrolled}/> 
   				    		<div style={style.md_preview}  className="preview_style" dangerouslySetInnerHTML={this.rawMarkup()} />
        				</div>
                        <div style={style.send_bottom}>
                            <button type="submit" style={style.send_button} className="send_button">保存</button>
                        </div>
        			</form>
                    
        	
    }
}




ReactDOM.render( < React_markdown / > , document.querySelector("#react_markdown"));

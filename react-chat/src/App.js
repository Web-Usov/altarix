import React, { Component } from 'react';
import Ava from './img/chel.jpg';
import './App.css';
import { db } from './firebase.js';

const HOST_NAME = "Усов Алексей";

class Msgs extends Component{
    constructor(props){
        super();
        this.state = {
            id : props.id,
            name:props.parentName,
            text: props.value,
        };
    }
    render(){
        return this;
    }
}



class App extends Component {
    constructor(){
        super();
        this.state = {
            MSGS : [],
            HOST_USER: HOST_NAME,
            isLogin : false
        };
        this.setMsg = this.setMsg.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount(){
        const msgsRef = db.ref('messages');
        msgsRef.on('value',(snapshot) => {
            const msgsFromServ = snapshot.val();
            if(msgsFromServ!==null){
                let buf = [];
                Object.keys(msgsFromServ).map(function (key) {
                    const msg = new Msgs({
                        id:msgsFromServ[key].id,
                        value:msgsFromServ[key].text,
                        parentName:msgsFromServ[key].name,
                    });
                    buf.push(msg);
                });
                this.setState({MSGS:buf});
            }else{
                this.setState({MSGS:null});
            }
        });

    }
    login(name){
        this.setState({
            HOST_USER:name,
            isLogin:true
        })

    }
    setMsg(msg){
        db.ref('messages/'+msg.state.id).set(msg.state);
    }
    render() {
        if(!this.state.isLogin){
            return (
                <div className="chat-login">
                    <ChatLogin login={this.login}/>
                </div>
            )
        }else{
            return (
                <div className="chat">
                    <ChatHeader hostName={this.state.HOST_USER}/>
                    <ChatOutput msgs={this.state.MSGS} hostName={this.state.HOST_USER}/>
                    <ChatFooter submitMsg={this.setMsg} hostName={this.state.HOST_USER}/>
                </div>
            )

        }
    }
}
class ChatLogin extends  Component{
    login(e){
        e.preventDefault();
        const text = this.refs.input_login.value;
        this.props.login(text);
        this.refs.input_login.value = "";
    }
    render(){
        return(
            <div className="login">
                <form onSubmit={this.login.bind(this)}>
                    <input type="text" ref="input_login" id="login-input" className="login-input" placeholder="Input name..."/>
                    <button className="login-btn" id="login-btn" type="submit" >Send</button>
                </form>
            </div>
        )
    }
}
class ChatHeader extends Component{
    render(){
        return(
            <header className="chat-header">
                <h3 className="chat-header-title">{this.props.hostName}</h3>
            </header>
        )
    }
}
class ChatOutput extends Component{
    componentDidUpdate(){
        const chat_msg_list = document.getElementById('chat-msg-list');
        if(chat_msg_list!==null){
            chat_msg_list.scrollTop = chat_msg_list.scrollHeight;
        }
    }
    componentWillUpdate(){
        const chat_msg_list = document.getElementById('chat-msg-list');
        if(chat_msg_list!==null){
            chat_msg_list.scrollTop = chat_msg_list.scrollHeight;
        }

    }
    render(){
        const hostName = this.props.hostName;
        if(this.props.msgs!==null){
            return(
                <section className="chat-output">
                    <div className="chat-msg-list" id="chat-msg-list">
                        {
                            this.props.msgs.map(function (msg){
                                return <MsgV data={msg} hostName={hostName} key={msg.state.id}/>
                            })
                        }
                    </div>
                </section>
            )
        }else{
            return(
                <section className="chat-output">
                    <h1 style={{color:'orange',textAlign:'center',display:'block'}}>Сообщений нет :(</h1>
                </section>

            )
        }
    }
}
const MsgV = function (props) {
    let position = "left";
    if(props.data.state.name===props.hostName){
        position = "right";
    }
    return(
        <div className={"chat-msg-"+position}  id={props.data.state.id}>
            <div className="chat-msg-logo">
                <img src={Ava} alt=""/>
                <span className="chat-msg-title">{props.data.state.name}</span>
            </div>
            <div className="chat-msg">

                <div>
                    {props.data.state.text}
                </div>
            </div>
        </div>
    )
};
class ChatFooter extends  Component{
    sendMsg(e){
        e.preventDefault();
        const text = this.refs.input_msg.value;
        this.refs.input_msg.value = "";
        const msg = new Msgs({
            id:Date.now(),
            parentName:this.props.hostName,
            value:text
        });
        this.props.submitMsg(msg);
    }
    render(){
        return(
            <footer className="chat-footer">
                <form className="chat-form" onSubmit={this.sendMsg.bind(this)}>
                    <div className="chat-input-box">
                        <input type="text" ref="input_msg" name="chat-input" id="chat-input" className="chat-input" placeholder="Input message..."/>
                    </div>
                    <div className="chat-btn-box">
                        <button className="chat-btn" id="chat-btn" type="submit" >Send</button>
                    </div>
                </form>
            </footer>
        )
    }
}

export default App;
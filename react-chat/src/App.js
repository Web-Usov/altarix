import React, { Component } from 'react';
import Ava from './img/chel.jpg';
import './App.css';

import { db } from './firebase.js';

const HOST_NAME = "Ivan";

// class User extends Component{
//     constructor(_id,_name){
//         super();
//         this.state = {
//
//             id : _id,
//             name : _name,
//             msgs:[],
//             ava : Ava,
//         };
//     }
//     sendMsg(text){
//         let msg ={
//             id : Date.now(),
//             value: text
//         };
//         msg.parentId = this.state.id;
//         let arr = this.state.msgs;
//         arr.push(msg);
//         this.setState({msgs:arr});
//     }
//     render(){
//         return this;
//     }
// }
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
            //USERS : [],
            MSGS : [],
            HOST_USER: HOST_NAME
        };
        this.setMsg = this.setMsg.bind(this);
        //this.addUser = this.addUser.bind(this);
    }
    componentDidMount(){
        const msgsRef = db.ref('messages');
        let buf = [];
        msgsRef.on('value',(snapshot) => {
            const msgsFromServ = snapshot.val();
            console.log(msgsFromServ);
            Object.keys(msgsFromServ).map(function (key) {
                const msg = new Msgs({
                    id:msgsFromServ[key].id,
                    value:msgsFromServ[key].text,
                    parentName:msgsFromServ[key].name,
                });
                buf.push(msg);
            });
            this.setState({MSGS:buf});
            console.log(this.state.MSGS);
        });

    }
    // addUser(user){
    //     let buf = this.state.USERS;
    //     buf.push(user);
    //     this.setState({USERS:buf});
    //     if(user.state.id===HOST_NAME){
    //         this.setState({HOST_USER:user})
    //     }
    // }

    setMsg(msg){
        // const parentUser = this.state.USERS.find(x=>x.state.id===msg.state.parentId);
        // parentUser.sendMsg(msg);
        //const buf = this.state.MSGS;
        //buf.push(msg);
        //this.setState({MSGS:buf});
        db.ref('messages/'+msg.state.id).set(msg.state);
    }
    render() {
        return (
            <div className="chat">
                <ChatHeader hostName={this.state.HOST_USER}/>
                <ChatOutput msgs={this.state.MSGS} hostName={this.state.HOST_USER}/>
                <ChatFooter submitMsg={this.setMsg} hostName={this.state.HOST_USER}/>
            </div>
        );
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
    render(){
        //const users = this.props.users;
        const msgs = this.props.msgs;
        const hostName = this.props.hostName;
        return(
            <section className="chat-output">
                <div className="chat-msg-list">
                    {
                        msgs.map(function (msg){
                            return  <MsgV data={msg} hostName={hostName}/>
                            }
                        )
                    }
                </div>
            </section>
        )
    }
}
const MsgV = function (props) {
    let position = "left";
    if(props.data.state.name===props.hostName){
        position = "right";
    }
    return(
        <div className={"chat-msg-"+position} id={props.data.state.id}>
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
        const text = this.refs.input.value;
        this.refs.input.value = "";
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
                        <input type="text" ref="input" name="chat-input" id="chat-input" className="chat-input" placeholder="Input message..."/>
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

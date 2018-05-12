import React, { Component } from 'react';
import Ava from './img/chel.jpg';
import './App.css';

const HOSTID = Date.now();

class User extends Component{
    constructor(_id,_name){
        super();
        this.state = {

            id : _id,
            name : _name,
            msgs:[],
            ava : Ava,
        };
    }
    sendMsg(text){
        let msg ={
            id : Date.now(),
            value: text
        };
        msg.parentId = this.state.id;
        let arr = this.state.msgs;
        arr.push(msg);
        this.setState({msgs:arr});
    }
    render(){
        return this;
    }
}
class Msgs extends Component{
    constructor(props){
        super();
        this.state = {
            id : props.id,
            parentId:props.parentId,
            value: props.value
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
            USERS : [],
            MSGS : [],
            HOST_USER: null
        };
        this.setMsg = this.setMsg.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    componentWillMount(){
        this.addUser(new User(HOSTID,"Ivan"));
        this.addUser(new User(123,"Oleg"));

        this.setMsg(new Msgs({
            id:Date.now(),
            parentId:HOSTID,
            value:"Hello, world!"
        }));

        this.setMsg(new Msgs({
            id:Date.now(),
            parentId:123,
            value:"WTF?!"
        }));
    }
    addUser(user){
        let buf = this.state.USERS;
        buf.push(user);
        this.setState({USERS:buf});
        if(user.state.id===HOSTID){
            this.setState({HOST_USER:user})
        }
    }

    setMsg(msg){
        const parentUser = this.state.USERS.find(x=>x.state.id===msg.state.parentId);
        parentUser.sendMsg(msg);
        const buf = this.state.MSGS;
        buf.push(msg);
        this.setState({MSGS:buf});
    }
    render() {
        return (
            <div className="chat">
                <ChatHeader userName={this.state.HOST_USER.state.name}/>
                <ChatOutput users={this.state.USERS} msgs={this.state.MSGS} hostUserId={this.state.HOST_USER.state.id}/>
                <ChatFooter submitMsg={this.setMsg}/>
            </div>
        );
    }
}
class ChatHeader extends Component{
    render(){
        return(
            <header className="chat-header">
                <h3 className="chat-header-title">{this.props.userName}</h3>
            </header>
        )
    }
}
class ChatOutput extends Component{
    constructor(props){
        super(props);
        this.state = {
            msgs : this.props.msgs,
            users : this.props.users,
        };
    }
    render(){
        const users = this.state.users;
        const hostId = this.props.hostUserId;
        return(
            <section className="chat-output">
                <div className="chat-msg-list">
                    {
                        this.state.msgs.map(function (msg){
                            const parentUser = users.find(x=>x.state.id===msg.state.parentId);
                            return  <MsgV data={msg} user={parentUser} hostUserId={hostId}/>
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
    if(props.data.state.parentId===props.hostUserId){
        position = "right";
    }
    return(
        <div className={"chat-msg-"+position} id={props.data.state.id}>
            <div className="chat-msg-logo">
                <img src={props.user.state.ava} alt=""/>
                <span className="chat-msg-title">{props.user.state.name}</span>
            </div>
            <div className="chat-msg">

                <div>
                    {props.data.state.value}
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
            parentId:HOSTID,
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

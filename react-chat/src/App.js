import React, { Component } from 'react';
import Ava from './img/chel.jpg';
import './App.css';

const HOSTID = 326;

class User extends Component{
    constructor(_id,_name){
        super();
        this.state = {

            id : _id,
            name : _name,
            msgs:[],
            ava : Ava,
        };
        //User.list.push(this);
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
        //Msgs.list.push(new Msgs(msg));
    }
    render(){
        return this;
    }
    get lastMsg() {
        return this.state.msgs[this.state.msgs.length-1];
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
        //Msgs.list.push(this);
    }
    render(){
        return this;
    }
}
// User.list = [];
// Msgs.list = [];
// new User(HOSTID,"Ivan");
// new User(123,"Oleg");
//
// User.list.find(x=>x.state.id===HOSTID).sendMsg("Hello, world! ");
// User.list.find(x=>x.state.id===123).sendMsg("WTF?!");




class App extends Component {
    constructor(){
        super();
        this.state = {
            USERS : [],
            MSGS : []
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
    }

    setMsg(msg){
        let users = this.state.USERS;
        let user = users.find(x=>x.state.id===HOSTID);
        user.sendMsg(msg);
        let buf = this.state.MSGS;
        buf.push(msg);
        this.setState({MSGS:buf});
    }
    render() {
        console.log("render()");
        return (
            <div className="chat">
                <ChatHeader users={this.state.USERS}/>
                <ChatOutput users={this.state.USERS} msgs={this.state.MSGS}/>
                <ChatFooter submitMsg={this.setMsg}/>
            </div>
        );
    }
}
class ChatHeader extends Component{
    render(){
        const hostName = this.props.users.find(x=>x.state.id===HOSTID).state.name;
        return(
            <header className="chat-header">
                <h3 className="chat-header-title">{hostName}</h3>
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
        return(
            <section className="chat-output">
                <div className="chat-msg-list">
                    {
                        this.state.msgs.map(msg => (

                            <MsgV data={msg} user={this.state.users.find(x=>x.state.id===msg.state.parentId)}/>
                        ))
                    }
                </div>
            </section>
        )
    }
}
const MsgV = function (props) {
    let position = "left";
    if(props.data.state.parentId===HOSTID){
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
        })
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

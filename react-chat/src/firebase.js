import firebase from 'firebase';
const ORIGIN = true;
let config;
if(ORIGIN){
    config = {
        apiKey: "AIzaSyAqiGbBbiz9l0XKIQeTw1qlVonK8rmS3hU",
        authDomain: "altarixchat.firebaseapp.com",
        databaseURL: "https://altarixchat.firebaseio.com",
        projectId: "altarixchat",
        storageBucket: "altarixchat.appspot.com",
        messagingSenderId: "707928431356",
    };
}else{
     config = {
        apiKey: "AIzaSyCKNXvuW9uiIzwzsUxPJR8WtgkInXRY2qE",
        authDomain: "web-usov-chat.firebaseapp.com",
        databaseURL: "https://web-usov-chat.firebaseio.com",
        projectId: "web-usov-chat",
        storageBucket: "",
        messagingSenderId: "636983570591"
    };
}

firebase.initializeApp(config);

const db = firebase.database();

export {db}  ;
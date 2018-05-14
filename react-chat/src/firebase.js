import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCKNXvuW9uiIzwzsUxPJR8WtgkInXRY2qE",
    authDomain: "web-usov-chat.firebaseapp.com",
    databaseURL: "https://web-usov-chat.firebaseio.com",
    projectId: "web-usov-chat",
    storageBucket: "",
    messagingSenderId: "636983570591"
};

firebase.initializeApp(config);

const db = firebase.database();

export { db };
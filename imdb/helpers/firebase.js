const firebase = require('firebase');

const config = firebaseConfig = {
    apiKey: "AIzaSyC6cGQE5L0aRv4BVkBCNKIZv2kN1aLVkOo",
    authDomain: "imdb-19264.firebaseapp.com",
    databaseURL: "https://imdb-19264.firebaseio.com/",
    projectId: "imdb-19264",
    storageBucket: "imdb-19264.appspot.com",
    messagingSenderId: "369137277547",
    appId: "1:369137277547:web:dca01cc2084633b9932f2e"
};

firebase.initializeApp(config);

const database = firebase.database();

exports.updateDb = (username, password, fav) => {
    return new Promise((resolve, reject) => {
        database
            .ref('users/' + username)
            .set({
                password,
                fav,
            })
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCC6BDMwt--ro-qvFFQphToTDXC-jCIW50",
    authDomain: "video-jeu.firebaseapp.com",
    projectId: "video-jeu",
    storageBucket: "video-jeu.appspot.com",
    messagingSenderId: "810896795873",
    appId: "1:810896795873:web:2b88d97e49291b95fb6fa0"
  };

export default class Fire {
    constructor(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("articles");
    }

    getArticles(callback) {
        let ref = this.ref.orderBy("date_creation");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let articles = [];
            snapshot.forEach(doc => {
                articles.push({ id: doc.id, ...doc.data() });
            });
            callback(articles.reverse());
        }, function(error) {
            callback(error);
        });
    }

    addArticle(article) {
        this.ref.add(article);
    }

    deleteArticle(article) {
        this.ref.doc(article.id).delete();
    }

    updateArticle(article) {
        this.ref.doc(article.id).update(article);
    }
}
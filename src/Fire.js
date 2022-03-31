import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCGOG1Er054mWiDHpvdu1MPrCPGdlfCdmQ",
    authDomain: "react-article-da8d6.firebaseapp.com",
    projectId: "react-article-da8d6",
    storageBucket: "react-article-da8d6.appspot.com",
    messagingSenderId: "938706405579",
    appId: "1:938706405579:web:7c97f007252f947165b34e"
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
        let ref = this.ref.orderBy("createdAt");
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
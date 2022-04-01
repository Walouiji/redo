import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGOG1Er054mWiDHpvdu1MPrCPGdlfCdmQ",
    authDomain: "react-article-da8d6.firebaseapp.com",
    projectId: "react-article-da8d6",
    storageBucket: "react-article-da8d6.appspot.com",
    messagingSenderId: "938706405579",
    appId: "1:938706405579:web:7c97f007252f947165b34e"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default class Fire {
    getArticles(callback) {
        const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
            let articles = [];
            snapshot.forEach(doc => {
                articles.push({ id: doc.id, ...doc.data() });
            });
            callback(articles);
        });
    }

    addArticle(article) {
        addDoc(collection(db, 'articles'), article);
    }

    updateArticle(article) {
        updateDoc(doc(db, 'articles', article.id), article);
    }

    deleteArticle(article) {
        deleteDoc(doc(db, 'articles', article.id))
    }
}
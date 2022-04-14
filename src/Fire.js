import {
    initializeApp
} from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

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
const auth = getAuth(app);

export default class Fire {    

    //CRUD articles
    getArticles(callback) {
        const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
            let articles = [];
            snapshot.forEach(doc => {
                articles.push({
                    id: doc.id,
                    ...doc.data()
                });
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

    //Authentification

    user = getAuth().currentUser;

    register = async (registerEmail, registerPassword) => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.error(error.message);
        }
    }

    login = async (loginEmail, loginPassword) => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }
}
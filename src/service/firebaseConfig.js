import Phaser from "phaser";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInAnonymously,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    const firebaseConfig = {
      apiKey: "AIzaSyAnw11HWqnPD7rkmryioMbZ3mvUMbCLj-Q",
      authDomain: "heroshowdown-d7c98.firebaseapp.com",
      projectId: "heroshowdown-d7c98",
      storageBucket: "heroshowdown-d7c98.firebasestorage.app",
      messagingSenderId: "53926859400",
      appId: "1:53926859400:web:93f34c4165dfbfc2f7853d"
    };

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);

    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();

    this.onLoggedInCallback = () => {};

    this.authStateChangedUnsubscribe = onAuthStateChanged(this.auth, (user) => {
      if (user && this.onLoggedInCallback) {
        this.onLoggedInCallback();
      }
    });
  }

  destroy() {
    this.authStateChangedUnsubscribe();
    super.destroy();
  }

  onLoggedIn(callback) {
    this.onLoggedInCallback = callback;
  }

  // auth services
  async signInWithGoogle() {
    const sign = await signInWithPopup(this.auth, this.googleProvider);
    return sign.user;
  }

  async signInWithGithub() {
    const sign = await signInWithPopup(this.auth, this.githubProvider);
    return sign.user;
  }

  async signInAnonymously() {
    const sign = await signInAnonymously(this.auth);
    return sign.user;
  }

  getUser() {
    return this.auth.currentUser;
  }

  // firestore services
  async addScore(user_id, user_name, points, remaining_time) {
    try {
        const scoresCollection = collection(this.db, "scores");
        const q = query(scoresCollection, where("user_id", "==", user_id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const scoreDoc = querySnapshot.docs[0];
            const scoreRef = doc(this.db, "scores", scoreDoc.id);
            await updateDoc(scoreRef, { user_name, points, remaining_time });
        } else {
            await addDoc(scoresCollection, { user_id, user_name, points, remaining_time });
        }
    } catch (e) {
        console.error("Error adding or updating document: ", e);
    }
  }

  async getScores() {
    // return []; 
    // return [{ user_name: "Anonimo", points: 100 }];
    const scoresCollection = collection(this.db, "scores");
    const querySnapshot = await getDocs(scoresCollection);
    // TODO: se puede agregar limit y orderBy
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push(doc.data());
    });
    return scores;
  }

}


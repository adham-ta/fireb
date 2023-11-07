import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQannbbK5Dioc2Qk-PSJsub_90z5mezeo",
  authDomain: "vice-ar.firebaseapp.com",
  projectId: "vice-ar",
  storageBucket: "vice-ar.appspot.com",
  messagingSenderId: "667785819446",
  appId: "1:667785819446:web:c41e0fb5c2b17cf2b16f97",
  measurementId: "G-KHJYCEGNDG"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()

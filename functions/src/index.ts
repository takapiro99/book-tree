import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const userOnCreate = functions.auth.user().onCreate(async(user) => {
	var userDoc = await admin.firestore().collection('users').doc(user.uid).get();
	await userDoc.ref.set({
		screen_name: user.uid,
		display_name: user.displayName,
		created_at: admin.firestore.FieldValue.serverTimestamp(),
	});
});

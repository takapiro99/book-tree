import { Timestamp } from '@firebase/firestore'
import { db } from './firebase'
import { UserInfo } from './types'

export const getUserInfo = async (uid: string): Promise<UserInfo | null> => {
    return db
        .collection('users')
        .where('uid', '==', uid)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.docs.length) {
                console.warn('no corresponding firestore uid found')
                return null
            } else if (querySnapshot.docs.length >= 2) {
                alert(`${querySnapshot.docs.length} records have same uid`)
                return null
            }
            const userInfo = querySnapshot.docs[0].data() as UserInfo
            return userInfo
        })
}

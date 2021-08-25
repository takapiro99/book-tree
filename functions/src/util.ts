import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import crypto = require('crypto')
import validUrl = require('valid-url')

import { Review } from './types'

export const generateToken: () => Promise<string | null> = async () => {
    const N = 16
    const loopNumber = 10 // 無限ループ防止のために10回で区切る
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for (let i = 0; i < loopNumber; i++) {
        const randomArray: number[] = Array.from(crypto.randomFillSync(new Uint8Array(N)))
        const token = randomArray.map((n: number) => S[n % S.length]).join('')

        const querySnapshot = await admin
            .firestore()
            .collection('invitations')
            .where('token', '==', token)
            .get()
        if (querySnapshot.size === 0) {
            return token
        }
    }
    return null
}

// validateに失敗したらHttpErrorを出す
export const validateReview: (review: Review) => void = (review) => {
    if (
        !review.title ||
        !review.content ||
        !review.bookImageURL ||
        !validUrl.isUri(review.bookLink)
    ) {
        throw new functions.https.HttpsError('invalid-argument', '必須の項目を入力してください。')
    }

    if (!validUrl.isUri(review.bookImageURL) || !validUrl.isUri(review.bookLink)) {
        throw new functions.https.HttpsError('invalid-argument', '不正なURLです')
    }
}

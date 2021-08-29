import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import fetch from 'node-fetch';
import crypto = require('crypto')

import { PostReview, RakutenBookItem, RakutenResponse } from './types'

export const generateToken: () => Promise<string | null> = async () => {
    const N = 16
    const loopNumber = 10 // 無限ループ防止のために10回で区切る
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for (let i = 0; i < loopNumber; i++) {
        const randomArray: number[] = Array.from(
            crypto.randomFillSync(new Uint8Array(N))
        )
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
export const validateReview: (review: PostReview) => void = (review) => {
    if (!review.content || !review.reason || !review.isbn) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            '必須の項目を入力してください。'
        )
    }
}

export const fetchBookFromRakutenAPI: (
    isbn: string
) => Promise<RakutenBookItem | null> = async (isbn) => {
    const applicationId = '1009172447759483209'
    const url = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=${applicationId}&isbnjan=${isbn}`
    const res = await fetch(url)
    const data = (await res.json()) as RakutenResponse
    if (data.Items.length === 0) {
        return null
    }
    console.log(data.Items[0])

    return data.Items[0]
}

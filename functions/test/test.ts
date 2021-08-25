import * as admin from 'firebase-admin'
import { describe, it } from 'mocha'
import { assert } from 'chai'

import { Review } from '../src/types'
import { validateReview } from '../src/util'

const reviewMock: Review = {
    userID: undefined,
    specialty: undefined,
    title: 'テストの森',
    content: 'テストテストテストテストテストテストテスト',
    bookImageURL:
        'https://shop.r10s.jp/neowing-r/cabinet/item_img_1158/neobk-2151500.jpg',
    bookLink: 'https://item.rakuten.co.jp/neowing-r/neobk-2151500/',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
}

describe('util', () => {
    describe('validateReview()', () => {
        it('should return true when the Review is correct', () => {
            try {
                validateReview(reviewMock)
            } catch {
                assert.fail('validation error')
            }
        })
    })
})

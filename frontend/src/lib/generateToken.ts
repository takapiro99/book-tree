// 招待コードの認証で使うランダム文字列の生成

import crypto from "crypto"

const generateToken = () => {
    const N = 16
    const token = crypto.randomBytes(N).toString('base64').substring(0, N)
    return token
}

export default generateToken
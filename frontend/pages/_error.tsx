import { useEffect } from 'react'

const Error = () => {
    useEffect(() => {
        console.log('rendered custom error page')
    }, [])
    return (
        <div style={{ textAlign: 'center' }}>
            <p>原因不明のエラーが発生しました。</p>
            <p>ごめんね…</p>
        </div>
    )
}

export default Error

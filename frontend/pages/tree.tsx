import { useEffect, useState } from 'react'
import ThreeTree from '../components/ThreeTree'
import { fetchBooksToShowOnTopPage } from '../lib/api'
import { ReviewJoinedUser } from '../lib/types'

const Tree = () => {
    const [books, setBooks] = useState<ReviewJoinedUser[]>([])
    useEffect(() => {
        const f = async () => {
            const books = await fetchBooksToShowOnTopPage()
            setBooks(books)
        }
        f()
    }, [])
    if (books.length) {
        return (
            <div style={{ border: '1px solid blue' }}>
                <div style={{ width: '100%', height: '55vh' }}>
                    <ThreeTree books={books} />
                </div>
            </div>
        )
    }

    return <p>loading</p>
}

export default Tree

export interface Profile {
    uid: string
    displayName: string
    profileImage: string
    gratePartList: (string | null)[]
    createdAt: number // timestamp
}

export interface Review {
    uid: string
    specialty: string // ～が凄い人
    bookImageURL: string
    bookLink: string
    title: string
    content: string
    createdAt: number // timestamp
    // 本の内容など
}

export const getProfile = async (uid: string): Promise<Profile | null> => {
    const mock = {
        uid: 'cao1Z4k8qChB0gqzYiHJh0IaICf1', // takapiro
        displayName: 'takapiro',
        profileImage:
            'https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_normal.jpg',
        gratePartList: [null, null, null],
        createdAt: 1
    }
    return mock
}

export const getReviews = async (uid: string): Promise<Review[]> => {
    return [
        {
            uid: 'cao1Z4k8qChB0gqzYiHJh0IaICf1',
            specialty: '身長',
            bookImageURL: 'https://shop.r10s.jp/book/cabinet/1040/9784097251040.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/11182318/',
            title: 'いい本',
            content: 'めっちゃいい本',
            createdAt: 123 // timestamp
        },
        {
            uid: 'cao1Z4k8qChB0gqzYiHJh0IaICf1',
            specialty: '身長',
            bookImageURL: 'https://shop.r10s.jp/book/cabinet/1040/9784097251040.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/11182318/',
            title: 'いい本',
            content: 'めっちゃいい本',
            createdAt: 123 // timestamp
        }
    ]
}

// そのうち各機能ごとにファイル作ったほうがよさそう

const getBooks = (userID: string, type: 'icon' | 'bookMark' | 'bookOnly') => {
    const mockData = [
        {
            bookImageURL:
                'https://tshop.r10s.jp/book/cabinet/9420/4534530129420.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/16674317/',
            displayType: type,
            userID: userID,
            userIconImage:
                'http://flat-icon-design.com/f/f_object_156/s256_f_object_156_0bg.png'
        },
        {
            bookImageURL:
                'https://shop.r10s.jp/book/cabinet/1040/9784097251040.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/16646409/',
            displayType: type,
            userID: userID,
            userIconImage:
                'http://flat-icon-design.com/f/f_object_160/s256_f_object_160_0bg.png'
        },
        {
            bookImageURL:
                'https://tshop.r10s.jp/book/cabinet/0787/9780312510787.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/11182318/',
            displayType: type,
            userID: userID,
            userIconImage:
                'http://flat-icon-design.com/f/f_object_156/s256_f_object_156_0bg.png'
        },
        {
            bookImageURL:
                'https://tshop.r10s.jp/book/cabinet/9420/4534530129420.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/16674317/',
            displayType: type,
            userID: userID,
            userIconImage:
                'http://flat-icon-design.com/f/f_object_160/s256_f_object_160_0bg.png'
        },
        {
            bookImageURL:
                'https://shop.r10s.jp/book/cabinet/1040/9784097251040.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/16646409/',
            displayType: type,
            userID: userID,
            userIconImage:
                'http://flat-icon-design.com/f/f_object_156/s256_f_object_156_0bg.png'
        },
        {
            bookImageURL:
                'https://tshop.r10s.jp/book/cabinet/0787/9780312510787.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/11182318/',
            displayType: type,
            userID: userID,
            userIconImage:
                'http://flat-icon-design.com/f/f_object_156/s256_f_object_156_0bg.png'
        }
    ]
    return mockData
}

export { getBooks }

const hoge = 'hoge'
export default hoge

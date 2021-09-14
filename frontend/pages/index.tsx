import LittleTree from '../components/LittleTree'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'

import { ReviewJoinedUser } from '../lib/types'
import { fetchBooksToShowOnTopPage } from '../lib/api'
/* eslint @next/next/no-img-element:0 */
import Head from 'next/head'

export default function Home() {
    // 列ごとに状態を持つ
    const [booksRow1, setBooksRow1] = useState<ReviewJoinedUser[]>([])
    const [booksRow2, setBooksRow2] = useState<ReviewJoinedUser[]>([])
    const [booksRow3, setBooksRow3] = useState<ReviewJoinedUser[]>([])
    useEffect(() => {
        const f = async () => {
            const books = await fetchBooksToShowOnTopPage()
            setBooksRow1(books.slice(0, 3))
            setBooksRow2(books.slice(3, 6))
            setBooksRow3(books.slice(6, 9))
        }
        f()
    }, [])

    return (
        <div>
            <Head>
                <title>TopPage</title>
            </Head>
            <div className="container">
                <div className={styles.topContent}>
                    <div className={styles.topContent__staffTree}>
                        <img
                            src="/images/home/booktree.png"
                            alt="スタッフのブックツリー"
                            style={{
                                width: '100%',
                                objectFit: 'contain',
                                display: 'inline-block',
                                height: '100%'
                            }}
                        />
                    </div>
                    <div className={styles.topContent__introduce}>
                        <h1>周りにいるすごい人、</h1>
                        <h1>どんな本読んでいるんだろう？</h1>
                        あなたのすごいと思う人が読んでる本を集めてBOOKTREEをつくろう！
                        新しくやってみたいこと、ずっとやりたいと思っていたこと、知らなかったことに出会う機会
                        直接人と出会うことが難しい時代 新しい形でつながり学ぼう！
                    </div>
                </div>
                <div style={{ height: '30px' }} />
                <h2 className={styles.topContentSteps__title}>どんなことができる？</h2>
                <div className={styles.topContent__steps}>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>
                            <img src="/images/home/top_1.png" alt="" />
                        </div>
                        {/* TODO: booktreeをつくろう、は分かりにくそう */}
                        <div className={styles.topContentSteps__explain}>BOOK TREEをつくろう</div>
                        <div className={styles.topContentSteps__explainS}>
                            無料でアカウントを作成して、BOOKTREEをつくろう
                        </div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>
                            <img src="/images/home/top_2.png" alt="" />
                        </div>
                        <div className={styles.topContentSteps__explain}>
                            すごい人にお願いして・・・
                        </div>
                        <div className={styles.topContentSteps__explainS}>
                            あなたの周りのすごいひとにおすすめの本を教えてもらおう
                        </div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>
                            <img src="/images/home/top_3.png" alt="" />
                        </div>
                        <div className={styles.topContentSteps__explain}>
                            たくさん本を実らせよう！
                        </div>
                        <div className={styles.topContentSteps__explainS}>
                            おすすめの本を教えてもらたら、その本があなたのツリーに実るよ。自分がお願いしてないすごいひとのレビューも実っちゃうかも？！
                        </div>
                    </div>
                </div>
            <p className={styles.BOOKTREEBtn}>BOOKTREEを作成する</p>

            </div>
            <div className={styles.greenbar} />
            <div className="container">
                <div className={styles.BookTreeForest}>
                    <h1 className={styles.BookTreeForest__title}>what&apos;s new?</h1>
                    {/* <img className={styles.shiori} src="/images/home/shiori.png" alt="shiori" /> */}
                    <div className={styles.forestWrapper}>
                        <div className={styles.littletreeWrapper}>
                            {booksRow1.map((book, index) => {
                                return <LittleTree review={book} key={index} />
                            })}
                        </div>
                        <div className={styles.littletreeWrapper2}>
                            {booksRow2.map((book, index) => {
                                return <LittleTree review={book} key={index} />
                            })}
                        </div>
                        <div className={styles.littletreeWrapper3}>
                            {booksRow3.map((book, index) => {
                                return <LittleTree review={book} key={index} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>TODO: ここにbooktreeを作るボタンほしくね？</p>
            </div>
            <div className={styles.greenbar}> </div>
        </div>
    )
}

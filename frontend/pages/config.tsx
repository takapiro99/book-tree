import Head from 'next/head'
import styles from '../styles/Setting.module.scss'

import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import { updateGratePartList } from '../lib/api'
import { successToast } from '../lib/toasts'
import { createTitle } from '../lib/util'
import GuardedRoute from '../components/auth/GuardedRoute'

/* eslint @next/next/no-img-element:0 */

const swap = <T,>(arr: T[], i1: number, i2: number) => {
    const tmp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = tmp
}

// nullや空文字を右寄せ
const orderingGratePartList = (gratePartList: (string | null | undefined)[] | undefined) => {
    if (!gratePartList || gratePartList.length !== 3) {
        return null
    }

    if (gratePartList[2] && !gratePartList[1]) swap(gratePartList, 2, 1)
    if (gratePartList[1] && !gratePartList[0]) swap(gratePartList, 0, 1)
    if (gratePartList[2] && !gratePartList[1]) swap(gratePartList, 2, 1)
}

const Setting = () => {
    //const [books, setBooks] = useState<BooksProps[]>([])
    const { userInfo, currentUser, isFetchingFirestoreUser } = useContext(AuthContext)
    const [gratePartList, setGratePartList] = useState<(string | null | undefined)[]>([
        null,
        null,
        null
    ])

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const name = event.target.name

        switch (name) {
            case 'threeWords_0': {
                const gcopy = gratePartList.slice()
                gcopy[0] = value
                setGratePartList(gcopy)
                break
            }
            case 'threeWords_1': {
                const gcopy = gratePartList.slice()
                gcopy[1] = value
                setGratePartList(gcopy)
                break
            }
            case 'threeWords_2': {
                const gcopy = gratePartList.slice()
                gcopy[2] = value
                setGratePartList(gcopy)
                break
            }
        }
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        updateGratePartListFunc()
        event.preventDefault()
    }

    const updateGratePartListFunc = async () => {
        if (currentUser?.uid) {
            const isOk = await updateGratePartList(currentUser?.uid, gratePartList)
            if (isOk) {
                successToast('保存に成功しました！')
            }
        }
    }

    useEffect(() => {
        if (!isFetchingFirestoreUser && userInfo) {
            orderingGratePartList(userInfo.gratePartList)
            setGratePartList(userInfo.gratePartList)
        }
    }, [isFetchingFirestoreUser])

    return (
        <GuardedRoute waitFirestoreLoading={true}>
            <div className={styles.reviewformWrapper}>
                <Head>{createTitle('setting')}</Head>
                <div className="wrapper">
                    <form className="reviewform" onSubmit={handleSubmit}>
                        <div className={`${styles.reviewformName} ${styles.blockbtwMd}`}>
                            <div className={styles.reviewformName__block}>
                                <div className={styles.reviewformName__namewrapper}>
                                    <div className={styles.reviewformName__name}>
                                        {userInfo?.displayName}さん
                                    </div>
                                </div>
                                <img
                                    className={styles.reviewformName__icon}
                                    src={userInfo?.profileImage}
                                    alt=""
                                ></img>
                            </div>
                        </div>
                        <div className={styles.blockbtwMd}>
                            <div className={styles.reviewform3keywords}>
                                <h2>3つのキーワード</h2>
                                <div className={styles.reviewform3keywords__example}>
                                    例：北大2年 + カフェが好き + 漫画が好き
                                </div>
                                <div className={styles.reviewform3keywords__list}>
                                    <input
                                        className={styles.reviewform3keywords__3box}
                                        name="threeWords_0"
                                        value={gratePartList[0] || ''}
                                        onChange={handleChangeInput}
                                    />{' '}
                                    <span className={styles.reviewform__plus}>
                                        <i className="fas fa-plus"></i>{' '}
                                    </span>
                                    <input
                                        className={styles.reviewform3keywords__3box}
                                        name="threeWords_1"
                                        value={gratePartList[1] || ''}
                                        onChange={handleChangeInput}
                                    />{' '}
                                    <span className={styles.reviewform__plus}>
                                        <i className="fas fa-plus"></i>
                                    </span>
                                    <input
                                        className={styles.reviewform3keywords__3box}
                                        name="threeWords_2"
                                        value={gratePartList[2] || ''}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${styles.reviewformBookselect} ${styles.blockbtwMd}`}
                        ></div>

                        <div className={styles.reviewformSubmit}>
                            <button className={styles.submitButton}>決定</button>
                        </div>
                    </form>
                </div>
            </div>
        </GuardedRoute>
    )
}

export default Setting

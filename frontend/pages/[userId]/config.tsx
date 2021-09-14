import Head from 'next/head'
import styles from '../../styles/Setting.module.scss'

import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../lib/AuthProvider'

const swap = (arr: any[], i1: number, i2: number) => {
    const tmp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = tmp
}

// nullを右寄せ
const orderingGratePartList = (gradePartList: (string | null | undefined)[] | undefined) => {
    if (!gradePartList || gradePartList.length !== 3) {
        return null
    }

    if (gradePartList[2] && !gradePartList[1]) swap(gradePartList, 2, 1)
    if (gradePartList[1] && !gradePartList[0]) swap(gradePartList, 0, 1)
    if (gradePartList[2] && !gradePartList[1]) swap(gradePartList, 2, 1)
}

const Setting = () => {
    //const [books, setBooks] = useState<BooksProps[]>([])
    const context = useContext(AuthContext)
    const [gradePartList, setGradePartList] = useState<(string | null | undefined)[]>([
        null,
        null,
        null
    ])

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const name = event.target.name

        switch (name) {
            case 'threeWords_0': {
                const gcopy = gradePartList.slice()
                gcopy[0] = value
                setGradePartList(gcopy)
                break
            }
            case 'threeWords_1': {
                const gcopy = gradePartList.slice()
                gcopy[1] = value
                setGradePartList(gcopy)
                break
            }
            case 'threeWords_2': {
                const gcopy = gradePartList.slice()
                gcopy[2] = value
                setGradePartList(gcopy)
                break
            }
        }
    }

    useEffect(() => {
        if (!context.isFetchingFirestoreUser && userInfo) {
            orderingGratePartList(userInfo.gratePartList)
            console.log(userInfo.gratePartList)
            setGradePartList(userInfo.gratePartList)
        }
    }, [context.isFetchingFirestoreUser])

    if (context.isFetchingFirestoreUser) {
        return <h1>Loading...</h1>
    }

    const userInfo = context.userInfo
    if (!userInfo) {
        return null
    }

    return (
        <div className={styles.reviewformWrapper}>
            <Head>
                <title>Setting Page</title>
            </Head>
            <div className="wrapper">
                <form className="reviewform">
                    <div className={`${styles.reviewformName} ${styles.blockbtwMd}`}>
                        <div className={styles.reviewformName__block}>
                            <div className={styles.reviewformName__namewrapper}>
                                <div className={styles.reviewformName__name}>
                                    {userInfo.displayName}さん
                                </div>
                            </div>
                            <img
                                className={styles.reviewformName__icon}
                                src={userInfo.profileImage}
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
                                    value={gradePartList[0] || ''}
                                    onChange={handleChangeInput}
                                />{' '}
                                <span className={styles.reviewform__plus}>
                                    <i className="fas fa-plus"></i>{' '}
                                </span>
                                <input
                                    className={styles.reviewform3keywords__3box}
                                    name="threeWords_1"
                                    value={gradePartList[1] || ''}
                                    onChange={handleChangeInput}
                                />{' '}
                                <span className={styles.reviewform__plus}>
                                    <i className="fas fa-plus"></i>
                                </span>
                                <input
                                    className={styles.reviewform3keywords__3box}
                                    name="threeWords_2"
                                    value={gradePartList[2] || ''}
                                    onChange={handleChangeInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.reviewformBookselect} ${styles.blockbtwMd}`}></div>

                    <div className={styles.reviewformSubmit}>
                        <button className={styles.submitButton}>決定</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Setting

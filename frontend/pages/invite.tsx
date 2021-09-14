import styles from '../styles/invite.module.scss'
import { useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { createInvitationCode } from '../lib/api'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import { errorToast } from '../lib/toasts'

/* eslint @next/next/no-img-element:0 */

// TODO: check if signed in

const Invite = () => {
    //const [addLink,SetAddLink] = useState<LinkInfo>()
    const [loadingInvitationLink, setLoadingInvitationLink] = useState<boolean>(false)
    const [inviteLink, setInviteLink] = useState<string>('')
    const [copyStatus, setCopyStatus] = useState<string>('')
    const { register, handleSubmit } = useForm()

    const inputRef = useRef<HTMLInputElement>(null)
    const handleCopy = (e: any) => {
        inputRef?.current?.select()
        document.execCommand('copy')
        e.target.focus()
        setCopyStatus('Copied!')
        setTimeout(() => setCopyStatus(''), 1500)
    }

    const onSubmit = (data: any) => {
        console.log(data)
        makeLink(data.reason)
    }

    const makeLink = (reason: string) => {
        setLoadingInvitationLink(true)
        createInvitationCode(reason)
            .then((res) => {
                if (res) {
                    setInviteLink(res)
                    setLoadingInvitationLink(false)
                    return
                }
                errorToast("couldn't generate invite link due to unknown error")
                setLoadingInvitationLink(false)
            })
            .catch((err) => {
                errorToast(err)
                setLoadingInvitationLink(false)
            })
        // SetAddLink(reason)
        //ここで入力された”理由”を元にURL作成
        //作成されたURLをaddLinkに追加
    }

    return (
        <div className="container">
            <Head>
                <title>CreateLink</title>
            </Head>
            <div>
                <h1 className={styles.createLinkTitle}>お願いリンクを作る</h1>
                <div className={styles.createLinkBlock}>
                    <img
                        src="/images/mediumBookTree.png"
                        alt="ブックツリー"
                        className={styles.createLinkBlock__tree}
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.createLinkBlock__input}>
                            <input
                                className={styles.createLinkBlock__reason}
                                placeholder="なにがすごい？"
                                // value={reason}
                                {...register('reason')}
                                // onChange={handleChange}
                            />
                            <span>がすごいひとにお願いする</span>
                        </div>
                        <div className={styles.createButtonBlock}>
                            <button
                                disabled={
                                    (inviteLink.length ? true : false) || loadingInvitationLink
                                }
                                type="submit"
                                className={styles.createButtonBlock__button}
                            >
                                作成
                            </button>
                        </div>
                    </form>
                </div>
                {loadingInvitationLink && <p>loading...</p>}
            </div>
            {inviteLink.length ? (
                <div className={styles.linkcopy}>
                    <p className={styles.link}>URL</p>
                    <input
                        className={styles.url}
                        type="text"
                        name="link "
                        placeholder="作成されたURLが表示されます"
                        readOnly
                        value={inviteLink}
                        ref={inputRef}
                    />
                    <div className={styles.copyicon}>
                        {/* TODO: focusがあたるようにしたい */}
                        <FaCopy size="30" color="#777" onClick={handleCopy} />
                    </div>
                    <p style={{ textAlign: 'center', color: 'green' }}>{copyStatus}</p>
                </div>
            ) : null}
        </div>
    )
}

export default Invite

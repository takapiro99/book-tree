import { baseURL } from '../components/layout'

export const createTitle = (content: string) => {
    return (
        <>
            <title key="title">{createTitleString(content)}</title>
            <meta key="og:title" property="og:title" content={createTitleString(content)} />
            <meta key="twitter:title" name="twitter:title" content={createTitleString(content)} />
        </>
    )
}

export const createImageTags = (path: `/${string}` = '/images/BrandLogo.png') => {
    return (
        <>
            <meta key="og:image" property="og:image" content={`${baseURL}${path}`} />
            <meta key="twitter:image" name="twitter:image" content={`${baseURL}${path}`} />
        </>
    )
}

const createTitleString = (content: string): string => {
    return `${content} | booktree`
}

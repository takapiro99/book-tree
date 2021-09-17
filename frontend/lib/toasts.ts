import { toast, ToastOptions } from 'react-toastify'

const toastOption: ToastOptions = {
    position: 'bottom-right',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
}

export const successToast = (msg: string) => {
    toast.success(msg, toastOption)
}
export const infoToast = (msg: string) => {
    toast.info(msg, toastOption)
}
export const warningToast = (msg: string) => {
    toast.warn(msg, toastOption)
}
export const errorToast = (msg: string) => {
    toast.error(msg, toastOption)
}

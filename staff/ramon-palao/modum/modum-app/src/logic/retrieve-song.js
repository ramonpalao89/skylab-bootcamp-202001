import { validate } from 'modum-utils'
import context from './context'
const { NotAllowedError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (idSong) {
    validate.string(idSong, 'idSong')

    const [, payload,] = this.token.split('.')
    const conversion = atob(payload)
    const subObject = JSON.parse(conversion)
    const sub = subObject.sub

    
    return (async () => {
        const res = await fetch(`${API_URL}/track/${sub}/${idSong}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const { status } = res

        if (status === 200){
            const file = await `${API_URL}/track/${sub}/${idSong}`

            return file
        }

        if (status >= 400 && status < 500) {

            const { error } = await res.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)

        }
        throw new Error('server error')

    })()
}).bind(context)

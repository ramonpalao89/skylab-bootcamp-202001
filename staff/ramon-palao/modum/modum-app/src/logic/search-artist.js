import { validate } from 'modum-utils'
import context from './context'
const { NotAllowedError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default function (query) {
    validate.string(query, 'query')
    
    return (async () => {
        const res = await fetch(`${API_URL}/artist/?artist=${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const { status } = res

        if (status === 200){
            const album = await res.json()

            album.forEach(item => item.portrait = `${API_URL}/portrait/${item.id}`)

            return album
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
}

import { validate } from 'events-utils'
const { NotAllowedError, NotFoundError } = require('events-error')

const API_URL = process.env.REACT_APP_API_URL

export default function (token) {

    validate.string(token, 'token')

    return (async () => {
        const res = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        })

        const { status } = res

        if (status === 200) {
            const user = await res.json()
            return user
        }
        if (status >= 400 && status < 500) {

            const { error } = await res.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            if (status === 404) {
                throw new NotFoundError(error)
            }
            throw new Error(error)
        }
        throw new Error('server error')
    })()
}
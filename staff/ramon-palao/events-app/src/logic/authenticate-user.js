import { validate } from 'events-utils'
const {NotAllowedError} = require('events-error')

const API_URL = process.env.REACT_APP_API_URL

export default function (email, password) {

    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return (async () => {
        const res = await fetch(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const {token} = await res.json()

        if (res.status === 200) return token

        if (res.status === 409) {
  
            const { error } = await res.json()

            throw new NotAllowedError(error)
                
        } else throw new Error('Unknown error')
    })()
}
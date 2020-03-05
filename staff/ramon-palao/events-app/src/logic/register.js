import { validate } from 'events-utils'
const {NotAllowedError} = require('events-error')

const API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return (async () => {
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })

        if (res.status === 201) return 

        if (res.status === 409) {
  
            const { error } = await res.json()

            throw new NotAllowedError(error)
                
        } else throw new Error('Unknown error')
    })()
}
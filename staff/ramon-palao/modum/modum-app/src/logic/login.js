import { validate } from 'modum-utils'
import context from './context'
const { NotAllowedError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (email, password) {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password)

    return (async () => {
        const res = await fetch(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const { status } = res
        
        if (status === 200){
            const { token } = await res.json()
            this.token = token
            

            return
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
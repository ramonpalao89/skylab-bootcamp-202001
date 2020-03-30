import { validate } from 'modum-utils'
import context from './context'
const { NotAllowedError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (issuer, name, number, expiration, cvv) {
    validate.string(issuer, 'issuer')
    validate.string(name, 'name')
    validate.string(number, 'number')
    validate.string(expiration, 'expiration')
    validate.string(cvv, 'cvv')

    const [, payload,] = this.token.split('.')
    const conversion = atob(payload)
    const subObject = JSON.parse(conversion)
    const sub = subObject.sub

    return (async() => {
        const res = await fetch(`${API_URL}/credit-card/${sub}`,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + this.token},
            body: JSON.stringify({issuer, name, number, expiration, cvv})
        })

        const { status } = res

        if(status === 201) return

        if(status >= 400 && status < 500){

            const {error} = await res.json()
            
            if(status === 409){
                throw new NotAllowedError(error)
            }

            throw new Error(error)

        }
        throw new Error('server error')

    })()
}).bind(context)
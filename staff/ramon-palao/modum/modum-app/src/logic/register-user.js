import { validate } from 'modum-utils'
const { NotAllowedError } = require('modum-errors')

// const { env: { REACT_APP_API_URL: API_URL } } = process
// const API_URL = process.env.REACT_APP_API_URL
const API_URL = 'http://localhost:8085/api'

export default (name, surname, email, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password)

    return (async() => {
        const res = await fetch(`${API_URL}/users`,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({name, surname, email, password})
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
}
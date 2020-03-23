// import { validate } from 'modum-utils'
import context from './context'
const { NotAllowedError, NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (newUser) {
    // validate.string(name, 'name')
    // validate.string(surname, 'surname')
    // validate.string(email, 'email')
    // validate.email(email)
    // validate.string(password)

    const [, payload,] = this.token.split('.')
    const conversion = atob(payload)
    const subObject = JSON.parse(conversion)
    const sub = subObject.sub

    for(let key in newUser){
        if(key === 'password'){
            if(!newUser[key]) delete newUser[key]
        } else if (key === 'newPassword'){
            if(!newUser[key]) delete newUser[key]
        }
    }

    // if(!newUser.password) delete newUser.password
    // if(!newUser.newPassword) delete newUser.newPassword

    return (async() => {
        const res = await fetch(`${API_URL}/users/${sub}/update`,{
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.token},
            body: JSON.stringify(newUser)
        })

        const { status } = res

        if(status === 201) return

        if(status >= 400 && status < 500){

            const {error} = await res.json()

            if(status === 400){
                throw new NotAllowedError(error)
            }
            
            if(status === 409){
                throw new NotAllowedError(error)
            }

            if(status === 404){
                throw new NotFoundError(error)
            }

            throw new Error(error)

        }
        throw new Error('server error')

    })()
}).bind(context)
import { validate } from 'modum-utils'
import context from './context'
const { NotAllowedError, NotFoundError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function (id, format) {
    validate.string(id, 'id')
    validate.string(format, 'format')

    return (async() => {
        const res = await fetch(`${API_URL}/chart/${id}/${format}`,{
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.token}
        })

        const { status } = res

        if(status === 201) return

        if(status >= 400 && status < 500){

            const {error} = await res.json()

            if(status === 404){
                throw new NotFoundError(error)
            }

            throw new Error(error)

        }
        throw new Error('server error')

    })()
}).bind(context)
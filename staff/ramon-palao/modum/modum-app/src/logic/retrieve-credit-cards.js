import context from './context'
const { NotFoundError, NotAllowedError } = require('modum-errors')

const API_URL = process.env.REACT_APP_API_URL

export default (function () {

    return fetch(`${API_URL}/credit-card`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + this.token }
    })
        .then(response => {

            const { status } = response

            if (status >= 400 && status < 500) {

                const { error } = response.json()

                if (status === 404) {
                    throw new NotFoundError(error)
                }

                if (status === 401) {
                    throw new NotAllowedError(error)
                }

                throw new Error(error)

            }

            if (status === 200) {
                const creditCards = response.json()
                return creditCards
            }
        })
}).bind(context)

import React, { useEffect, useState, useContext } from 'react'
import { isLoggedIn, logout } from '../logic'
import { withRouter } from 'react-router-dom'
import { Context } from './ContextProvider'
import Feedback from './Feedback'

export default withRouter(({ history }) => {

    const [set, setState] = useContext(Context)

    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                try {

                    history.push('/home')

                } catch (error) {
                    setState({ error: error.message })
                    history.push('/login')
                }
            })()
        } else {
            history.push('/login')
        }
    }, [])

    const handleLogout = () => {
        logout()

        history.push('/login')
    }

    const { error } = set
    return <div>
        {error && <Feedback message={error} level="error" />}
        <h1>HELLO</h1>
        <button onClick={event => {
            event.preventDefault()
            handleLogout()
        }}>Logout</button>
    </div>
})
const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotAllowedError, NotFoundError } = require('modum-errors')
const bcrypt = require('bcryptjs')

module.exports = (idUser, body) => {
    validate.string(idUser, 'idUser')

    const validFields = ['name', 'surname', 'email', 'city', 'birth', 'password', 'newPassword']

    for (key in body) {
        if (!validFields.includes(key)) throw new NotAllowedError(`field ${key} cannot be modified`)

        if (key === 'newPassword' && !body.password) throw new Error('Old password must be completed')
        if (key === 'password' && !body.newPassword) throw new Error('New password must be completed')
    }

    return (async() => {
        
        const user = await User.findById(idUser)
        if (!user) throw new NotFoundError(`user ${id} does not exist`)
    
        if (body.newPassword) {
            const result = await bcrypt.compare(body.password, user.newPassword)
    
            if (!result) throw new NotAllowedError('wrong credentials')
            body.newPassword = await bcrypt.hash(body.newPassword, 10)
        }
    
        for (key in body) {
            user[key] = body[key]
        }
        
        await user.save()
        return 
    })()
}
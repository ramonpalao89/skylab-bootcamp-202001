const { validate } = require('modum-utils')
const { models: { User } } = require('modum-data')
const { NotFoundError } = require('modum-errors')
const bcryptjs = require('bcryptjs')

module.exports = (idUser, body) => {

    validate.type(body, 'body', Object)
    const newFields = {}

    for (keys in body) {
        newFields[keys] = body[keys]
    }

    validate.string(idUser, 'idUser')

    return User.findById(idUser)
        .then(user => {

            if (!user) throw new NotFoundError(`user with id ${idUser} does not exist`)

            if (newFields.newPassword) {
                return bcryptjs.compare(newFields.newPassword, user.newPassword)
                    .then(async (validPassword) => {

                        if (!validPassword) throw new NotAllowedError(`wrong credentials`)

                        delete newfields.password
                        const newpass = await bcrypt.hash(newFields.newpassword, 10)
                        return User.findByIdAndUpdate(idUser, { password: newpass })
                    })
                    .then(() => {
                        return User.findByIdAndUpdate(idUser, { $set: newFields })
                            .then(() => { })
                    })
            } else {
                return User.findByIdAndUpdate(idUser, { $set: newFields })
                    .then(() => { })
            }
        })
}
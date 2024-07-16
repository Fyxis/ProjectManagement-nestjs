/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        return hashPassword
    } catch (error) {
        return `Hashing Error : ${error}`
    }
}

export default hashPassword
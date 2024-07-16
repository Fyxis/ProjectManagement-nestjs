/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

const validatePassword = async (password: string, hashedPassword: string) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
    } catch (error) {
        throw new error('Error verifying password : ', error)
    }
}

export default validatePassword
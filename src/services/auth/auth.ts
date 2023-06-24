import { post } from '../../common/helpers/api_helper'
import { ChangePasswordTypes, LoginTypes, RegisterUser, userTypes } from './auth.types'
import { toast } from 'react-toastify'

const registerUser = async (body: RegisterUser) => {
  try {
    const response = await post('/auth/register', body)
    console.log(response)
    toast.success(response.msg)
    return response
  } catch (error) {
    console.log(error)
  }
}
const userLogin = async (body: LoginTypes) => {
  try {
    const response = await post('/auth/signin', body)

    return response
  } catch (error) {
    console.log(error)
  }
}
const changePassword = async (body: ChangePasswordTypes) => {
  try {
    const user = localStorage.getItem('user')
    const newUser: userTypes = user && JSON.parse(user)
    const newBody = { ...body, ...newUser }
    const response = await post('/auth/changepassword', newBody)
    toast.success(response.msg)
    return response
  } catch (error) {
    console.log(error)
  }
}

export { registerUser, userLogin, changePassword }

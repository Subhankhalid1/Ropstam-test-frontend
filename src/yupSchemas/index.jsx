import * as Yup from 'yup'

export const signUpSchema = Yup.object({
  username: Yup.string().min(4).max(25).required('Please enter your user name'),
  email: Yup.string().email().required('Please enter your email'),
})

export const loginSchema = Yup.object({
  email: Yup.string().email('Email must be a valid email').required('Please enter your email'),
  password: Yup.string().min(8).required('Please enter your password'),
})

export const settingSchema = Yup.object({
  currentpassword: Yup.string().min(6).required('Please enter your password'),
  newpassword: Yup.string().min(6).required('Please enter your password'),
  confirmnewpassword: Yup.string()
    .required()
    .oneOf([Yup.ref('newpassword'), null], 'Password must match'),
})

export const carsSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('Please enter your name'),
  color: Yup.string().min(2).max(25).required('Please enter color'),
  // category: Yup.string().required("Please Select a Category"),
  model: Yup.string().min(2).max(25).required('Please enter model'),
  make: Yup.string().min(2).max(25).required('Please enter make'),
  registration: Yup.string().min(2).max(25).required('Please enter registration'),
})

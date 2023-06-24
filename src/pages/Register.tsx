import { FC } from 'react'
import { Link } from 'react-router-dom'
import { routesConstant } from '../routes/routes'
import { useFormik } from 'formik'
import { signUpSchema } from '../yupSchemas'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../services/auth/auth'

// Initial state of signup form
const initialValues = {
  username: '',
  email: '',
}

const Register: FC = () => {
  const registerMutate = useMutation(registerUser)

  // formik function and validation handler
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values, action) => {
      await registerMutate.mutateAsync(values)
      action.resetForm()
    },
  })

  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-2/6 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-purple-700 underline'>Sign Up</h1>
        <form className='mt-6' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='username' className='block text-sm font-semibold text-gray-800'>
              Username
            </label>
            <input
              type='text'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='username'
              id='username'
              placeholder='Username'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.username && touched.username ? (
            <p className='text-base text-red-500 capitalize'>{errors.username}</p>
          ) : null}
          <div className='mb-2'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
              Email
            </label>
            <input
              type='email'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='email'
              id='email'
              value={values.email}
              placeholder='Email'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.email && touched.email ? (
            <p className='text-base text-red-500 capitalize'>{errors.email}</p>
          ) : null}
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'
            >
              Register
            </button>
          </div>
        </form>

        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          {' '}
          Don&apos;t have an account?{' '}
          <Link to={routesConstant.LOGIN} className='font-medium text-purple-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register

import { FC, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routesConstant } from '../routes/routes'
import { useFormik } from 'formik'
import { loginSchema } from '../yupSchemas'
import { useMutation } from '@tanstack/react-query'
import { userLogin } from '../services/auth/auth'
import { toast } from 'react-toastify'

// Initial state for validating
const initialValues = {
  email: '',
  password: '',
}
const Login: FC = () => {
  const loginQuery = useMutation(userLogin)
  const navigate = useNavigate()

  // formik function and validation handler
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values, action) => {
      const { data, token, msg } = await loginQuery.mutateAsync(values)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(data))
      toast.success(msg)
      if (token) {
        navigate(routesConstant.DASHBOARD)
      }
      action.resetForm()
    },
  })

  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-2/6 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-purple-700 underline'>Sign in</h1>
        <form className='mt-6' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
              Email
            </label>
            <input
              type='email'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='email'
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.email && touched.email ? (
            <p className='text-base text-red-500 capitalize'>{errors.email}</p>
          ) : null}
          <div className='mb-2'>
            <label htmlFor='password' className='block text-sm font-semibold text-gray-800'>
              Password
            </label>
            <input
              type='password'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.password && touched.password ? (
            <p className='text-base text-red-500 capitalize'>{errors.password}</p>
          ) : null}
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'
            >
              {loginQuery.isLoading ? 'loading' : 'Login'}
            </button>
          </div>
        </form>

        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          {' '}
          Don&apos;t have an account?{' '}
          <Link
            to={routesConstant.REGISTER}
            className='font-medium text-purple-600 hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

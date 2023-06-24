import { FC } from 'react'
import { settingSchema } from '../yupSchemas'
import { useFormik } from 'formik'
import { changePassword } from '../services/auth/auth'
import { useMutation } from '@tanstack/react-query'

const initialValues = {
  password: '',
  newpassword: '',
  confirmnewpassword: '',
}

const UpdateProfile: FC = () => {
  const updateUser = useMutation(changePassword)

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: settingSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values, action) => {
      await updateUser.mutateAsync(values)
      action.resetForm()
    },
  })
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-2/6 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-red-700 '>
          Update Profile
        </h1>
        <form className='mt-6' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
              Current Password
            </label>
            <input
              type='password'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='password'
              placeholder='Current Password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className='text-base text-red-500 capitalize'>{errors.password}</p>
            ) : null}
          </div>
          <div className='mb-2'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
              New Password
            </label>
            <input
              type='password'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='newpassword'
              placeholder='New Password'
              value={values.newpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.newpassword && touched.newpassword ? (
              <p className='text-base text-red-500 capitalize'>{errors.newpassword}</p>
            ) : null}
          </div>
          <div className='mb-2'>
            <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
              Confirm New Password
            </label>
            <input
              type='password'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              name='confirmnewpassword'
              placeholder='Confirm New Password'
              value={values.confirmnewpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmnewpassword && touched.confirmnewpassword ? (
              <p className='text-base text-red-500 capitalize'>{errors.confirmnewpassword}</p>
            ) : null}
          </div>

          <div className='mt-6'>
            <button
              type='submit'
              className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
            >
              Update Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile

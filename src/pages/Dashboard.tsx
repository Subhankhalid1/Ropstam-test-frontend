import { FC } from 'react'
import classNames from '../common/helpers/classNames'


const Dashboard: FC = () => {

  return (
    <div className=''>
      <div className='mt-10'>
        <div className='w-full px-4 pt-16'>
          <div className='mx-auto w-full max-w-md rounded-2xl bg-white p-2'>
            <>
              <div
                className={classNames(
                  'flex w-full justify-around items-center rounded-lg bg-purple-700 px-4 py-2 text-left font-medium text-purple-100 h-32',
                  'hover:bg-indigo-200',
                  'focus:outline-none',
                  'focus-visible:ring focus-visible:ring-opacity-75',
                )}
              >
               
                <span className='text-2xl'> Just For Ropstam_Test</span>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

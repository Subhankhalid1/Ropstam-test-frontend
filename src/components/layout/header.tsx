import { Fragment, FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Transition, Popover } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { AiFillSetting } from 'react-icons/ai'
import { routesConstant } from '../../routes/routes'
import images from '../../assets/images'

const Header: FC = () => {
  const navigate = useNavigate()
  return (
    <Popover className='relative bg-white'>
      <div className='mx-auto max-w-8xl px-10 sm:px-6'>
        <div className='flex items-center justify-between py-6 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link
              to={routesConstant.HOME}
              className='text-red-500 font-semibold text-lg tracking-tight logo_style '
            >
              <img src={images.logo} alt='' className='h-16' style={{borderRadius:'50%'}} />
            </Link>
          </div>
          <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
            <Link
              to={routesConstant.CATEGORIES}
              className='ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
            >
              All Categories
            </Link>
            <Link
              to={routesConstant.CARS}
              className='ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 '
            >
              All Cars
            </Link>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='flex items-center ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 '>
                  Profile <BiChevronDown />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='px-1 py-1'>
                    <Menu.Item>
                      <Link
                        to={routesConstant.UPDATE_PROFILE}
                        className={
                          'text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'
                        }
                      >
                        <AiFillSetting className='mr-2 ml-3 ' /> Update Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className={
                          'text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'
                        }
                        onClick={(e) => {
                          localStorage.removeItem('token')
                          localStorage.removeItem('user')
                          navigate('/login')
                        }}
                      >
                        <RiLogoutCircleLine className='mr-2 ml-3 ' /> Logout
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Popover>
  )
}
export default Header

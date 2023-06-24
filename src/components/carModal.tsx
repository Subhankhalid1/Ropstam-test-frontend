import { Fragment, useEffect, useState, FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createCars, updateCars } from '../services/cars/cars'
import { getAllCategories } from '../services/categories/categories'
// import { toast } from 'react-toastify'

interface CarModelProps {
  isOpen: boolean
  closeModal: () => void
  editCar: any
}

const CarModel: FC<CarModelProps> = ({ isOpen, closeModal, editCar }) => {
  const addCar = useMutation(createCars)
  const updateCar = useMutation(updateCars)
  const { data: allCategories } = useQuery(['getAllCategories'], getAllCategories)

  const [state, setState] = useState({
    name: '',
    category: '',
    color: '',
    model: '',
    make: '',
    registration: '',
  })
  useEffect(() => {
    if (editCar) {
      setState({ ...editCar })
    } else {
      setState({
        name: '',
        category: '',
        color: '',
        model: '',
        make: '',
        registration: '',
      })
    }
  }, [editCar])
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (editCar) {
      await updateCar.mutateAsync(state)
    } else {
      await addCar.mutateAsync(state)
    }
    setState({
      name: '',
      category: '',
      color: '',
      model: '',
      make: '',
      registration: '',
    })
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='bg-white px-6 py-8 rounded text-black w-full'>
                    <h3 className='mb-8 text-2xl text-center'>Create New Car</h3>
                    <input
                      type='text'
                      className='block border border-grey-light w-full p-2 rounded mb-4 outline-none'
                      name='name'
                      placeholder='Name'
                      value={state.name}
                      onChange={onChangeHandler}
                    />

                    <input
                      type='text'
                      className='block border border-grey-light w-full p-2 rounded mb-4 outline-none'
                      name='color'
                      placeholder='Color'
                      value={state.color}
                      onChange={onChangeHandler}
                    />

                    <input
                      type='text'
                      className='block border border-grey-light w-full p-2 rounded mb-4 outline-none'
                      name='model'
                      placeholder='Model'
                      value={state.model}
                      onChange={onChangeHandler}
                    />

                    <input
                      type='text'
                      className='block border border-grey-light w-full p-2 rounded mb-4 outline-none'
                      name='make'
                      placeholder='Make'
                      value={state.make}
                      onChange={onChangeHandler}
                    />

                    <input
                      type='text'
                      className='block border border-grey-light w-full p-2 rounded mb-4 outline-none'
                      name='registration'
                      placeholder='Registration No'
                      value={state.registration}
                      onChange={onChangeHandler}
                    />

                    <select
                      name='category'
                      id=''
                      className='block border border-grey-light w-full p-2 rounded mb-4 outline-none'
                      defaultValue={0}
                      onChange={onChangeHandler}
                    >
                      <option value='0'>Select Category</option>
                      {allCategories?.data?.length > 0 &&
                        allCategories?.data?.map(
                          (item: { _id: string; name: string }, key: number) => (
                            <option value={item._id} key={key}>
                              {item.name}
                            </option>
                          ),
                        )}
                    </select>
                    <div className='w-full text-right'>
                      <button
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={onSubmit}
                      >
                        {editCar ? 'Update' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CarModel

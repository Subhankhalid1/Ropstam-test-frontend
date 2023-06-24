import { Dialog, Transition } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { Fragment, useEffect, FC, useState } from 'react'
import { createCategory, updateCategory } from '../services/categories/categories'

interface CategoryModelProps {
  isOpen: boolean
  closeModal: () => void
  editCate: any
}

const CategoryModel: FC<CategoryModelProps> = ({ isOpen, closeModal, editCate }) => {
  const addNewCate = useMutation(createCategory)
  const updateCate = useMutation(updateCategory)
  const [state, setState] = useState({
    name: '',
  })
  useEffect(() => {
    if (editCate) {
      setState({ ...editCate })
    } else {
      setState({
        name: '',
      })
    }
  }, [editCate])
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editCate) {
      await updateCate.mutateAsync(state)
    } else {
      await addNewCate.mutateAsync(state)
    }
    setState({
      name: '',
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
                    <h3 className='mb-8 text-2xl text-center'>Create New Category</h3>
                    <input
                      type='text'
                      className='block border border-grey-light w-full p-2 rounded mb-4 outline-none'
                      name='name'
                      placeholder='Category Name'
                      value={state.name}
                      onChange={onChangeHandler}
                    />
                    <div className='w-full text-right'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={onSubmit}
                      >
                        {editCate ? 'Update' : 'Submit'}
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

export default CategoryModel

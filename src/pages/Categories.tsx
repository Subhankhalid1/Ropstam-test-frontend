import { FC, useState } from 'react'
import DataTables from '../components/dataTables'
import CategoryModal from '../components/categoryModal'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteCategory, getAllCategories } from '../services/categories/categories'



const Categories: FC = () => {
  const { data: allCategories } = useQuery(['getAllCategories'], getAllCategories)
  const deleteCate = useMutation(deleteCategory)

  // Modal state and functions Start
  const [isOpen, setIsOpen] = useState(false)
  const [editCate, setCate] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setCate(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  // Modal state and functions End
     
  const columns = [
    {
      name: 'Category Name',
      selector: (row: any) => <span className='capitalize'>{row.name}</span>,
     
    },
    {
      name: 'Created-At',
 
      selector: (row: any) =>new Date(row?.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Actions',
      selector: (row: any) => (
        <>
          <button
            onClick={(e) => {
              openModal()
              setCate(row)
            }}
            className='py-1 px-2 bg-indigo-500 text-white rounded mr-2'
          >
            Edit
          </button>
    
          <button
            onClick={async (e) => await deleteCate.mutateAsync(row._id)}
            className='py-1 px-2 bg-red-500 text-white rounded mr-2'
          >
            Delete
          </button>
        </>
      ),
    },
  ]

  return (
    <div className='w-11/12 mt-5 m-auto'>
      <div className='flex flex-row justify-between'>
        <h4  style={{color:'maroon'}}>List Of All Categories</h4>
        <button
          className='ml-8 whitespace-nowrap text-white font-medium bg-indigo-500 py-2 px-4 rounded   hover:bg-indigo-600'
          onClick={openModal}
           style={{backgroundColor:'maroon'}}
        >
          Create New Category
        </button>
      </div>
      {allCategories?.data && <DataTables rows={allCategories?.data} columns={columns} />}

      <CategoryModal isOpen={isOpen} closeModal={closeModal} editCate={editCate} />
    </div>
  )
}

export default Categories

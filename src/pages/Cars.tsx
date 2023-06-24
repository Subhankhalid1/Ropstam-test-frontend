import { FC, useState } from 'react'
import DataTables from '../components/dataTables'
import CarModal from '../components/carModal'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteCars, getAllCars } from '../services/cars/cars'

const Cars: FC = () => {
  const { data: allCarsList } = useQuery(['allCars'], getAllCars)
  const deleteCar = useMutation(deleteCars)

  // Add and Edit Car Modal handler
  const [isOpen, setIsOpen] = useState(false)
  const [editCar, setEditCar] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    setEditCar(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  // deleting one car
  const columns = [
    {
      name: 'Car Name',
      selector: (row: any) => <span className='capitalize'>{row.name}</span>,
     
    },
    {
      name: 'Color',
      selector: (row: any) => <span className='capitalize'>{row.color}</span>,
    
    },
    {
      name: 'Model',
      selector: (row: any) => <span className='capitalize'>{row.model}</span>,
      sortable: true,
    },
    {
      name: 'Manufactured By ',
      selector: (row: any) => <span className='capitalize'>{row.make}</span>,
      
    },
    {
      name: 'Registration No.',
      selector: (row: any) => <span className='capitalize'>{row.registration}</span>,
    
    },
    {
      name: 'Category Name',
      selector: (row: any) => <span className='capitalize'> {row.category?.name}</span>,
      
    },
    {
      name: 'Action',
      selector: (row: any) => (
        <>
          <button
            onClick={(e) => {
              openModal()
              setEditCar(row)
            }}
            className='py-1 px-2 bg-indigo-500 text-white rounded mr-2'
          >
            Edit
          </button>
          <button
            onClick={async (e) => {
              await deleteCar.mutateAsync(row._id)
            }}
            className='py-1 px-2 bg-red-500 text-white rounded mr-2'
          >
            Delete
          </button>
        </>
      ),
      sortable: true,
    },
  ]

  return (
    <div className='w-11/12 mt-5 m-auto'>
      <div className='flex flex-row justify-between'>
        <h4 style={{color:'maroon'}}>List Of All Cars</h4>
        <button
          className='ml-8 whitespace-nowrap text-white font-medium py-2 px-4 rounded' style={{backgroundColor:'maroon'}}
          onClick={openModal}
        >
          Create New Car
        </button>
      </div>
      {allCarsList?.data && <DataTables rows={allCarsList?.data} columns={columns} />}
      <CarModal isOpen={isOpen} closeModal={closeModal} editCar={editCar} />
    </div>
  )
}

export default Cars

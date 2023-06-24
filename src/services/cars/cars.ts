import { post, get, put, deleteAxios } from '../../common/helpers/api_helper'
import { CreateCarsTypes, updateCarsTypes } from './cars.types'
import { toast } from 'react-toastify'

const createCars = async (body: CreateCarsTypes) => {
  const response = await post('/car/addcar', body)
  toast.success(response.msg)
  return response
}

const getAllCars = async () => {
  const response = await get('/car/getallcars')
  return response
}
const updateCars = async (body: updateCarsTypes) => {
  const response = await put(`/car/updatecar/${body._id}`, body)
  toast.success(response.msg)
   return response
}
const deleteCars = async (id: string) => {
  const response = await deleteAxios(`/car/deletecar/${id}`)
  toast.success(response.msg)
  return response
}

export { createCars, getAllCars, updateCars, deleteCars }

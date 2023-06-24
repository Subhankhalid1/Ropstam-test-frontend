import { post, get, put, deleteAxios } from '../../common/helpers/api_helper'
import { CreateCategoryTypes, updateCategoryTypes } from './categories.types'
import { toast } from 'react-toastify'

const createCategory = async (body: CreateCategoryTypes) => {
  const response = await post('/category/addcategory', body)
  toast.success(response.msg)
  return response
}

const getAllCategories = async () => {
  const response = await get('/category/getallcagories')
  return response
}
const updateCategory = async (body: updateCategoryTypes) => {
  const response = await put(`/category/updatecategory/${body._id}`, body)
  toast.success(response.msg)
  return response
}
const deleteCategory = async (id: string) => {
  const response = await deleteAxios(`/category/deletecategory/${id}`)
  toast.success(response.msg)
  return response
}

export { createCategory, getAllCategories, updateCategory, deleteCategory }

export interface RegisterUser {
  username: string
  email: string
}
export interface LoginTypes {
  email: string
  password: string
}
export interface ChangePasswordTypes {
  email?: string
  password: string
  newpassword: string
  confirmnewpassword: string
}
export interface userTypes {
  _id: string;
  created_at: string;
  username: string;  
  email: string;
}

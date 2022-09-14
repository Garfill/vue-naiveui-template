import { usePost } from './utils'

export const getUserProfile = () => usePost({
  url: '/user/profile',
})
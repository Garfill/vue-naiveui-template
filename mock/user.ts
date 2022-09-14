import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/user/profile',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          id: 1,
          name: 'admin',
        }

      }
    }
  }
] as MockMethod[]
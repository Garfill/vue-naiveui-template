import axios from 'axios'
import { message as msg } from '@/register/message'
import { h } from 'vue'
import { NAlert } from 'naive-ui'
import type { MessageRenderMessage } from 'naive-ui'

const baseURL = import.meta.env.VITE_API_URL

const renderMessage: MessageRenderMessage = (props) => {
  const { type } = props
  return h(
    NAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      type: type === 'loading' ? 'default' : type,
      title: '报错啦',
      style: {
        boxShadow: 'var(--n-box-shadow)',
        maxWidth: 'calc(100vw - 32px)',
        width: '300px'
      }
    },
    {
      default: () => props.content
    }
  )
}
const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(function(config) {
  return config
})

axiosInstance.interceptors.response.use(function (response) {
  const { data } = response
  if (data.code !== 200) {
    const message = data.message || '网络错误'
    msg.error(message, {
      render: renderMessage,
    })
    return Promise.reject(message)
  }
  return response
})


interface RequestConfig {
  url: string;
  method?: 'post' | 'get';
  data?: object;
  params?: object;
}

export const useAxios = (option: RequestConfig) => {
  return axiosInstance.request(option)
}

export const usePost = (option: RequestConfig) => {
  return useAxios({
    ...option,
    method: 'post'
  })
}

export const useGet = (option: RequestConfig) => {
  return useAxios({
    ...option,
    method: 'get'
  })
}

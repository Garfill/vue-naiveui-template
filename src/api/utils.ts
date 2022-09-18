import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message as msg } from '@/register/message'
import { h } from 'vue'
import { NAlert } from 'naive-ui'
import type { MessageRenderMessage } from 'naive-ui'
import { resolve } from '@/utils/resolvePromise'

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
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5 * 1000,
})

axiosInstance.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    msg.error('网络异常，请求失败！')
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    const { data } = response
    if (data.code !== 200) {
      const message = data.message || '网络错误'
      msg.error(message, {
        render: renderMessage,
      })
      return Promise.reject(message)
    }
    return response
  },
  function (error) {
    msg.error('服务异常，请联系管理员~')
    return Promise.reject(error)
  }
)



interface RequestInterceptor {
  (config: AxiosRequestConfig): any
}
interface ResponseInterceptor {
  (response: AxiosResponse): any
}

export interface ExtraConfig {
  onRequest?: RequestInterceptor | RequestInterceptor[];
  onResponse?: ResponseInterceptor | ResponseInterceptor[];
}

type CompoundRequestConfig = AxiosRequestConfig & ExtraConfig

function callInterceptor(interceptor: any, config: AxiosRequestConfig) {
  if (typeof interceptor === 'function') {
    interceptor(config)
  } else if (Array.isArray(interceptor)) {
    for (let i = 0; i < interceptor.length; i++) {
      callInterceptor(interceptor[i], config)
    }
  }
}

export const useAxios = async (option: CompoundRequestConfig) => {
  const { onRequest, onResponse } = option
  delete option.onRequest
  delete option.onResponse
  onRequest && callInterceptor(onRequest, option)

  const [error, response] = await resolve(axiosInstance.request(option))
  if (error) {
    // 单个请求的错误处理
  }
  onResponse && callInterceptor(onResponse, response)
  return response 
}

export const usePost = (option: CompoundRequestConfig) => {
  return useAxios({
    ...option,
    method: 'post'
  })
}

export const useGet = (option: CompoundRequestConfig) => {
  return useAxios({
    ...option,
    method: 'get'
  })
}

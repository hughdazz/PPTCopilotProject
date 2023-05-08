import request from '@/utils/request'

export function genOutline(data) {
  return request({
    url: '/gpt/gen_outline',
    method: 'post',
    data
  })
}

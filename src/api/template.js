import request from '@/utils/request'

export function getAllTemplates() {
  return request({
    url: '/templates',
    method: 'get',
  })
}

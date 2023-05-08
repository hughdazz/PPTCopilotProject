import request from '@/utils/request'

export function submitForm() {
  return request({
    url: '/vue-element-admin/submit/form',
    method: 'get',
    params: { }
  })
}

export function addProject(query) {
  return request({
    url: '/add/project',
    method: 'get',
    params: query
  })
}
export function fetchList(query) {
  return request({
    url: '/project',
    method: 'get',
    params: query
  })
}
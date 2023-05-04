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
    url: '/vue-element-admin/add/project',
    method: 'get',
    params: query
  })
}

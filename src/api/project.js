import request from '@/utils/request'

export function getProject(id) {
  return request({
    url: '/project?id='+id,
    method: 'get',
  })
}

export function getFile(id) {
  return request({
    url: '/project?id='+id+'/file',
    method: 'get',
  })
}
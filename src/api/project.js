import request from '@/utils/request'

export function getProject(id) {
  return request({
    url: '/project?id=' + id,
    method: 'get',
  })
}

export function getProjectList() {
  return request({
    url: '/project',
    method: 'get',
  })
}

export function getFile(id) {
  return request({
    url: '/project/' + id + '/file',
    method: 'get',
  })
}

export function createProject(data) {
  return request({
    url: '/project',
    method: 'post',
    data
  })
}

export function deleteProject(id) {
  return request({
    url: '/project/' + id,
    method: 'delete',
  })
}

export function updateProject(id, data) {
  return request({
    url: '/project/' + id,
    method: 'put',
    data
  })
}

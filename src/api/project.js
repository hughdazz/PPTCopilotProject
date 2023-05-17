import request from '@/utils/request'

export function getProject(id) {
  return request({
    url: '/project/' + id,
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

export function uploadFile(id, data) {
  return request({
    url: '/project/' + id + '/file',
    method: 'post',
    data
  })
}

export function deleteFile(id, filename) {
  return request({
    url: '/project/' + id + '/file/'+filename,
    method: 'delete',
  })
}

export function likeProject(id){
  return request({
    url: '/project/' + id + '/star',
    method: 'post',
  })
}

export function cloneProject(id) {
  return request({
    url: '/project/' + id,
    method: 'post',
  })
}

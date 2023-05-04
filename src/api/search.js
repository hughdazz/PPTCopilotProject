import request from '@/utils/request'
export function searchProjects(filterWords) {
  return request({
    url: '/search_project',
    method: 'get',
    params: {
      filter_words: filterWords
    }
  })
}

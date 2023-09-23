import request from '@/utils/request'

// 查询参数列表
export function listConfig() {
  return request({
    url: '/api/mines/list',
    method: 'get',
  })
}


// 查询参数详细
export function getConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/system/config',
    method: 'post',
    data: data
  })
}

// 修改矿石品位参数配置
export function updateConfig(data) {
  return request({
    url: '/api/mines/setWellLevel',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  })
}

//溜井方案
export function getConfigPlan(data) {
  console.log(data)
  return request({
    url: '/api/mines/optimize',
    method: 'post',
    data: data
  })
}

//
export function getOwnConfigPlan(data) {
  return request({
    url: '/api/mines/handOptimize',
    method: 'post',
    data: data
  })
}


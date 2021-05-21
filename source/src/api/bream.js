import base_request from "../utils/http.js"
import store from '../store'

const request = (option) => {
  option.url = `${store.getters['platform/serverInfo']}/api/bream${option.url}`
  return base_request(option)
}

// 获取woek_space信息
export function apiGetUserWorkspace(ws_id) {
  let path_query = ws_id ? `ws_id=${ws_id}` : ``
  return request({
    url: `/work_spaces/user_workspace?${path_query}`,
    method: 'get',
  })
}

// 获取常用APP列表
export function apiGetWorkspaceUserFavApps() {
  return request({
    url: `/ws_user_fav_apps_v1/apps?ws_id=${store.getters['workspace/uuid']}`,
    method: 'get',
  })
}

// 获取固定应用
export function apiFixedAppList() {
  return request({
    url: `/applications?is_basic=true&ordering=display_order`,
    method: "get"
  });
}

/************************************************
			APP STORE PAGE API.
 ***********************************************/
// 获取维度
export function apiGetDimensions() {
  return request({
    url: `/group_dimensions?ordering=priority`,
    method: 'get',
  })
}

// 获取维度的分组
export function apiGetAppGroups() {
  return request({
    url: `/application_groups?ordering=priority`,
    method: 'get'
  });
}

// 获取商店的APP列表
export function apiApplicationsList(group_id='', searchValue='') {
  return request({
    url: `/applications/client_v1?search=${searchValue}${group_id?'&groups=' + group_id:''}`,
    method: "get"
  });
}

/** app调度 */
export function apiAppSchedule(uuid, params) {
  return request({
    url: `/applications/${uuid}/schedule`,
    method: "get",
    params
  });
}

/** 获取最近文档*/
export function apiRecentFileList() {
    return request({
      url: `/work_spaces/recent_files`,
      method: "get"
    });
}

// 设为常用
export function apiAddWorkspaceUserFavApps(app_uuid) {
  return request({
    url: `/ws_user_fav_apps_v1`,
    method: 'post',
    data:{
      ws: store.getters.workspace_uuid,
      app_uuid
    }
  })
}

// 移除常用
export function apiRemoveWorkspaceUserFavApps(app_uuid) {
  return request({
    url: `/ws_user_fav_apps_v1/remove`,
    method: 'delete',
    data: {
      ws_id: store.getters.workspace_uuid,
      app_uuid
    }
  })
}

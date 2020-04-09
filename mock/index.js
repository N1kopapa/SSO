import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import organstructure from './organ-structure'
import user from './user'
import role from './role'
import article from './article'
import search from './remote-search'
import usermanage from './user-manage'
import rucrole from './ruc-role'
import accesslog from './mock-log/accesslog'
import basicuserinfo from './basic-user-info'
import tenantsmtpconfig from './tenant-smtp-config'
import tenantadconfig from './tenant-ad-config'
import tenantmessageconfig from './tenant-message-config'
import applicationsystem from './application-system'
import group from './group'
import tenant from './tenant'
import exceptionlog from './mock-log/exceptionlog'
const mocks = [
  ...user,
  ...role,
  ...article,
  ...search,
  ...usermanage,
  ...rucrole,
  ...accesslog,
  ...basicuserinfo,
  ...tenantsmtpconfig,
  ...tenantadconfig,
  ...tenantmessageconfig,
  ...applicationsystem,
  ...group,
  ...tenant,
  ...organstructure,
  ...exceptionlog
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

export default mocks

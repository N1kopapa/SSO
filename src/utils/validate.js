export function timeCompare(timeNew, timeOld) {
  var oDateNew = new Date(timeNew);
  var oDateOld = new Date(timeOld);
  if (oDateNew.getTime() > oDateOld.getTime()) {
    return true
  } else {
    return false
  }

}

/**
 * Created by PanJiaChen on 16/11/18.
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}


export function validate_tenantInfo(form) {
  let contactPersonIslegal = form.contactPerson && form.contactPerson.length > 0 && form.contactPerson.length < 50
  if (!contactPersonIslegal)
    return {
      isOK: false,
      errInfo: "联系人输入不符合要求"
    }
  let contactPhoneIslegal = form.contactPhone && form.contactPhone.length > 0 && (/^1[3456789]\d{9}$/.test(form.contactPhone))
  if (!contactPhoneIslegal)
    return {
      isOK: false,
      errInfo: "联系人电话不符合要求"
    }
  let EmailIslegal = validEmail(form.email)
  if (!EmailIslegal)
    return {
      isOK: false,
      errInfo: "Email地址不符合要求"
    }

  return {
    isOK: true,
    errInfo: null
  }
}

function isCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
  var pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (pattern.test(card) === false) {
    return false;
  }
  else {
    return true
  }
}

export function validate_user(form) {
  let userNameIslegal = form.userName && form.userName.length > 0 && form.userName.length < 50
  if (!userNameIslegal)
    return {
      isOK: false,
      errInfo: "用户名输入不符合要求"
    }

  let userPwdIslegal = form.userPwd && form.userPwd.length > 0 && form.userPwd.length < 50  
  if (!userPwdIslegal)
    return {
      isOK: false,
      errInfo: "密码输入不符合要求"
    }

  let userPwdLegal = !(/[\u4E00-\u9FA5]/g.test(form.userPwd))
  if (!userPwdLegal)
  return {
    isOK: false,
    errInfo: "用户密码不能为汉字"
  }

  let userTypeIslegal = form.userType && form.userType != ""
  if (!userTypeIslegal)
    return {
      isOK: false,
      errInfo: "用户类型为空"
    }
  let statusIslegal = form.status && form.status != ""
  if (!statusIslegal)
    return {
      isOK: false,
      errInfo: "用户状态为空！"
    }

  let actualNameIslegal = form.actualName && form.actualName.length > 0 && form.actualName.length < 50
  if (!actualNameIslegal)
    return {
      isOK: false,
      errInfo: "真实姓名输入不符合要求"
    }

  let idCardIslegal = form.idCard && isCardNo(form.idCard)
  if (!idCardIslegal)
    return {
      isOK: false,
      errInfo: "身份证号码不符合要求"
    }

  let birthDayIslegal = form.birthDay && form.birthDay != ""
  if (!birthDayIslegal)
    return {
      isOK: false,
      errInfo: "出生日期为空"
    }


  let EmailIslegal = validEmail(form.email)
  if (!EmailIslegal)
    return {
      isOK: false,
      errInfo: "Email地址不符合要求"
    }


  return {
    isOK: true,
    errInfo: null
  }
}

export function validate_tenantInfoAll(form) {
  let userNameIslegal = form.tenantName && form.tenantName.length > 0 && form.tenantName.length < 50
  if (!userNameIslegal)
    return {
      isOK: false,
      errInfo: "租户名输入不符合要求"
    }

  let userPwdIslegal = form.loginAccount && form.loginAccount.length > 0 && form.loginAccount.length < 50
  if (!userPwdIslegal)
    return {
      isOK: false,
      errInfo: "登录账号输入不符合要求"
    }

  let tenantTypeIslegal = form.tenantType && form.tenantType != ""
  if (!tenantTypeIslegal)
    return {
      isOK: false,
      errInfo: "租户类型为空"
    }

  let startDateIslegal = form.startDate && form.startDate != ""
  if (!startDateIslegal)
    return {
      isOK: false,
      errInfo: "开始时间为空"
    }

  let endDateIslegal = form.endDate && form.endDate != ""
  if (!endDateIslegal)
    return {
      isOK: false,
      errInfo: "结束时间为空"
    }

  let timeIsLegal = timeCompare(form.endDate, form.startDate)
  if (!timeIsLegal)
    return {
      isOK: false,
      errInfo: "启用日期不能大于到期日期"
    }

  let usageStatusIslegal = form.usageStatus && form.usageStatus != ""
  if (!usageStatusIslegal)
    return {
      isOK: false,
      errInfo: "使用状态为空"
    }

  let currentStatusIslegal = form.currentStatus && form.currentStatus != ""
  if (!currentStatusIslegal)
    return {
      isOK: false,
      errInfo: "当前状态为空"
    }

  let areaIslegal = form.area && form.area != ""
  if (!areaIslegal)
    return {
      isOK: false,
      errInfo: "区域为空"
    }

  let EmailIslegal = validEmail(form.email)
  if (!EmailIslegal)
    return {
      isOK: false,
      errInfo: "Email地址不符合要求"
    }

  return {
    isOK: true,
    errInfo: null
  }

}

export function validate_group(form, checkTenants) {
  let groupNameIslegal = form.groupName && form.groupName.length > 0 && form.groupName.length < 50
  if (!groupNameIslegal)
    return {
      isOK: false,
      errInfo: "租户分组组名不符合要求"
    }

  let checkTenantsIslegal = checkTenants && isArray(checkTenants) && checkTenants.length > 0
  if (!checkTenantsIslegal)
    return {
      isOK: false,
      errInfo: "租户分组必须选租户"
    }

  return {
    isOK: true,
    errInfo: null
  }

}

export function validate_applicationSystem(form){

  let ret = (form.applicationSystemName && form.applicationSystemName.length>0 && form.applicationSystemName.length<50)
  if (!ret){
    return {
      isOK: false,
      errInfo: "应用系统名称不符合要求"
    }
  }

  let TpyeNameIsLegal = (form.applicationSystemTpyeName && form.applicationSystemTpyeName != "")
  if (!TpyeNameIsLegal){
    return {
      isOK: false,
      errInfo: "系统类型不能为空"
    }
  }

  // let accessUrlIsLegal = validURL(form.accessUrl)
  // if (!accessUrlIsLegal){
  //   return {
  //     isOK: false,
  //     errInfo: "url输入不合法"
  //   }
  // }


  return {
    isOK: true,
    errInfo: null
  }


}

export function system_dictionary(form) {
  let checkDictionaryName = (form.dictionaryName == undefined || form.dictionaryName == "" || form.dictionaryName == null)
  if (checkDictionaryName) {
    return {
      isOK: false,
      errInfo: "字典名称不能为空"
    }
  }

  let checkDictionaryitem = (form.dictionaryitem == undefined || form.dictionaryitem == "" || form.dictionaryitem == null)
  if (checkDictionaryitem) {
    return {
      isOK: false,
      errInfo: "字典项目不能为空"
    }
  }

  for (let index = 0; index < form.dictionaryitem.length; index++) {
    let checkDictionaryItemName = (form.dictionaryitem[0].dictionaryItemName == undefined || form.dictionaryitem[0].dictionaryItemName == "" || form.dictionaryitem[0].dictionaryItemName == null)
    if (checkDictionaryItemName) {
      return {
        isOK: false,
        errInfo: "条目名称不能为空"
      }
    }
  }

  return {
    isOK: true,
    errInfo: null
  }

}


export function validate_keeperAccoutEdit(form) {

  let userNameIslegal = (form.userName && form.userName.length>0 && form.userName.length < 50)
  if (!userNameIslegal){
    return {
      isOK: false,
      errInfo: "用户名不符合要求"
    }
  }

  let emailIslegal = validEmail(form.email)
  if (!emailIslegal)
    return {
      isOK: false,
      errInfo: "邮箱不符合要求"
    }

  let telephoneIslegal = (/^1[3456789]\d{9}$/.test(form.mobilePhone))
  if (!telephoneIslegal)
    return {
      isOK: false,
      errInfo: "手机号码不符合要求"
    }

  let qqIslegal = (/^(-)?\d+(\.\d+)?$/.test(form.qq))
  if (!qqIslegal)
    return {
      isOK: false,
      errInfo: "QQ只允许数字"
    }


  return {
    isOK: true,
    errInfo: null
  }

}



export function validate_systemRole(form,isSystemRole) {
  let roleNameIslegal = form.roleName && form.roleName.length > 0 && form.roleName.length < 50
  if (!roleNameIslegal)
    return {
      isOK: false,
      errInfo: "角色名不符合要求"
    }
  if (isSystemRole){ 
  let applicationSystemIdIslegal = form.applicationSystemId && form.applicationSystemId != ""
  if (!applicationSystemIdIslegal)
    return {
      isOK: false,
      errInfo: "应用系统为空"
    }
  }
  return {
    isOK: true,
    errInfo: null
  }

}


export function validate_systemRole2(form) {
  let roleNameIslegal = form.roleName && form.roleName.length > 0 && form.roleName.length < 50
  if (!roleNameIslegal)
    return {
      isOK: false,
      errInfo: "角色名不符合要求,角色名不超过50个字符"
    }

  return {
    isOK: true,
    errInfo: null
  }

}
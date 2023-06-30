import { storage, companyIdTableName } from '@/config'
import cookie from 'js-cookie'

/**
 * @description 获取companyId
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getCompanyId() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(companyIdTableName) == null
        ? ''
        : localStorage.getItem(companyIdTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(companyIdTableName) == null
        ? ''
        : sessionStorage.getItem(companyIdTableName)
    } else if ('cookie' === storage) {
      return cookie.get(companyIdTableName) == null
        ? ''
        : cookie.get(companyIdTableName)
    } else {
      return localStorage.getItem(companyIdTableName) == null
        ? ''
        : localStorage.getItem(companyIdTableName)
    }
  } else {
    return localStorage.getItem(companyIdTableName) == null
      ? ''
      : localStorage.getItem(companyIdTableName)
  }
}

/**
 * @description 存储companyId
 * @param companyId)
 * @returns {void|*}
 */
export function setCompanyId(companyId) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(companyIdTableName, companyId)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(companyIdTableName, companyId)
    } else if ('cookie' === storage) {
      return cookie.set(companyIdTableName, companyId)
    } else {
      return localStorage.setItem(companyIdTableName, companyId)
    }
  } else {
    return localStorage.setItem(companyIdTableName, companyId)
  }
}

/**
 * @description 移除companyId
 * @returns {void|Promise<void>}
 */
export function removeCompanyId() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(companyIdTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove(companyIdTableName)
    } else {
      return localStorage.removeItem(companyIdTableName)
    }
  } else {
    return localStorage.removeItem(companyIdTableName)
  }
}

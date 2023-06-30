import { storage, phoneTableName } from '@/config'
import cookie from 'js-cookie'

/**
 * @description 获取phone
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getPhone() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(phoneTableName) == null
        ? ''
        : localStorage.getItem(phoneTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(phoneTableName) == null
        ? ''
        : sessionStorage.getItem(phoneTableName)
    } else if ('cookie' === storage) {
      return cookie.get(phoneTableName) == null
        ? ''
        : cookie.get(phoneTableName)
    } else {
      return localStorage.getItem(phoneTableName) == null
        ? ''
        : localStorage.getItem(phoneTableName)
    }
  } else {
    return localStorage.getItem(phoneTableName) == null
      ? ''
      : localStorage.getItem(phoneTableName)
  }
}

/**
 * @description 存储phone
 * @param phone
 * @returns {void|*}
 */
export function setPhone(phone) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(phoneTableName, phone)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(phoneTableName, phone)
    } else if ('cookie' === storage) {
      return cookie.set(phoneTableName, phone)
    } else {
      return localStorage.setItem(phoneTableName, phone)
    }
  } else {
    return localStorage.setItem(phoneTableName, phone)
  }
}

/**
 * @description 移除phone
 * @returns {void|Promise<void>}
 */
export function removePhone() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(phoneTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove(phoneTableName)
    } else {
      return localStorage.removeItem(phoneTableName)
    }
  } else {
    return localStorage.removeItem(phoneTableName)
  }
}

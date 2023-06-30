import { storage, uidTableName } from '@/config'
import cookie from 'js-cookie'

/**
 * @description 获取uid
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getUid() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(uidTableName) == null
        ? ''
        : localStorage.getItem(uidTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(uidTableName) == null
        ? ''
        : sessionStorage.getItem(uidTableName)
    } else if ('cookie' === storage) {
      return cookie.get(uidTableName) == null ? '' : cookie.get(uidTableName)
    } else {
      return localStorage.getItem(uidTableName) == null
        ? ''
        : localStorage.getItem(uidTableName)
    }
  } else {
    return localStorage.getItem(uidTableName) == null
      ? ''
      : localStorage.getItem(uidTableName)
  }
}

/**
 * @description 存储uid
 * @param uid
 * @returns {void|*}
 */
export function setUid(uid) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(uidTableName, uid)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(uidTableName, uid)
    } else if ('cookie' === storage) {
      return cookie.set(uidTableName, uid)
    } else {
      return localStorage.setItem(uidTableName, uid)
    }
  } else {
    return localStorage.setItem(uidTableName, uid)
  }
}

/**
 * @description 移除uid
 * @returns {void|Promise<void>}
 */
export function removeUid() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(uidTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove(uidTableName)
    } else {
      return localStorage.removeItem(uidTableName)
    }
  } else {
    return localStorage.removeItem(uidTableName)
  }
}

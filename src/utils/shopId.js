import { storage, shopIdTableName } from '@/config'
import cookie from 'js-cookie'

/**
 * @description 获取shopId
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getShopId() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(shopIdTableName) == null
        ? ''
        : localStorage.getItem(shopIdTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(shopIdTableName) == null
        ? ''
        : sessionStorage.getItem(shopIdTableName)
    } else if ('cookie' === storage) {
      return cookie.get(shopIdTableName) == null
        ? ''
        : cookie.get(shopIdTableName)
    } else {
      return localStorage.getItem(shopIdTableName) == null
        ? ''
        : localStorage.getItem(shopIdTableName)
    }
  } else {
    return localStorage.getItem(shopIdTableName) == null
      ? ''
      : localStorage.getItem(shopIdTableName)
  }
}

/**
 * @description 存储shopId
 * @param shopId
 * @returns {void|*}
 */
export function setShopId(shopId) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(shopIdTableName, shopId)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(shopIdTableName, shopId)
    } else if ('cookie' === storage) {
      return cookie.set(shopIdTableName, shopId)
    } else {
      return localStorage.setItem(shopIdTableName, shopId)
    }
  } else {
    return localStorage.setItem(shopIdTableName, shopId)
  }
}

/**
 * @description 移除shopId
 * @returns {void|Promise<void>}
 */
export function removeShopId() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(shopIdTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove(shopIdTableName)
    } else {
      return localStorage.removeItem(shopIdTableName)
    }
  } else {
    return localStorage.removeItem(shopIdTableName)
  }
}

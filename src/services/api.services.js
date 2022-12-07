/*!
 * API services (Vue)
 * File: api.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

import axios from "axios";
import messageHandler from "./message.services";

const api = axios.create({
  baseURL: import.meta.env.PA_APPS_API_URL,
  headers: {
    "Content-Type": "application/json",
    dataType: "json",
  },
  withCredentials: true,
});
export default api;


/**
 * Helper utility for removing async/await try/catch litter
 * - encapsulates API errors to avoid cascading fallbacks
 */

/* Native Error types https://mzl.la/2Veh3TR */

const nativeExceptions = [
  EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
].filter((except) => typeof except === 'function')

/* Throw native errors. ref: https://bit.ly/2VsoCGE */
function throwNative(error) {
  for (const Exception of nativeExceptions) {
    if (error instanceof Exception) throw error
  }
}

function asyncWrapper(promise, finallyFunc) {
  return promise.then(data => {
    if (data instanceof Error) {
      throwNative(data)
      return [ data ]
    }
    return [ undefined, data ]
  }).catch(error => {
    throwNative(error)
    return [ error ]
  }).finally(() => {
    if (finallyFunc && typeof finallyFunc === 'function') {
      finallyFunc()
    }
  })
}

/**
 * Process API result
 */

const handleResult = (error, result) => {

  const {data=[]} = result || {}
  if (error && error.response) {
    if (error.response.status === 403 || error.response.status === 401) {
      return [messageHandler.get('notAuthorized'), null];
    }
    else if (error.response.status === 422) {
      return [messageHandler.get('invalidData'), null];
    }
    else return [messageHandler.get('serverError'), null];
  }
  return [error, data];
}

/**
 * Login user
 *
 * @return users
 */

export const login = async () => {
  const [error, result] = await asyncWrapper(api.get(`admin/login`));
  return handleResult(error, result);
}

/**
 * Login user
 *
 * @return users
 */

export const logout = async () => {
  const [error, result] = await asyncWrapper(api.get(`admin/logout`));
  return handleResult(error, result);
}

/**
 * Get method
 *
 * @return users
 */

export const get = async (route) => {
  const [error, result] = await asyncWrapper(api.get(route));
  return handleResult(error, result);
}

/**
 * Post method
 *
 * @return response
 */

export const post = async (route, data) => {
  const [error, result] = await asyncWrapper(api.post(route, data));
  return handleResult(error, result);
}

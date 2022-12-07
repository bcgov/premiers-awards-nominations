/*!
 * Auth services (Vue)
 * File: api.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

import { get } from "@/services/api.services";

/**
 * Authenticate user on all router calls.
 *
 * @src public
 */

export const authenticate = async (to, from, next) => {
  const user = await getUserData() || {};
  // redirect unauthenticated users to 401 page
  if (!user.guid && !user.username && to.name !== 'unauthorized' && to.name !== 'page-not-found')
    return next({path: '/401'});
  // redirect authenticated users to registration page (if on unauthorized page)
  else if (user.guid && user.username && to.name === 'unauthorized')
    return next({path: 'users-register'});
  else next();
}

/**
 * Retrieve user role for route authorization
 *
 * @src public
 */

export const getUserData = async () => {
  const [, data] = await get(`admin/users/info`);
  return data;
}

/**
 * Authorize user based on role.
 *
 * @src public
 */

export const authorizeAdmin = async (to, from, next) => {
  const {roles=[]} = await getUserData() || {};
  if (!['administrator', 'super-administrator'].some(r=> roles.includes(r)))
    return next({name: 'unauthorized'});
  else next();
}



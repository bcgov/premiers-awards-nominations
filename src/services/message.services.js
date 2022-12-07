/*!
 * Error service (Vue)
 * File: message.services.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

const messages = {
  insert: { text: 'New record added successfully!', type: 'success' },
  update: { text: 'Record updated successfully!', type: 'success' },
  remove: { text: 'Record deleted successfully!', type: 'success' },
  invalidToken: { text: 'User token could not be verified.', type: 'error' },
  invalidData: { text: 'Your form data is invalid or incomplete.', type: 'error' },
  serverError: { text: 'Server Error: Your request could not be completed.', type: 'error' },
  notAuthorized: { text: 'You are not authorized to access this screen.', type: 'error' },
  notAuthenticated: { text: 'User is not authenticated.', type: 'error' },
  loginError: { text: 'Login Error: Your user credentials are not valid.', type: 'error' }
};

export default {

  /**
   * get enumerated error message by key
   * **/

  get: function get(key) {
    return messages[key] !== 'undefined' ? messages[key] : null;
  },

  /**
   * post message
   * **/

  post: function post(key, error) {
    const {text=''} = get(key) || {};
    if (error) return {severity: 'error', summary: 'An Error has Occurred', detail: error.text, life: 3000};
    else if (text) {
      return {severity: 'success', summary: 'Update Successful!', detail: text, life: 3000}
    }
  }

}

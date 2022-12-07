/*!
 * Error handlers
 * File: error.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

'use strict';

// global logger
const {logger} = require('./logger');

// error codes/messages
const errors = {
  default: {
    hint: 'Generic error for server failure.',
    msg: 'Your request could not be completed. Contact the site administrator for assistance.',
    status: 500,
    type: 'error'
  },
  dbError: {
    hint: 'Database failed to complete transaction.',
    msg: 'Database error has occurred. Please contact the site administrator',
    status: 500,
    type: 'error'
  },
  noTestInit: {
    hint: 'Test user was not created.',
    msg: 'Test user not initialized for local environment. Ensure the .env file is complete.',
    status: 500,
    type: 'error'
  },
  invalidRequest: {
    hint: 'The request data is malformed.',
    msg: 'Request is invalid.',
    status: 500,
    type: 'error'
  },
  noFiles: {
    hint: 'No files were sent in request data.',
    msg: 'No files found in request data.',
    status: 500,
    type: 'error'
  },
  121: {
    hint: 'Input data is invalid.',
    msg: 'Invalid or duplicated data. Please check the data fields for errors or record duplication.',
    status: 422,
    type: 'error'
  },
  invalidInput: {
    hint: 'Input data is invalid.',
    msg: 'Invalid or duplicated data. Please check the data fields for errors or record duplication.',
    status: 422,
    type: 'error'
  },
  recordExists: {
    hint: 'Collection document already exists in database.',
    msg: 'Document already exists in collection.',
    status: 422,
    type: 'error'
  },
  userExists: {
    hint: 'User already exists in database.',
    msg: 'User already exists. Please login.',
    status: 422,
    type: 'error'
  },
  invalidEmail: {
    hint: 'Invalid email.',
    msg: 'Invalid email address.',
    status: 422,
    type: 'error'
  },
  invalidCredentials: {
    hint: 'Invalid login credentials.',
    msg: 'Authentication failed. Please check your login credentials.',
    status: 422,
    type: 'error'
  },
  failedLogin: {
    hint: 'Incorrect login credentials.',
    msg: 'Authentication failed. Please check your login credentials.',
    status: 401,
    type: 'error'
  },
  redundantLogin: {
    hint: 'User already logged in.',
    msg: 'User is already logged in!',
    status: 403,
    type: 'warning'
  },
  noLogout: {
    hint: 'Logout failed at controller.',
    msg: 'Logging out failed. You are no longer signed in.',
    status: 403,
    type: 'error'
  },
  redundantLogout: {
    hint: 'User token not found in request to logout.',
    msg: 'User is already logged out!',
    status: 403,
    type: 'warning'
  },
  restricted: {
    hint: 'User does not have sufficient admin privileges.',
    msg: 'Access denied!',
    status: 403,
    type: 'error'
  },
  noAuth: {
    hint: 'JWT token is expired or invalid for user.',
    msg: 'Unauthorized access!',
    status: 401,
    type: 'error'
  },
  noToken: {
    hint: 'JWT authorization token was not set.',
    msg: 'Access denied!',
    status: 403,
    type: 'error'
  },
  noRecord: {
    hint: 'Record is missing in database. Likely an incorrect identifier.',
    msg: 'Record not found!',
    status: 403,
    type: 'error'
  },
  PDFCorrupted: {
    hint: 'PDF attachments have data corruption, encryption or other errors',
    msg: 'Your PDF attachments are corrupted or incompatible with this system. Please save your PDFs again and resave this nomination.',
    status: 422,
    type: 'error'
  },
  maxDraftsExceeded: {
    hint: 'Maximum number of drafts allowed for user.',
    msg: 'You have reached the maximum number of draft nominations for your account.',
    status: 422,
    type: 'error'
  },
  alreadySubmitted: {
    hint: 'Nomination has submitted status.',
    msg: 'Cannot update a submitted nomination.',
    status: 422,
    type: 'error'
  },
  EEXIST: {
    hint: 'NodeJS Filesystem Error: file already exists, createWriteStream / copyfile failed.',
    msg: 'The attached file already exists in the library. Please rename the file before uploading.',
    status: 500,
    type: 'error'
  },
  ENOENT: {
    hint: 'NodeJS Filesystem Error: ENOENT: no such file or directory, unlink failed.',
    msg: 'Request could not be completed: No such file or directory found.',
    status: 500,
    type: 'error'
  },
  notFound: {
    hint: 'Route is not implemented in the router.',
    msg: 'Requested route not found.',
    status: 404,
    type: 'error'
  },
  overMaxSize: {
    hint: 'File size (non-images).',
    msg: 'Maximum upload size exceeded for non-image (> 1GB).',
    status: 500,
    type: 'error'
  },
};


/**
 * Helper function to interpret error code.
 *
 * @private
 * @param {Error} err
 */

function decodeError(err = null) {

  // dereference error data
  const { message='', code='' } = err || {};

  // Check for Postgres error codes
  const key = code ? code : message ? message : err;

  return errors.hasOwnProperty(key) ? errors[key] : errors.default;
}

/**
 * Global error handler.
 *
 * @public
 * @param err
 * @param req
 * @param res
 * @param next
 */

exports.globalHandler = function (err, req, res, next) {
  const e = decodeError(err);
  // send response
  res.status(e.status).json(
      {
        view: e.status,
        message: {
          msg: e.msg,
          type: e.type
        }
      }
  );
  const timestamp = new Date();
  logger.error(`[ERROR] ${e.status} | ${e.msg} ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} ${timestamp}`);
  logger.error(`Details:\n\n${err}\n\n`);
}

/**
 * Global page not found (404) handler. Assume 404 since
 * no middleware responded.
 *
 * @public
 * @param req
 * @param res
 */

exports.notFoundHandler = function (req, res) {
  res.status(404).json(
      {
        view: 'notFound',
        message: {
          msg: errors.notFound.msg,
          type: 'error'
        }
      }
  );
  const timestamp = new Date();
  logger.error(`[NotFound] 404 | ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} ${timestamp}`);
}

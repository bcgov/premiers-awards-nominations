/*!
 * Premier's Awards admin web application
 * File: app.js
 * Copyright(c) 2022 BC Gov
 * MIT Licensed
 */

'use strict';

const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const cors = require('cors');
const {notFoundHandler, globalHandler} = require('./error');
const cookieParser = require('cookie-parser');
const {requestLogger} = require('./logger');
require('dotenv').config();

/**
 * Express Security Middleware
 *
 * Hide Express usage information from public.
 * Use Helmet for security HTTP headers
 * - Strict-Transport-Security enforces secure (HTTP over SSL/TLS)
 *   connections to the server
 * - X-Frame-Options provides clickjacking protection
 * - X-XSS-Protection enables the Cross-site scripting (XSS)
 *   filter built into most recent web browsers
 * - X-Content-Type-Options prevents browsers from MIME-sniffing
 *   a response away from the declared _static-type
 *   Content-Security-Policy prevents a wide range of attacks,
 *   including Cross-site scripting and other cross-site injections
 *
 *   Online checker: http://cyh.herokuapp.com/cyh.
 */

// initialization settings
const nodeENV = process.env.NODE_ENV;
const baseURL = process.env.PA_APPS_BASE_URL;
const appPort = process.env.PA_APPS_ADMIN_PORT || 3000;
const apiURL = process.env.PA_APPS_API_URL;
const appURL = process.env.PA_APPS_ADMIN_URL;

// configure CORS allowed hostnames
const allowedOrigins = [baseURL, appURL, apiURL];

const corsConfig = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not " +
        "allow access from the specified origin: \n" + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/**
 * Frontend application (Vue) server
 */

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use(history());

// parse cookies to store session data
app.use(cookieParser(process.env.COOKIE_SECRET));

// initialize frontend routes
app.use('/', express.static(path.join(__dirname, 'dist')));

// log requests
app.use(requestLogger);

// handle generic errors
app.use(globalHandler);

// handle 404 errors
app.use(notFoundHandler);

// Run API server
app.listen(appPort, () => {
  console.log(`============================================`);
  console.log(`App running on port ${appPort}.`);
  console.log('\t- Serving build at ', path.join(__dirname, 'dist'));
  console.log(`\t- Node environment: ${nodeENV}`);
  console.log(`\t- Available on a web browser at: ${appURL}`);
  console.log(`\t- API available at: ${apiURL}`);
  console.log(`\t- Allowed origins:`, allowedOrigins.join(', '));
  console.log(`============================================`);
});

// expose application
exports.app = app;

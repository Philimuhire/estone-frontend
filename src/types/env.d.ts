/**
 * Build-time values injected by webpack's DefinePlugin (see webpack.config.js).
 * Only the keys declared here exist at runtime — there is no real `process` in the browser.
 */
declare const process: {
  env: {
    API_BASE_URL: string;
    GOOGLE_CLIENT_ID: string;
  };
};

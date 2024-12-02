const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://www.infostructure.com.s3-website-us-east-1.amazonaws.com/', 
    chromeWebSecurity: false,
  },
});

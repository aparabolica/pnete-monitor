require('dotenv').load();

/*
 * Database config
 */
var dbOptions = {
  connector: "memory"
}

if (process.env.NODE_ENV != 'test') {
  dbOptions = {
    connector: "mongodb",
    url:
      process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.MONGODB_URI ||
      'mongodb://localhost/pnete-dev'
  }
}

/*
 * Storage config
 */
var storage = {
  name: "storage",
  connector: "loopback-component-storage",
  provider: "filesystem",
  root: "./server/storage",
  maxFileSize: "52428800",
  getFilename: function(fileInfo) {
    return Date.now().toString() + '-' + fileInfo.name;
  }
}

/*
 * Export settings
 */
module.exports = {
  db: dbOptions,
  storage: storage,
  emailDs: {
    name: "emailDs",
    connector: "mail",
    transports: [
      {
        type: "smtp",
        host: process.env.EMAIL_SMTP_HOST || "smtp.yourserver.org",
        secure: true,
        port: 465,
        tls: {
          "rejectUnauthorized": false
        },
        auth: {
          user: process.env.EMAIL_USER || "youruser",
          pass:  process.env.EMAIL_PASSWORD || "yourpass",
        }
      }
    ]
  }
}

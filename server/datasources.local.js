require('dotenv').load();

/*
 * Database config
 */
var dbOptions = {
  connector: "mongodb",
  url: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        process.env.MONGODB_URI ||
        'mongodb://localhost/pnete-dev'
};

// user memory for testing
if (process.env.NODE_ENV == 'test') {
  dbOptions = {
    connector: "memory"
  }
}

/*
 * Export settings
 */
module.exports = {
  db: dbOptions,
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

require('dotenv').load();

module.exports = {
  db: {
    connector: "mongodb",
    url: process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.MONGODB_URI ||
          'mongodb://localhost/pnete-dev'
  },
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

// ,

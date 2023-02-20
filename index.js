const { exec } = require('child_process');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'desarrollo@sipcommbsas.com',
    pass: 'yexjkbltayxgijjm'
  }
});

const email_to = [
    //"dbarreto@sipcommbsas.com",
    "desarrollo@sipcommbsas.com"
]

const servers = [
    "200.7.98.61",
    //"200.7.102.181",
    "200.7.102.131",
]

setInterval(() => {
    console.log("Starting monitor")
    servers.forEach(i => {
        console.log("ping to " + i);
        const mailOptions = {
            from: '"Server Monitoring" <desarrollo@sipcommbsas.com>',
            to: email_to.join(","),
            subject: 'Server Down Alert',
            text: 'Your server ' + i + ' is down. Please take a look.'
          };

        exec('ping ' + i, (error, stdout, stderr) => {
            if (error) {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log("down " + i);
                console.log('Message sent: %s', info.messageId);
              });
            }
        });
    });
},600000
)
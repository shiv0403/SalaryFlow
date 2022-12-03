const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "salaryflow420@gmail.com",
    pass: "Testing@123",
  },
});

let mailDetails = {
  from: "salaryflow420@gmail.com",
  to: "shiv0403gupta@gmail.com",
  subject: "Test mail",
  text: "Node.js testing mail for GeeksforGeeks",
};

mailTransporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.log("Error Occurs");
  } else {
    console.log("Email sent successfully");
  }
});

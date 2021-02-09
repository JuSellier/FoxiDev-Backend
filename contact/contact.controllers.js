const nodemailer = require("nodemailer");

// CONNECTS TO EMAIL PROVIDER
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// SENDS AN EMAIL WITH NODEMAILER
async function nodemailerSend(emailTo, emailSubject, emailContent) {
  console.log("async");
  transporter.sendMail(
    {
      from: "Foxidev.io",
      to: emailTo,
      subject: emailSubject,
      text: emailContent,
    },
    (error, info) => {
      if (error) return console.log(error);
      console.log(info);
      console.log("message sent", info.response);
    }
  );
}

exports.newMessage = (req, res) => {
  console.log(req.body);
  const { name, email, message, phoneNumber } = req.body;

  // NOTIFY SITE MANAGER
  nodemailerSend(
    process.env.EMAIL_USERNAME,
    "New contact from Foxidev.io",
    `New message from Foxidev.io:
    Email: ${email}
    Name: ${name}
    Phone Number: ${phoneNumber}
    Message: ${message}`
  ).catch(console.error);

  // NOTIFY USER
  nodemailerSend(
    email,
    "Thanks for contacting us!",
    `Hi,
      
      I have received your message and will reply as early as possible.
      
      Here's the message I have received:
      Email: ${email}
      Name: ${name || "Not available"}
      Phone Number: ${phoneNumber || "Not available"}
      Message: ${message || "Not available"}
      
      I wish you a great day!`
  ).catch(console.error);

  res.status(200).send("Got it!");
};

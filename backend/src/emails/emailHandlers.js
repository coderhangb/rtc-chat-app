const { resendClient, sender } = require("../libs/resend.js");
const createWelcomeEmailTemplate = require("./emailTemplates.js");

const sendWelcomeEmail = async function (email, name, clientURL) {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to EchoTalk!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Sending welcome email error: ", error);
    throw new Error("Fail to send welcome email");
  }

  console.log(data);
};

module.exports = sendWelcomeEmail;

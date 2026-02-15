require("dotenv").config()
const brevo = require("@getbrevo/brevo")

const apiInstance = new brevo.TransactionalEmailsApi()
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  )

const sendVerificationEmail = async (to, token) => {
    const verifyUrl = `${process.env.APP_URL}/verify-email?token=${token}`

    const emailData = {
      sender: {
        name: "Admin",
        email: process.env.MAILER_DEFAULT_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject: "Account Verification",
      htmlContent: `
        <strong>Welcome!</strong>
        <p>Thank you for signing up. Please click the link below to verify your account:</p>
        <a href="${verifyUrl}" target="_blank">Verify My Account</a>
        <br/><br/>
        <p>If you did not create this account, you can safely ignore this email.</p>
      `,
    };

  try {
    const response = await apiInstance.sendTransacEmail(emailData)
    // console.log("Email sent. Message ID:", response);
    return true
  } catch (error) {
    console.error("Brevo error:", error.response?.body || error)
    return false
  }
}

module.exports = { sendVerificationEmail }
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Create Nodemailer Transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "11111kevinshiroya@gmail.com", // Your email
    pass: "your-app-password", // Use **Google App Password** (not your actual password)
  },
});

// Firebase Cloud Function to Send Email
exports.sendAcknowledgmentEmail = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "11111kevinshiroya@gmail.com", // Your email
      to: data.email, // Send email to the user's entered email address
      subject: `Thanks for Contacting Me, ${data.name}!`,
      text: `Hi ${data.name},\n\nThank you for reaching out! I have received your message:\n\n"${data.message}"\n\nI will get back to you as soon as possible.\n\nBest,\nKevin`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Acknowledgment email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

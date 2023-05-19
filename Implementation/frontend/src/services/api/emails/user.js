import asynchandler from "express-async-handler";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_API}api/sendEmail/`;

const register = asynchandler(async (userData) => {
  userData = {
    ...userData,
    sub: `Welcome to Happy Tails, ${userData.name}!`,
    message: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                }
                h1 {
                    font-size: 20px;
                    margin-bottom: 0;
                }
                ul {
                    margin-top: 0;
                    margin-bottom: 1.5em;
                }
                li {
                    margin-left: 1.5em;
                }
            </style>
        </head>
        <body>
            <h1>Dear ${userData.name},</h1>
            <p>Welcome to our platform! We are excited to have you on board and look forward to working with you.</p>
            <p>Your login details are as follows:</p>
            <ul>
                <li><strong>Email:</strong> ${userData.email}</li>
                <li><strong>Password:</strong> ${userData.password}</li>
            </ul>
            <p>Please keep your login details safe and do not share them with anyone. If you have any questions or concerns, please don't hesitate to contact us.</p>
            <p>Best regards,</p>
            <p>The Happy Tails team</p>
        </body>
    </html>
        `,
  };

  const response = await axios.post(API_URL, userData);

  return response.data;
});

const emailServices = {
  register,
};

export default emailServices;

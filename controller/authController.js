import User from '../models/User.js'
import bcrypt from 'bcrypt'
import sendEmail from '../services/emailSet.js';
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRETKEY

export const registeruser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({
        success: false,
        message: " User already exist!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    })

    await sendEmail(email, 'welcome to SocialConnect',
      `<div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;
      overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

      <tr>
        <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);
          padding:30px;text-align:center;color:white;">
          <h1 style="margin:0;font-size:26px;">SocialConnect</h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
            Connect • Share • Grow
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:30px;color:#333;">
          <h2 style="margin-top:0;">Welcome, ${name} 👋</h2>

          <p style="line-height:1.6;font-size:15px;color:#555;">
            We’re excited to have you join <b>SocialConnect</b>.
            Start connecting with people, sharing posts,
            and exploring communities right away.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="https://yourapp.com"
              style="background:#4f46e5;color:white;text-decoration:none;
              padding:12px 24px;border-radius:6px;font-size:15px;
              font-weight:bold;display:inline-block;">
              Get Started
            </a>
          </div>

          <p style="font-size:13px;color:#888;">
            If you did not create this account, please ignore this email.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f1f3f5;padding:15px;text-align:center;
          font-size:12px;color:#777;">
          © ${new Date().getFullYear()} SocialConnect. All rights reserved.
        </td>
      </tr>

    </table>
  </div>`
    )

    res.status(201).json({
      success: true,
      message: " Data added successfully!",
      data: userData
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "internal server error!"
    })
  }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email!"
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(500).json({
        success: false,
        message: "invalid password!"
      })
    }

    //token generate 
    //const token = await jwt.sign({payload}, SECRETKEY, {options})
    // structure of token => header.payload.signature
    // header => metadata about token, payload=> data, 
    // signature=> secret key + header + payload
    const token = await jwt.sign({ id: userExist._id, name: userExist.name }, SECRET_KEY, {expiresIn:'7d'});

    //response.cookie(name, value, {options})
    res.cookie("mycookie",token,{
        httpOnly: true,
        secure:false,
        sameSite:'lax',
        maxAge: 7*24*60*60*1000
    })

    res.status(200).json({
      success: true,
      message: "Login successfull!",
      token: token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to add User!"
    })
  }
}
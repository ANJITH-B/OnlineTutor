const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const socket = require("socket.io");
const authRouter = require('./routes/authRoutes')
const tutorRouter = require('./routes/tutorRoutes')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const notificationRouter = require('./routes/notificationRoutes')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');
const verifyStatus = require('./middlewares/verifyStatus');
dotenv.config()
const app = express()
app.use(cors({
  credentials: true,
  origin: [process.env.BASE_URL],
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, ('./public'))))
app.use(express.urlencoded({ extended: false }))

app.use(verifyStatus)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/tutor', tutorRouter)
app.use('/admin', adminRouter)
app.use('/notification', notificationRouter)

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connetion Successfull")
}).catch((err) => console.log(err))

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
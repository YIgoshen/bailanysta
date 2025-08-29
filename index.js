import express from "express"
import mongoose from "mongoose"
import multer from "multer";
import cors from "cors";
import { loginValidation, registerValidation, postCreateValidation } from "./validations.js" 
import { UserController, PostController } from "./controllers/index.js"
import { checkAuth, handleValidationErrors } from "./utils/index.js"

// DB
mongoose
.connect("mongodb+srv://USERNAME:PASSWORD@cluster0.j0z8mxp.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('DB OK'))
.catch(err => console.log('DB error', err))

// App  
const PORT = 4444;
const app = express()
app.use(express.json())
app.use(cors())

// Multer-----
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname)
//   },
// })

// const upload = multer({ storage })

// app.use('/uploads', express.static('uploads'))
//----------


// Авторизация------------
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)
// end Авторизация------------


// Post routes------------
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)       //обязательно должны передавать токен, потому что не можем создавать статью без авторизации
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

// tags
// app.get('/posts/tags', PostController.getLastTags)
app.get('/tags', PostController.getLastTags)

// end------------


// Multer route (image upload)------------
// app.patch('/upload', checkAuth, upload.single('image'), () => {
//   res.json({
//     url: `uploads/${requestAnimationFrame.file.originalname}`
//   })
// })
// end-----------



// Server
app.listen(PORT, err => {
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})

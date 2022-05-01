import { Schema, model } from 'mongoose'
// import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
})

export default model('User', UserSchema)

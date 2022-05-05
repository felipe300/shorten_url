import mongoose from 'mongoose'
const { Schema, model } = mongoose

const LinkSchema = new Schema({
  originLink: {
    type: String,
    required: true,
    trim: true
  },
  nanoLink: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export default model('Link', LinkSchema)

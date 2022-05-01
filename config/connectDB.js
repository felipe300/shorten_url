import mongoose from 'mongoose'

try {
  await mongoose.connect(`${process.env.URI_MONGO}`)
  console.log('MongoDB connected 🔗')
} catch (err) {
  console.log(`MongoDB connection error: ${err}`)
}

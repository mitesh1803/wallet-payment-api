import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await hash(this.password, 10)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
// Pre-save hook to hash password
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next()
//   this.password = await hash(this.password, 10)
//   next()
// })

// userSchema.methods.matchPassword = async function (enteredPassword) {
// return await compare(enteredPassword, this.password)
// }
// const User = mongoose.model('User', userSchema)

// export default User
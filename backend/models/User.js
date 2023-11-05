import { Schema, model } from 'mongoose';
import passwordValidator from "password-validator";
import bcrypt from 'bcryptjs';

// Create a schema to validate user password
const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has().letters(1)
  .has().digits(1)
  .has().uppercase(1)
  .not().spaces();
  
// create user schema
const userSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  username: { type: String, required: true, unique: true },

  email: {
    address: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
    },

    verified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },

  password: {
    value: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return passwordSchema.validate(value.trim());
        },
        message: 'Password validation failed'
      },
    },
    resetToken: String,
    resetTokenExpires: Date,
  },
  birthDate: { type: Date, required: true },
  role: {
    type: String,
    enum: ["admin", "user", "moderator"],
    default: "user",
  },
  profilePicture: {
    url: { type: String, default: 'default_avatar_url_here' },
  }
}, {
  timestamps: true,
});


// Remove password and email verification token from user object when sending a response
userSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    if (ret.email) {
      delete ret.email.verificationToken;
      delete ret.email.verificationTokenExpiresAt;
    }

    delete ret.password;

    return ret;
  }
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password.value")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password.value = await bcrypt.hash(this.password.value, salt);
  next();
});

// Compare password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password.value);
};


const User = model("User", userSchema);

export default User;

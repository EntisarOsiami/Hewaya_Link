import mongoose from "mongoose";
import passwordValidator from "password-validator";
import bcrypt from 'bcryptjs';

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length of 8 characters
  .is()
  .max(50) // Maximum length of 30 characters
  .has()
  .letters() // Must have at least one letter
  .has()
  .digits() // Must have at least one digit
  .has()
  .uppercase() // Must have at least one
  .not()
  .spaces(); // Cannot contain spaces

const userSchema = mongoose.Schema(
  {
    Name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          
          const validationResult = passwordSchema.validate(value, { list: true });

          
          if (validationResult.length > 0) {
            const failedCriteria = validationResult.join(', ');
            sendResponse(res, null, "New password does not meet the validation criteria. Failed criteria: " + failedCriteria, false);
            return false; 
          }
          
          return true;
        },
      },
    },
    birthDate: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

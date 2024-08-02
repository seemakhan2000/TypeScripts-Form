import mongoose, { Schema, Document } from 'mongoose';

interface ILogin extends Document {
  name: string;
  email: string;
  password: string;
}

const loginSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LoginModel = mongoose.model<ILogin>('Login', loginSchema);
export default LoginModel;

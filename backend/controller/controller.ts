import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ReactModel from '../models/schema';
import signupModel from '../models/signUp';
import loginModel from '../models/loginSchema';

export const getData = async (req: Request, res: Response): Promise<void> => {
  const result = await ReactModel.find();
  res.json(result);
};

export const postData = async (req: Request, res: Response): Promise<void> => {
  const formData = req.body;
  const savedFormData = await ReactModel.create(formData);
  console.log('Received Form Data:', formData);
  res.json({ message: 'Welcome to my form' });
};

export const deleteData = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const deletedData = await ReactModel.findByIdAndDelete(id);
  res.json({ message: 'Data deleted successfully', deletedData });
};

export const updateData = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const updatedData = req.body;
  const updatedDocument = await ReactModel.findByIdAndUpdate(id, updatedData, { new: true });
  res.json({ message: 'Data updated successfully', updatedDocument });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await loginModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await signupModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new signupModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const newLoginUser = new loginModel({
      username,
      email,
      password: hashedPassword,
    });

    await newLoginUser.save();

    res.status(201).json({ message: 'Signup data successfully' });
  } catch (error: any) {
    console.error('Error:', error.message);

    if (error.message.includes('bcrypt')) {
      res.status(500).json({ message: 'Error hashing password' });
      return;
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const protectedRoute = (req: Request, res: Response): void => {
  res.send('Protected data');
};

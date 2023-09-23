import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, Process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', 
      sameSite: 'none', 
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error('Error generating JWT token:', error);
  }
};

export default generateToken;

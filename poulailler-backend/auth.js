// auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const users = [
  { username: 'admin', passwordHash: bcrypt.hashSync('admin123', 10) }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
  res.json({ token });
});

export default router;


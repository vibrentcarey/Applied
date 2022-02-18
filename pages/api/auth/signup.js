import { data } from 'autoprefixer'
import { hash } from 'bcrypt'
import { connectToDatabase } from '../../../lib/mongodb'

// Hash password using bcrypt
async function hashPassword(password) {
  return await hash(password, 12);
}

async function handler(req, res) {
  const data = req.body
  const { email, password } = data

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ email: email })
  if (user) {
    res.status(422).json('User already exists')
    return
  }

  await db.collection('users').insertOne({
    email,
    password: await hashPassword(password)
  })
  res.status(201).json('created user')
}

export default handler
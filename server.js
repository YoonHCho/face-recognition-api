import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

// to connect the server to database
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'Shydow123!',
    database: 'faceRec'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt));
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => handleProfile(req, res, db));
app.put('/image', (req, res) => handleImage(req, res, db));
app.post('/imageurl', (req, res) => handleApiCall(req, res));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

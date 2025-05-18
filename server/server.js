const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
require('dotenv').config();

const port = process.env.PORT

//middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // or whatever your frontend runs on
  credentials: true,
}));


//routing
app.use('/api/auth', require('./routes/auth.route'))

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// home route
app.get('/', (req, res) => {
    res.send(`
    <h1>Hello, Gamer!</h1>
    <p>So, you are a gamer with some tech skills right!</p>
    <a href="${process.env.FRONTEND_URL}">Go to frontend</a>
  `);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load env variables

const app = express();

app.use(cors()); //Allow frontend to hit backend
app.use(express.json()); // To accept JSON in req.body

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
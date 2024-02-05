const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


const fileController = require('./Controllers/filesController');
app.use('/api', fileController)


app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
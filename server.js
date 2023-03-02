const express = require('express');
const app = express();
const connectDB = require('./config/db');


// this is good to use for Heroku deployment to get the port
const PORT = process.env.PORT || 5000;

//Connect to dataBase
connectDB();


//initializing middleware
//we used to have to install body-parser, but now it is
//  a built-in middleware function of express It parses incoming JSON payloads

app.use(express.json({extended: false}));

app.get('/',(req,res)=>res.send());


app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

app.listen(
    PORT, () => console.log(`Server started on port ${PORT}`)
)
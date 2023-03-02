const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const config = require('config');
const db = config.get('mongoDB_URI');

const connectDB = async() => {
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        //    useCreateIndex: true,
        //    useFindAndModify: false
        });
        console.log(`MongoDb Connected Successfully`);
    }catch(err){
        console.log(err.message);
        //exit process with our a failure code
        process.exit(1);
    }
    
};

module.exports = connectDB
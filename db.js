const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"    
// const mongoURI = "mongodb://localhost:27017"


const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully")
    })
}

// mongoose.connect(
//     process.env.MONGO_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//     () => {
//       console.log('Connected to MongoDB');
//     }
//   );

module.exports = connectToMongo;
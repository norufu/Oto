const mongodb = require("mongodb");
require("dotenv").config();
// https://stackoverflow.com/questions/11330917/how-to-play-a-mp3-using-javascript
class Db {
    constructor() {
        this.db;
    }
    async connectDB() {
      const client = await mongodb.MongoClient.connect(
        process.env.DB_CONNECT_STRING,
        {
          useNewUrlParser: true
        }
      );
    console.log("db is loaded");
    this.db = client.db('Test').collection("TestingIndexes");
    return("yes")
    }

    async searchWord(searchTerm) {
      let audioData = (await this.db.find({quote: {$regex: searchTerm, $options : 'gi'}}).toArray())
      audioData = audioData.slice(0,4) //limit # of calls we'll make for audio
      return(audioData)
    }
} 

module.exports = Db;

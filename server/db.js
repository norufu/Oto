const mongodb = require("mongodb");
require("dotenv").config();
const sanitize = require('mongo-sanitize');

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
      let cleanSearch = sanitize(searchTerm);

      let audioData = (await this.db.find({quote: {$regex: cleanSearch, $options : 'gi'}}).limit(10).toArray())

      if(audioData.length == 0) { //if no japanese was found may be searching english, check translations
        audioData = (await this.db.find({translation: {$regex: cleanSearch, $options : 'gi'}}).limit(10).toArray())
      }
      // audioData = audioData.slice(0,5) //limit # of calls we'll make for audio
      return(audioData)
    }
} 

module.exports = Db;

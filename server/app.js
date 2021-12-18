const express = require("express");
const Db = require("./db");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const AWS = require('aws-sdk')
require("dotenv").config();



const db = new Db();
console.log(db.connectDB());

const app = express();
if (process.env.NODE_ENV === 'production') {
 	app.use(express.static('oto\build'));
  app.get('*', (request, response) => {
   console.log("getting *")
 	 response.sendFile(path.join('../src/views', 'Home.vue'));
  });
}
else {
   app.use(express.static('C:\Users\Joshua\Desktop\sentence site\oto\public'))
}
const router = express.Router();
// middleware
app.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Configure client for use with Spaces
// const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
// const s3 = new AWS.S3({
//     endpoint: spacesEndpoint,
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY
// });

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// Add a file to a Space
router.get("/uploadWordData", async (req, res) => {
    console.log('test')
    loadInFiles();
    res.status(200).send();
});

router.get("/idk", async (req, res) => {
  console.log('ok');
  console.log(req.query);
  await db.test();
  res.sendStatus(200);
});

router.get("/searchWord", async (req, res) => {
    console.log("searching words")
    if(req.query.searchTerm == undefined) {
        return res.status(400).send({
            message: 'Invalid search term!'
        });    
    }
    // http://localhost:3000/static/3-gatsu_no_Lion_01_0.01.53.927-0.01.57.680.wav
    r = await db.searchWord(req.query.searchTerm);

    //S3 Bucket setup for digitalocean
    // let files = []
    // for(let i = 0; i < r.length; i++) {
    //   files.push(r[i].file)
    // }
    // let audioData = []
    // for(let i = 0; i < r.length; i++) {
    //   audioData[i] = getAudio(r[i].file)
    // }
    // console.log('AUDIO DATA\n\n ')
    // await Promise.allSettled(audioData).then(function(results){
    //   console.log(results)
    //   for(let i = 0; i < results.length; i++){
    //     r[i].data = results[i].value;
    //   }
    // })
    console.log(r)
    res.send(r);
});

async function getMultipleAudio(files) {
  returnData = []
  for(let i = 0; i < files.length; i++) {
    returnData[i] = getAudio(files[i])
  }
  return(returnData)
}

async function getAudio(filename) {
  console.log('oh boy s3')
  let params = {Bucket: "oto", Key: "gatsu/" + filename};
  return s3.getObject(params).promise()
  .then(function (data){
    return(data.Body);
  });
  // return(rval)
}
// https://stackoverflow.com/questions/66993311/trying-to-retrieve-an-mp3-file-stored-in-aws-s3-and-load-it-into-my-react-client
router.get("/bucketTest", async (req, res) => {
    console.log('bucket test')
    s3.getObject(
        { Bucket: "oto", Key: "3-gatsu_no_Lion_01_0.01.53.927-0.01.57.680.wav"}
      ).then((response) => response.json())
      .then((data) => {
        return(data.Body)
      });
})

// router.get("/bucketTest", async (req, res) => {
//     console.log('bucket test')
//     s3.getObject(
//         { Bucket: "oto", Key: "3-gatsu_no_Lion_01_0.01.53.927-0.01.57.680.wav"},
//         function (error, data) {
//           if (error != null) {
//             console.log("Failed to retrieve an object: " + error);
//           } else {
//             res.send(data)
//             console.log("Loaded " + data.ContentLength + " bytes");
//           }
//         }
//       );
//     // console.log(fileTest)
// })

const port = process.env.PORT || 5000;
console.log(port)
app.use(router);
app.listen(port, () => console.log('Server started on port ${port}'));

const upload = require("../middleware/upload.js");
const dbConfig = require("../config/db.config.js");
const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const baseUrl = `http://localhost:5000/files`;


const uploadFiles = async(req, res) => {
    try{
        await upload(req, res);
        if(req.file === undefined){
            return res.status(405).send({
                message: "You must pick a file"
            })
        }
        let imgUrl = `${baseUrl}/${req.file.filename}`;

        return res.status(200).send({
            message: "File has been succesfully uploaded",
            imgUrl: imgUrl  
        });     
    } 
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
};

// const fs = require("fs");
// const path = require("path");
// const Photo = require("../models/photo.model.js")

// const uploadFiles = (req, res, next) => {
//     var obj = {
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     Photo.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// };

// const getListFiles = async(req, res) => {
//     try {
//         await mongoClient.connect();
//         const database = mongoClient.db(dbConfig.DB);
//         const images = database.collection(dbConfig.PHOTOBUCKET + ".files");
//         const cursor = images.find({
//             // Filter cari  UserId
//         });
//         if((await cursor.count()) === 0){
//             return res.status(500).send({
//                 message: "No Files Found !"
//             })
//         }
//         let fileInfos = [];
//         await cursor.forEach((doc) => {
//             fileInfos.push({
//                 name: doc.filename,
//                 url: base + doc.filename,
//             });
//         });
//         return res.status(200).send(fileInfos);
//     } catch(err){
//         return res.status(500).send({message : err});
//     }
// }

// const uploadFiles = async (req, res) => {
//     try{
//         if(req.files === undefined){
//             return res.status(405).send({
//             message: "You must pick a file"
//             });
//         }

//         let photoUrl = `${baseUrl}/${req.file.filename}`;
        
//         return res.status(200).send({
//             message: "File has been succesfully uploaded",
//             imgUrl: photoUrl  
//         });
//     } catch(err) {
//         return res.status(500).send({
//             message: err.message,
//         });
//     }
// }

module.exports = { uploadFiles }
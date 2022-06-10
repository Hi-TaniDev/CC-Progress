const { upload } = require("../middleware/upload.js");
const dbConfig = require("../config/db.config.js");
const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const baseUrl = `http://localhost:5000/files`;

const MongoClient = require("mongoose").mongo.MongoClient;
const mongoClient = new MongoClient(dbUrl);

const uploadFiles = async(req, res) => {
    try{
        await upload.uploadFilesMiddleware(req, res);
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

const getListFiles = async(req, res) => {
    try {
        await mongoClient.connect();
        const database = mongoClient.db(dbConfig.DB);
        const images = database.collection(dbConfig.PHOTOBUCKET + ".files");
        const cursor = images.find({
            "metadata.userId" : req.cookies.userId
        });
        if((await cursor.count) === 0){
            return res.status(500).send({
                message: "No Files Found !"
            })
        }
        let fileInfos = [];
        await cursor.forEach((doc) => {
            fileInfos.push({
                name: doc.filename,
                url: baseUrl + doc.filename,
                userId : doc.metadata.userId
            });
        });
        return res.status(200).send(fileInfos);
    } catch(err){
        return res.status(500).send({message : err.message});
    }
}

const uploadController = { uploadFiles, getListFiles };

module.exports = { uploadController };
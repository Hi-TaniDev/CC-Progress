const { upload } = require("../middleware/upload.js");
const dbConfig = require("../config/db.config.js");
const GridFSBucket  = require("mongodb").GridFSBucket;
// const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const dbUrl = `${dbConfig.HOST}`;
const baseUrl = `https://hitani.et.r.appspot.com/files`;

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
        const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.PHOTOBUCKET,
        });
        await cursor.forEach((doc) => {
            fileInfos.push({
                name: doc.filename,
                url: `${baseUrl}/${doc.filename}`,
                userId : doc.metadata.userId
            });
        });
        return res.status(200).send(fileInfos);
    } catch(err){
        return res.status(500).send({message : err.message});
    }
}

const downloadFile = async (req, res) => {
    try{
        await mongoClient.connect();
        const database = mongoClient.db(dbConfig.DB);
        const bucket = new GridFSBucket(database, {
            bucketName: dbConfig.PHOTOBUCKET,
        });
        let downloadStream = bucket.openDownloadStreamByName(req.params.name);
        downloadStream.on("data", function(data){
            return res.status(200).write(data);
        });
        downloadStream.on("error", function (err) {
            return res.status(404).send({ message: "Cannot download the Image!" });
        });
        downloadStream.on("end", () => {
            return res.end();
        });
    } catch(error) {
        return res.status(500).send({
            message : error.message
        });
    }
};

const uploadController = { uploadFiles, getListFiles, downloadFile };

module.exports = { uploadController };
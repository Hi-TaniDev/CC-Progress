const allAccess = (req, res) => {
    res.status(200).send({message: "This is public content"});
}

const userAccess = (req, res) => {
    res.status(200).send({message: "This is user content"});
}

const userController = { allAccess, userAccess };

module.exports = { userController };


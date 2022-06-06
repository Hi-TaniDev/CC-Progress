exports.allAccess = (req, res) => {
    res.status(200).send({message: "This is public content"});
}

exports.userAccess = (req, res) => {
    res.status(200).send({message: "This is user content"});
}


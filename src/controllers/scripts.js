const SECRET = process.env.SECRET

const jwt = require("jsonwebtoken");

const TokenVerifier = (header = "") => {
    const token = header.split(" ")[1];
    if (!token) {
        return true;
    };
    const acesso = jwt.verify(token, SECRET, function (error) { return error });
    if (acesso) {
        return true;
    };
    return false;
};

module.exports = {
    TokenVerifier,
};
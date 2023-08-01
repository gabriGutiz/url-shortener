
function auth(req, res, next) {
    if (!req.headers?.authorization) return res.status(401).send("Unauthorized!");

    const authInput = req.headers.authorization;
}
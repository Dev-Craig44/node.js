function authenticator(req, res, next) {
    const isAuthorized = req.headers.authorization === 'youABum';
    if (isAuthorized) {
        next();
    } else {
        res.status(403).send('Not Authorized...')
    }
};

export { authenticator };
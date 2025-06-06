function authenticator(req, res, next) {
    console.log('Authenticating...');
    next();
};

export { authenticator };
const home = function(req, res) {
    return res.status(200).send('Basic Application');
};


module.exports = {
    home,
};

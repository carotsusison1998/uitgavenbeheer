const getAll = (req, res, next) => {
    return res.status(200). json({
        message: 'you request to get page product'
    })
}

module.exports = {
    getAll
}
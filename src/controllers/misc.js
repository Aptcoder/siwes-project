const { createPresignedUrl } = require('../utils/aws')

const createFileUploadURL = async (req, res) => {
    const { filename } = req.body
    const url = await createPresignedUrl(filename)
    return res.send({
        success: true,
        message: 'Presigned url generated',
        data: {
            url,
        },
    })
}

module.exports = {
    createFileUploadURL,
}

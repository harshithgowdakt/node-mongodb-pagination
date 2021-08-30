const express = require('express')
const mongoOp = require("./mongo")
const { getDb } = require('./mongodb')
const app = express()
const router = express.Router()

router.get('/users', async (req, res) => {
    try {
        let pageNo = parseInt(req.query.pageNo)
        let size = parseInt(req.query.size)
        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response)
        }
        const skip = size * (pageNo - 1)

        let db = await getDb();
        let totalCount = await db.collection('users').find({}).count();
        let users = db.collection('users').find({}).limit(size).skip(skip);

        let totalPages = Math.ceil(totalCount / size);
        res.json({ "error": false, "message": users, "pages": totalPages });
    } catch (error) {
        res.json({ "error": true, "message": JSON.stringify(error) });
    }
})

app.use('/api', router)
app.listen(3000)
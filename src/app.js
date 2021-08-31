const express = require('express')
const { getDb } = require('./mongodb')
const app = express()
const router = express.Router()
let db;

router.get('/users', async (req, res) => {
    try {
        let pageNo = parseInt(req.query.pageNo)
        let size = parseInt(req.query.size)
        if (pageNo < 0 || pageNo === 0) {
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(JSON.stringify(response))
        }
        const skip = size * (pageNo - 1)

        let totalCount = await db.collection('users').find({}).count();
        let users = await db.collection('users').find({}).sort({ _id: 1 }).limit(size).skip(skip).toArray();

        let totalPages = Math.ceil(totalCount / size);
        res.json({ "error": false, "message": users, "pages": totalPages });
    } catch (error) {
        res.json({ "error": true, "message": JSON.stringify(error) });
    }
})

getDb()
    .then((dbObject) => {
        db = dbObject
        app.use('/api', router)
        app.listen(3000, () => console.log('server listening on port on 3000'));
    })
    .catch((error) => {
        console.log(error);
    })


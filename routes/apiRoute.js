const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

module.exports = router

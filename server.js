const express = require('express')
const path = require('path')
const app = express()
const port = 3000


app.use((req, res, next) => {
    res.set("Cache-Control", "no-store")
    next()
}, express.static(path.join(__dirname, 'public')))
app.listen(port, () => console.log(`listening on port ${port}`))

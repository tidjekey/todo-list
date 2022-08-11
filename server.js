const express = require('express');

const PORT = process.env.PORT || 3000;

const app = new express();

app.use(express.static('src'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
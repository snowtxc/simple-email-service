const express = require("express");
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json())

const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
        user: process.env.FROM,
        pass: process.env.KEY,
    },
});



app.post("/sendEmail", function (req, res) {
    const body = req.body;
    const { name, email, message} = body;
    const mailOptions = {
        from: process.env.FROM,
        to: process.env.TO,
        subject: `Nuevo email entrante de ${email}`,
        text: `Mensaje de ${name}: ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            res.send({message: "Email enviado correctamente"});
        }
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
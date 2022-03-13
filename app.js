const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const app = express();

const port = 8080;

mongoose.connect("mongodb://localhost:27017/JavaStudyDB", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

const databaseSchema = {
    name: {
        type: String,
        required: true
    },
    jawaban:{
        type: String,
        required: true
    }
};

const JavaStudyDB = mongoose.model("data", databaseSchema);

app.get("/halamanLogin", (req, res) => {
    res.render("halamanLogin");
});

app.get("/homePage", (req, res) => {
    res.render("homePage");
});

app.get("/halamanSukses", (req, res) => {
    res.render("halamanSukses");
});

app.post("/homePage", (req, res) => {
    var nama = req.body.nama;
    
    res.render("homePage", {name: nama});
});

app.post("/halamanSukses", (req, res) => {

    var nama = req.body.nama;

    const soal1 = new JavaStudyDB({
        name: nama,
        jawaban: req.body.soal1
    });
    
    const soal2 = new JavaStudyDB({
        name: nama,
        jawaban: req.body.soal2
    });
    
    const soal3 = new JavaStudyDB({
        name: nama,
        jawaban: req.body.soal3
    });
    
    const soal4 = new JavaStudyDB({
        name: nama,
        jawaban: req.body.soal4
    });
    
    const soal5 = new JavaStudyDB({
        name: nama,
        jawaban: req.body.soal5
    });

    const kumpulanJawaban = [soal1, soal2, soal3, soal4, soal5];

    JavaStudyDB.insertMany(kumpulanJawaban, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully saved default items to database.");
        }
    });

    res.render("halamanSukses", {name: nama});
});

app.listen(port,() => console.log(`Server started at http://localhost:${port}/halamanLogin`));
const admin = require("firebase-admin");
const fs = require("fs");
const { parse } = require("svgson");

const serviceAccount = require("./properties/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://interactive-seating-map-default-rtdb.firebaseio.com"
});

const db = admin.database();
const ref = db.ref();

ref.set({"it": "works"});

var row = ["A", "B", "C", "D"];
var rowIndex = 1;
var seats = [];
var data = "";

function seatGenerator(rowSize, rowLetter) {
    while(rowIndex < rowSize) {
        seats.push(rowLetter + rowIndex);
        rowIndex++;
    }
    rowIndex = 1;
}

row.map(row => {
    switch(row) {
        case "A":
            seatGenerator(15, row);
            break;
        case "B":
            seatGenerator(15, row);
            break;
        case "C":
            seatGenerator(15, row);
            break;
        case "D":
            seatGenerator(15, row);
            break;
        default:
            console.log(seats);
    }
});

console.log(seats);

var readStream = fs.createReadStream("./assets/Pie.svg", "utf-8");

readStream.on("data", chunk => {
    data += chunk
}).on('end', () => {
    parse(data).then(json => {
        svg = json
        let result = svg.children.filter(item => item.name === 'rect')
        for(let i = 0; i < result.length; i++){
                result[i].seat = seats[i]
                result[i].chosen = false
                result[i].attributes.height = Number(result[i].attributes.height)
                result[i].attributes.width = Number(result[i].attributes.width)
                result[i].attributes.x = Number(result[i].attributes.x)
                result[i].attributes.y = Number(result[i].attributes.y)
           }
       console.log(result)
       ref.set(result);
    })
    .catch((err) => console.log(err))
})
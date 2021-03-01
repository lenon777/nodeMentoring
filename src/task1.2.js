const fs = require("fs");
const csv = require("csvtojson");
const csvFilePath = "./csv/nodejs-hw1-ex1.csv";

export const readFile = () => {
  const readStream = fs.createReadStream(csvFilePath);
  const writable = fs.createWriteStream("./src/my.txt", "utf8");

  readStream.on('error', () => {
    console.log(err)
  })

  writable.on('error', () => {
    console.log(err)
  })
  readStream
    .pipe(csv())
    .on("error", (err) => console.log(err))
    .pipe(writable)
};

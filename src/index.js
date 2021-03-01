import { readFile } from "./task1.2.js";
import { startReverse } from "./task1.1.js";

console.log("Press 1 to run task 1.1");
console.log("Press 2 to run task 1.2");

process.stdin.on("readable", function () {
  var chunk = process.stdin.read();
  if (chunk !== null && chunk.toString() == "1\r\n") {
    startReverse();
  } else if (chunk !== null && chunk.toString() == "2\r\n") {
    readFile();
  }
});

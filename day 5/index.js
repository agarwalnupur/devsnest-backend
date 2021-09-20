const fs = require('fs');
fs.writeFileSync('hello.txt',"Writing content in file ");
const content = fs.readFileSync('./hello.txt','utf8')
console.log(content);
fs.appendFileSync('./hello.txt','This is the appended text');
fs.renameSync('./hello.txt','renamedhello.txt');

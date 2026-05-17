const fs = require('fs');
const http = require('http');

http.get("http://localhost:3845/assets/7404569517a1e8cb9be9d59262f0e4973af0e754.svg", (res) => {
  const file = fs.createWriteStream("public/assets/imgGroup34402.svg");
  res.pipe(file);
});

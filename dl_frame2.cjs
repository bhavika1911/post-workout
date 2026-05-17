const fs = require('fs');
const http = require('http');

http.get("http://localhost:3845/assets/203fbcad5e894512ec755c90c760535ce83b50c1.svg", (res) => {
  const file = fs.createWriteStream("public/assets/imgFrame2.svg");
  res.pipe(file);
});

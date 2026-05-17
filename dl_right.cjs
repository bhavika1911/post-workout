const fs = require('fs');
const http = require('http');

const downloadFile = (url, path) => {
  http.get(url, (res) => {
    const file = fs.createWriteStream(path);
    res.pipe(file);
  });
};

downloadFile("http://localhost:3845/assets/1256418be19331e44b113659be080da5d3fb8e07.svg", "public/assets/imgEllipse37.svg");
downloadFile("http://localhost:3845/assets/6a9935b973bdf842dafad04bee4bc2f237eb157a.svg", "public/assets/imgGroup34404.svg");
downloadFile("http://localhost:3845/assets/b45f32ebda6a4a8f7d5f19288d83b9ff7dc9319b.svg", "public/assets/imgGroup34403.svg");

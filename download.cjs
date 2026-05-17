const fs = require('fs');
const http = require('http');

const urls = [
  "http://localhost:3845/assets/623faa04512bd4da554dde30ad3dd6ceb9c96bfb.svg",
  "http://localhost:3845/assets/d89b68faf9c22c0e3b82c6aa009cf1eacde14662.svg",
  "http://localhost:3845/assets/debe23b2840db069a9297112ca402b8195a597f8.svg",
  "http://localhost:3845/assets/7fbae7c85a8169895754aad954e523f69c650bc0.svg",
  "http://localhost:3845/assets/009c3fc1dd964ae8bc7a9569924d063cba248460.svg",
  "http://localhost:3845/assets/1d9c51df0a62aa768ef71690d2d22a8957d23bb0.svg",
  "http://localhost:3845/assets/dacf61c5e0c96a1bee12bd44a3e8a0296889e384.svg",
  "http://localhost:3845/assets/69f7194ee0ad28769021137cb589dfb8fb917efe.svg",
  "http://localhost:3845/assets/eb270d943434503eae3e3bb895e3801ed7c60352.svg",
  "http://localhost:3845/assets/4347b33cdb213b004107093ef4cfd240bc0ff015.svg",
  "http://localhost:3845/assets/9724125ff5d1b95d3fd75cdd5182b0814b13fd1e.svg",
  "http://localhost:3845/assets/21378f064bc12774adc06eaffd313e9e64302e62.svg",
  "http://localhost:3845/assets/8f42f3ab3069b46718b06899d22f3d3913c7c0cb.svg",
  "http://localhost:3845/assets/8007ba04e10339d3cfe989e3ecb06b91ab9ee9f2.svg",
  "http://localhost:3845/assets/506e7191cca0b3860aba800a5fc7849ec999289a.svg",
  "http://localhost:3845/assets/fdced522b19cb9e38fe20469c4e2b788cb09f06d.svg",
  "http://localhost:3845/assets/b96119b04825f0d97eb3291f562edf7a784ccf0a.svg",
  "http://localhost:3845/assets/e6362d6cbd9e04f27007f7bf9a513de0e7df736c.svg",
  "http://localhost:3845/assets/c814a31dd9e43ff696bebc981fec17b72a6ac9d5.svg"
];

urls.forEach((url, i) => {
  let name = `confetti_${i}.svg`;
  if (i === urls.length - 1) name = 'record_btn.svg';
  
  http.get(url, (res) => {
    const file = fs.createWriteStream(`public/assets/${name}`);
    res.pipe(file);
  });
});

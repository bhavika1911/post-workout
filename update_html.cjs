const fs = require('fs');

let html = fs.readFileSync('post-workout-commitment.html', 'utf8');

// 1. Wrap existing content in screen1
if (!html.includes('id="screen1"')) {
  html = html.replace('<div class="light-ray-top">', '<div id="screen1" class="screen active">\n    <div class="light-ray-top">');
  html = html.replace('</div>\n  <script>', '  </div>\n  </div>\n  <script>');
}

// 2. Insert screen2 HTML
let confettis = '';
for(let i=0; i<18; i++) {
  confettis += `      <img src="assets/confetti_${i}.svg" class="confetti c${i}">\n`;
}

const screen2Html = `
  <div id="screen2" class="screen">
    <div class="confetti-container">
${confettis}
    </div>
    <p class="title-spirit">THAT'S THE SPIRIT</p>
    
    <div class="reminder-section">
      <p class="reminder-text">A reminder for tomorrow-you?</p>
      <p class="tap-text">Tap to speak & record</p>
      <div class="record-btn-container" onclick="alert('Recording started...')">
        <img src="assets/record_btn.svg" alt="Record" class="record-btn">
      </div>
      <p class="skip-btn" onclick="location.reload()">Skip</p>
    </div>

    <p class="go-back-btn" onclick="location.reload()">GO BACK TO HOME</p>
  </div>
`;

if (!html.includes('id="screen2"')) {
  html = html.replace('</div>\n  <script>', screen2Html + '  <script>');
}

// 3. Add CSS
const newCss = `
.screen {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, #3d8ceb, #fefefe);
  border-radius: 32px;
  z-index: 100;
}
.screen.active {
  opacity: 1;
  pointer-events: auto;
  z-index: 101;
}

#screen1 {
  background: transparent;
}

/* Screen 2 Styles */
#screen2 {
  background-image: linear-gradient(to bottom, #3d8ceb, #fefefe);
  border-radius: 32px;
}

.confetti-container {
  position: absolute;
  top: 94px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 292px;
}

.confetti {
  position: absolute;
}
.c0 { left: 80%; top: 22%; }
.c1 { left: 47%; top: 21%; width: 44px; height: 52px; transform: rotate(-49deg); }
.c2 { left: 12%; top: 67%; width: 99px; }
.c3 { left: 16%; top: 47%; width: 94px; height: 5px; transform: rotate(94deg); }
.c4 { left: 37%; top: 20%; width: 73px; height: 39px; transform: rotate(-25deg); }
.c5 { left: 55%; top: 21%; width: 79px; height: 15px; transform: rotate(12deg); }
.c6 { left: 16%; top: 60%; width: 88px; height: 18px; transform: rotate(170deg); }
.c7 { left: 37%; top: 29%; width: 29px; height: 61px; transform: rotate(-62deg); }
.c8 { left: 67%; top: 31%; width: 76px; height: 36px; transform: rotate(23deg); }
.c9 { left: 81%; top: 68%; width: 86px; height: 8px; transform: rotate(-173deg); }
.c10 { left: 78%; top: 37%; }
.c11 { left: 36%; top: 12%; }
.c12 { left: 73%; top: 47%; }
.c13 { left: 64%; top: 14%; }
.c14 { left: 54%; top: 12%; }
.c15 { left: 27%; top: 26%; }
.c16 { left: 26%; top: 57%; }
.c17 { left: 50%; top: 40%; width: 110px; height: 164px; }

.title-spirit {
  position: absolute;
  top: 223px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Oswald', sans-serif;
  font-size: 36px;
  color: white;
  white-space: nowrap;
  z-index: 10;
  text-transform: uppercase;
  text-shadow: 0px 2px 8px rgba(62,141,235,0.3);
}

.reminder-section {
  position: absolute;
  top: 480px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.reminder-text {
  font-size: 20px;
  color: #5273a4;
  margin-bottom: 22px;
}

.tap-text {
  font-size: 24px;
  font-weight: 600;
  background: linear-gradient(to right, #27497d 21.9%, #2a61b5 52.8%, #2b518a 78.2%);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 32px;
}

.record-btn-container {
  width: 94px;
  height: 94px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}
.record-btn-container:hover {
  transform: scale(1.05);
}

.record-btn {
  width: 100%;
  height: 100%;
}

.skip-btn {
  font-size: 16px;
  color: #555e75;
  cursor: pointer;
}

.go-back-btn {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: #555e75;
  cursor: pointer;
}
`;

if (!html.includes('.confetti-container')) {
  html = html.replace('</style>', newCss + '\n</style>');
}

// 4. Update JS for transition
if (!html.includes('clearTimeout(window.transitionTimeout)')) {
  html = html.replace('if (state === \'RIGHT\') {', 'clearTimeout(window.transitionTimeout);\n    if (state === \'RIGHT\') {\n      window.transitionTimeout = setTimeout(() => { document.getElementById("screen1").classList.remove("active"); document.getElementById("screen2").classList.add("active"); }, 1500);');
  html = html.replace('if (state === \'LEFT\') {', 'clearTimeout(window.transitionTimeout);\n    if (state === \'LEFT\') {');
  html = html.replace('else {\n      // MIDDLE', 'else {\n      // MIDDLE\n      clearTimeout(window.transitionTimeout);');
}

fs.writeFileSync('post-workout-commitment.html', html);

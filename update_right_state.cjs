const fs = require('fs');
let html = fs.readFileSync('post-workout-commitment.html', 'utf8');

// 1. Update .right-flame-glow
html = html.replace(/\.right-flame-glow \{[\s\S]*?max-width: none;\n\}/, `.right-flame-glow {
  position: absolute;
  left: 195px; /* center of track */
  top: 0px; 
  width: 112.86px;
  height: 163.94px;
}
.right-flame-glow img {
  position: absolute;
  top: -8.99%;
  bottom: -11.53%;
  left: -16.75%;
  right: -12.18%;
  width: 128.93%;
  height: 120.52%;
  max-width: none;
}`);

// 2. Update .right-glow
html = html.replace(/\.right-glow \{[\s\S]*?max-width: none;\n\}/, `.right-glow {
  position: absolute;
  left: 195px;
  top: -85px; /* center vertically? 252 vs 82 -> (252-82)/2 = 85 */
  width: 207px;
  height: 252px;
}
.right-glow img {
  position: absolute;
  top: -34.92%;
  bottom: -34.92%;
  left: -42.51%;
  right: -42.51%;
  width: 185.02%;
  height: 169.84%;
  max-width: none;
}`);

// 3. Update #thumbImgRight
html = html.replace(/#thumbImgRight \{[\s\S]*?\n\}/, `#thumbImgRight {
  width: 147.8px;
  height: 195.7px;
  left: -33.9px;
  top: -51.8px;
}`);

// 4. Update .state-right-text font size
html = html.replace('.state-right-text {\n  left: 149px;', '.state-right-text {\n  left: 149px;\n  font-size: 20px;');

fs.writeFileSync('post-workout-commitment.html', html);

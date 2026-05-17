const fs = require('fs');
let html = fs.readFileSync('post-workout-commitment.html', 'utf8');

// 1. Add overflow: hidden back to .slider-track
html = html.replace('.slider-track {\n  position: absolute;\n  width: 390px;\n  height: 82px;\n  border-radius: 56px;\n  border: 1px solid #80b5f2;\n', '.slider-track {\n  position: absolute;\n  width: 390px;\n  height: 82px;\n  border-radius: 56px;\n  border: 1px solid #80b5f2;\n  overflow: hidden;\n');

// 2. Remove thumb images from inside thumb
html = html.replace(/<div class="thumb-icon" id="thumbIcon">[\s\S]*?<\/div>/, '');

// 3. Add flame container as sibling to track
const flameContainerHtml = `
      <!-- Flames sitting ON TOP of the track, moving in sync with thumb -->
      <div class="flame-container" id="flameContainer">
        <img src="assets/imgGroup34399.svg" alt="" id="thumbImgMiddle" class="active">
        <img src="assets/imgGroup34404_1.svg" alt="" id="thumbImgLeft">
        <img src="assets/imgGroup34402.svg" alt="" id="thumbImgRight">
      </div>
      <!-- Main Track -->`;
      
html = html.replace('<!-- Main Track -->', flameContainerHtml);

// 4. Update CSS for flame container
const cssAdd = `
.flame-container {
  position: absolute;
  top: -1px; /* Align with thumb top */
  left: 155px; /* Initial middle position */
  width: 80px;
  height: 80px;
  z-index: 15; /* On top of track */
  pointer-events: none; /* Let clicks pass through to thumb */
}
.flame-container.animate {
  transition: left 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.flame-container img {
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.flame-container img.active {
  opacity: 1;
}
`;
html = html.replace('</style>', cssAdd + '</style>');

// 5. Update JS to move flame container along with thumb
html = html.replace('const thumb = document.getElementById(\'sliderThumb\');', 'const thumb = document.getElementById(\'sliderThumb\');\n  const flameContainer = document.getElementById(\'flameContainer\');');
html = html.replace('thumb.style.left = `${currentLeft}px`;', 'thumb.style.left = `${currentLeft}px`;\n    flameContainer.style.left = `${currentLeft}px`;');
// Note: there are two places where thumb.style.left is set! One in handleMove, one in handleEnd. And one in initial state.
// Let's just do a global replace for all of them.
html = html.replace(/thumb\.style\.left = `\$\{currentLeft\}px`;/g, 'thumb.style.left = `${currentLeft}px`; flameContainer.style.left = `${currentLeft}px`;');

// Also add/remove 'animate' class on flameContainer
html = html.replace('thumb.classList.remove(\'animate\');', 'thumb.classList.remove(\'animate\'); flameContainer.classList.remove(\'animate\');');
html = html.replace('thumb.classList.add(\'animate\');', 'thumb.classList.add(\'animate\'); flameContainer.classList.add(\'animate\');');

fs.writeFileSync('post-workout-commitment.html', html);

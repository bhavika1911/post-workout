const fs = require('fs');
const html = fs.readFileSync('../post_workout_app/index.html', 'utf8');
const css = fs.readFileSync('../post_workout_app/style.css', 'utf8');
const js = fs.readFileSync('../post_workout_app/script.js', 'utf8');

const final = html
  .replace('<link rel="stylesheet" href="style.css">', `<style>\n${css}\n</style>`)
  .replace('<script src="script.js"></script>', `<script>\n${js}\n</script>`);

fs.writeFileSync('post-workout-commitment.html', final);

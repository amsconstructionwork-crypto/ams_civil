const fs = require('fs');
let code = fs.readFileSync('scripts/seed-seo-blogs-v2.js', 'utf8');

// Fix escaped backticks
code = code.replace(/\\\\`/g, '\`');

// Fix the extra '},' from appending
code = code.replace(/\\r?\\n  }\\r?\\n  },/g, '\n  },');

fs.writeFileSync('scripts/seed-seo-blogs-v2.js', code);

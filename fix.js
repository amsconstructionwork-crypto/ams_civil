const fs = require('fs');
let code = fs.readFileSync('scripts/seed-seo-blogs-v2.js', 'utf8');

// Replace backslash+backtick with just backtick
code = code.replace(/\\`/g, '`');

// Fix the extra closing braces
code = code.replace(/  }\r?\n  },/g, '  },');

fs.writeFileSync('scripts/seed-seo-blogs-v2.js', code);
console.log("File fixed successfully.");

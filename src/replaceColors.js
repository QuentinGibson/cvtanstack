import fs from 'fs';
import path from 'path';

const replacementMap = [
  { pattern: /\[#ff9900\]/gi, replacement: 'brand' },
  { pattern: /\[#37404d\]/gi, replacement: 'text-main' },
  { pattern: /\[#e4e4e4\]/gi, replacement: 'border-light' },
  { pattern: /\[#111111\]/gi, replacement: 'dark-bg' },
  { pattern: /\[#969696\]/gi, replacement: 'text-muted' },
  { pattern: /\[#cecece\]/gi, replacement: 'border-med' },
  { pattern: /\[#f1f1f1\]/gi, replacement: 'dark-bg' },
  { pattern: /\[#cccccc\]/gi, replacement: 'border-light' },
  { pattern: /\[#666\]/gi, replacement: 'text-muted' },
  { pattern: /\[#333333\]/gi, replacement: 'dark-bg' },
  { pattern: /font-crimson/gi, replacement: 'font-rajdhani' },
  { pattern: /font-montserrat/gi, replacement: 'font-orbitron' },
  { pattern: /font-\['Montserrat',sans-serif\]/gi, replacement: 'font-orbitron' },
  { pattern: /font-\['Crimson_Text',serif\]/gi, replacement: 'font-rajdhani' },
  { pattern: /(className="[^"]*)\bbg-white\b([^"]*")/gi, replacement: '$1bg-dark-bg$2' },
  // Fix the contrast issue for brand buttons
  { pattern: /(className="[^"]*)\bbg-brand text-white\b([^"]*")/gi, replacement: '$1bg-brand text-black$2' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  replacementMap.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(f, content);
  }
});
console.log("Replacements completed successfully.");

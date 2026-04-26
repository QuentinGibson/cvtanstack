const fs = require('fs');
const path = require('path');

const colorMap = {
  '#ff9900': 'brand',
  '#37404d': 'text-main',
  '#e4e4e4': 'border-light',
  '#111111': 'dark-bg',
  '#969696': 'text-muted',
  '#cecece': 'border-med'
};

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

  for (const [hex, name] of Object.entries(colorMap)) {
    const regex = new RegExp(`\\[${hex}\\]`, 'gi');
    if (regex.test(content)) {
      content = content.replace(regex, name);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(f, content);
  }
});
console.log("Colors replaced successfully.");

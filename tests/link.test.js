const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('all links in index.html point to existing files', () => {
  const repoRoot = path.resolve(__dirname, '..');
  const html = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');
  const anchorRegex = /<a\s[^>]*href="([^"]+)"/g;
  let match;
  const links = [];
  while ((match = anchorRegex.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
      continue;
    }
    links.push(href);
  }
  assert.ok(links.length > 0, 'No links found in index.html');
  for (const link of links) {
    const filePath = path.join(repoRoot, link);
    assert.ok(fs.existsSync(filePath), `Linked file not found: ${link}`);
  }
});

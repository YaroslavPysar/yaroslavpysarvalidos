#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dotenvPath = path.resolve(process.cwd(), '.env');
const srcPath = path.resolve(process.cwd(), 'src');

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('.env file not found.');
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const envKeys = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => line.split('=')[0]);

  return new Set(envKeys);
}

function findEnvUsageInFiles(dir, used = new Set()) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findEnvUsageInFiles(fullPath, used);
    } else if (file.endsWith('.js') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const matches = content.match(/process\.env\.([A-Z0-9_]+)/g);
      if (matches) {
        matches.forEach(match => {
          const key = match.split('.')[2];
          used.add(key);
        });
      }
    }
  }
  return used;
}

function main() {
  console.log('🔍 Inspecting environment variables...');
  const defined = readEnvFile(dotenvPath);
  const used = findEnvUsageInFiles(srcPath);

  const unused = [...defined].filter(key => !used.has(key));
  const missing = [...used].filter(key => !defined.has(key));

  console.log(`✅ Found ${defined.size} variables in .env`);
  console.log(`📦 Used ${used.size} variables in source files`);

  if (unused.length) {
    console.log(`⚠️ Unused variables in .env: ${unused.join(', ')}`);
  } else {
    console.log('🎉 All .env variables are used!');
  }

  if (missing.length) {
    console.log(`❌ Variables used but not defined in .env: ${missing.join(', ')}`);
  } else {
    console.log('✅ All used variables are defined in .env!');
  }
}

main();

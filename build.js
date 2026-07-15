#!/usr/bin/env node
// build.js — runs during Netlify build
// Replaces %%SUPABASE_URL%% and %%SUPABASE_ANON_KEY%% in HTML files
// with actual values from Netlify environment variables.

const fs   = require('fs');
const path = require('path');

const SUPABASE_URL  = process.env.SUPABASE_URL;
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars');
  process.exit(1);
}

['index.html', 'app.html'].forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content
    .replace(/%%SUPABASE_URL%%/g,   SUPABASE_URL)
    .replace(/%%SUPABASE_ANON_KEY%%/g, SUPABASE_ANON);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Injected env vars into ${file}`);
});

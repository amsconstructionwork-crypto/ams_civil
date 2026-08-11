const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchRegex, replaceText) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (searchRegex.test(content)) {
      content = content.replace(searchRegex, replaceText);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  }
}

// 1. Remove force-dynamic from pages
replaceInFile(
  path.join(__dirname, '../src/app/blog/page.tsx'),
  /export const dynamic = 'force-dynamic';\r?\n?/g,
  ''
);

// 2. Remove revalidate from pages
replaceInFile(
  path.join(__dirname, '../src/app/blog/[slug]/page.tsx'),
  /export const revalidate = 3600;.*\r?\n?/g,
  ''
);

replaceInFile(
  path.join(__dirname, '../src/app/services/[slug]/page.tsx'),
  /export const revalidate = 604800;.*\r?\n?/g,
  ''
);

replaceInFile(
  path.join(__dirname, '../src/app/areas/[location]/[service]/page.tsx'),
  /export const revalidate = 604800;.*\r?\n?/g,
  ''
);

// 3. Add revalidatePath to API routes
function addRevalidateToApi(filePath, modelName) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (!content.includes("import { revalidatePath }")) {
      content = content.replace(/import { NextRequest, NextResponse } from 'next\/server';/, `import { NextRequest, NextResponse } from 'next/server';\nimport { revalidatePath } from 'next/cache';`);
      changed = true;
    }

    if (content.includes('insertOne')) {
      const paths = modelName === 'blogs' ? "revalidatePath('/blog'); revalidatePath('/');" : `revalidatePath('/${modelName}'); revalidatePath('/');`;
      content = content.replace(/return NextResponse\.json\(\s*\{\s*success: true/g, `${paths}\n    return NextResponse.json({ success: true`);
      changed = true;
    }
    
    if (content.includes('updateOne')) {
      const paths = modelName === 'blogs' ? "revalidatePath('/blog'); revalidatePath('/blog/[slug]', 'page'); revalidatePath('/');" : `revalidatePath('/${modelName}'); revalidatePath('/');`;
      content = content.replace(/return NextResponse\.json\(\{\s*success: true/g, `${paths}\n    return NextResponse.json({ success: true`);
      changed = true;
    }

    if (content.includes('deleteOne')) {
      const paths = modelName === 'blogs' ? "revalidatePath('/blog'); revalidatePath('/blog/[slug]', 'page'); revalidatePath('/');" : `revalidatePath('/${modelName}'); revalidatePath('/');`;
      content = content.replace(/return NextResponse\.json\(\{\s*success: true/g, `${paths}\n    return NextResponse.json({ success: true`);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated API: ${filePath}`);
    }
  }
}

addRevalidateToApi(path.join(__dirname, '../src/app/api/blogs/route.ts'), 'blogs');
addRevalidateToApi(path.join(__dirname, '../src/app/api/blogs/[slug]/route.ts'), 'blogs');
addRevalidateToApi(path.join(__dirname, '../src/app/api/gallery/route.ts'), 'gallery');
addRevalidateToApi(path.join(__dirname, '../src/app/api/gallery/[id]/route.ts'), 'gallery');
addRevalidateToApi(path.join(__dirname, '../src/app/api/projects/route.ts'), 'projects');
addRevalidateToApi(path.join(__dirname, '../src/app/api/projects/[slug]/route.ts'), 'projects');
addRevalidateToApi(path.join(__dirname, '../src/app/api/testimonials/route.ts'), 'testimonials');
addRevalidateToApi(path.join(__dirname, '../src/app/api/testimonials/[id]/route.ts'), 'testimonials');

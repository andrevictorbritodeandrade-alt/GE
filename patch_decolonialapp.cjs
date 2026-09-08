const fs = require('fs');
const path = './components/DecolonialApp.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the fallback logic
content = content.replace(
    /if \(!temSlides && originalIndex === 0 && \(slidesData as any\)\['ilgch_08\/05'\]\) \{[\s\S]*?\} else if \(!temSlides && originalIndex === 1 && \(slidesData as any\)\['ilgch_15\/05'\]\) \{[\s\S]*?\}/,
    `if (!temSlides && originalIndex === 1 && (slidesData as any)['ilgch_04/09']) {
                slideKey = 'ilgch_04/09'; temSlides = true;
              }`
);
content = content.replace(
    /if \(!temSlides && originalIndex === 0 && \(slidesData as any\)\['ilgch_08\/05'\]\) \{[\s\S]*?\} else if \(!temSlides && originalIndex === 1 && \(slidesData as any\)\['ilgch_15\/05'\]\) \{[\s\S]*?\}/,
    `if (!temSlides && originalIndex === 1 && (slidesData as any)['ilgch_04/09']) {
                slideKey = 'ilgch_04/09'; temSlides = true;
              }`
);

// Replace the keys in slidesData
content = content.replace("'ilgch_08/05': [", "'ilgch_28/08': [");
content = content.replace("'ilgch_15/05': [", "'ilgch_04/09': [");

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully patched DecolonialApp.tsx');

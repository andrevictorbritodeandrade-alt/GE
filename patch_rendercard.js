const fs = require('fs');
let code = fs.readFileSync('components/DecolonialApp.tsx', 'utf8');

// Fix isPast hardcode
code = code.replace(
  /isPast = classDate.getTime\(\) < new Date\('2026-06-07T20:01:27Z'\).getTime\(\);/g,
  'isPast = classDate.getTime() < new Date().getTime();'
);

// Fix highlighting for isCurrentClass
code = code.replace(
  /if \(hasDestaque\) baseCardClasses \+= ` ring-4 ring-amber-400 ring-offset-2 z-10 scale-\[1.02\] shadow-xl`;/,
  'if (isCurrentClass || hasDestaque) baseCardClasses += ` ring-4 ${isCurrentClass ? "ring-blue-500" : "ring-amber-400"} ring-offset-2 z-10 scale-[1.02] shadow-xl`;'
);

fs.writeFileSync('components/DecolonialApp.tsx', code);

const fs = require("fs");

const filePath = "src/components/ui/index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

// Find and remove the duplicate ScrollProgress and AnimatedCTA component blocks
// These are already exported from components/animation/index.tsx
const duplicateStart = `\n// ============================================\n// Scroll Progress Bar\n// ============================================\nexport function ScrollProgress() {\n`;
const duplicateEnd = `\n\nexport interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n`;

const startIndex = content.indexOf(duplicateStart);
const endIndex = content.indexOf(duplicateEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const cleaned = content.slice(0, startIndex) + content.slice(endIndex);
  fs.writeFileSync(filePath, cleaned, "utf-8");
  console.log("Removed duplicate ScrollProgress and AnimatedCTA from ui/index.tsx");
} else {
  console.log("Duplicate block not found");
  console.log("Start:", startIndex, "End:", endIndex);
}

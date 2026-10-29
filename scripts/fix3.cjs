const fs = require("fs");

const filePath = "src/components/animation/index.tsx";
let content = fs.readFileSync(filePath, "utf-8");

// Find and remove the broken code starting from the duplicate import
const duplicateImport = 'import { Button } from "@/components/ui";';
const secondImportIndex = content.indexOf(duplicateImport);

if (secondImportIndex !== -1) {
  // Remove from the second import to the end
  content = content.slice(0, secondImportIndex);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("Removed duplicate Button import and broken code");
} else {
  console.log("No duplicate import found");
}

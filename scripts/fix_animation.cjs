const fs = require("fs");

let content = fs.readFileSync("src/components/animation/index.tsx", "utf-8");

// Remove the broken leftover code from the previous bad patches
const brokenCode = `import { Button } from "@/components/ui";

        isHovered ? "transform-scale-105" : "transform-scale-100"
      } ${className}`
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Animated underline decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] transition-all duration-300 origin-left" style={{ width: isHovered ? "100%" : "0%" }} />
    </Button>
  );
}

`;

content = content.replace(brokenCode, "");

fs.writeFileSync("src/components/animation/index.tsx", content, "utf-8");
console.log("Cleaned broken leftover code");

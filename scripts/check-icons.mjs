import("lucide-react").then((m) => {
  const icons = Object.keys(m).filter((k) => /^[A-Z]/.test(k));
  const needed = [
    "Edit",
    "Send",
    "Trash2",
    "Archive",
    "Eye",
    "EyeOff",
    "Plus",
    "CheckCircle",
    "Clock",
    "Mail",
    "MessageSquare",
    "Settings",
    "ArrowUp",
    "ArrowDown",
    "FileText",
    "Phone",
    "X",
    "Save",
    "Upload",
    "Image",
    "FolderOpen",
    "BarChart3",
    "MoreVertical",
  ];
  const found = icons.filter((i) => needed.includes(i));
  const missing = needed.filter((i) => !found.includes(i));
  console.log("Found: " + found.join(", "));
  console.log("Missing: " + missing.join(", "));
}).catch((e) => {
  console.error(e);
  process.exit(1);
});

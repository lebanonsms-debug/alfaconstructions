import json
import subprocess

result = subprocess.run(
    ["npx", "vercel", "ls", "--json"],
    capture_output=True,
    text=True
)
data = json.loads(result.stdout)
for d in data.get("deployments", [])[::-1]:
    print(f"Deployment: {d.get('url', 'N/A')}")
    print(f"  State: {d.get('state', 'N/A')}")
    print(f"  Created: {d.get('createdAt', 'N/A')}")
    meta = d.get('meta', {})
    print(f"  Commit: {meta.get('githubCommitSha', 'N/A')}")
    print(f"  Message: {meta.get('githubCommitMessage', 'N/A')[:80]}")
    print()

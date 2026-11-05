import urllib.request
import json

url = "https://alfaconstructions.vercel.app/fr/"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as response:
        print("Status:", response.status)
        print("Content-Type:", response.headers.get('Content-Type'))
        print("Content-Length:", response.headers.get('Content-Length'))
        body = response.read().decode('utf-8')
        print("Body length:", len(body))
        print("First 500 chars:")
        print(body[:500])
except Exception as e:
    print(f"Error: {e}")

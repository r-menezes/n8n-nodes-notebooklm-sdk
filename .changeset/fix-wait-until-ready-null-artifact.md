---
"n8n-nodes-notebooklm-sdk": patch
---

Fix waitUntilReady polling indefinitely when artifact creation fails. Now throws a clear error immediately if artifactId is null instead of polling until timeout.

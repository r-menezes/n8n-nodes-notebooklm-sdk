# n8n-nodes-notebooklm

An [n8n](https://n8n.io) community node for [Google NotebookLM](https://notebooklm.google.com). Manage notebooks, sources, artifacts, chat, and notes from your n8n workflows.

Built on top of [notebooklm-sdk](https://github.com/agmmnn/notebooklm-sdk).

---

## Installation

In your n8n instance, go to **Settings → Community Nodes → Install** and enter:

```
n8n-nodes-notebooklm
```

Or install manually:

```bash
npm install n8n-nodes-notebooklm
```

---

## Authentication

NotebookLM uses Google session cookies — there is no public API key. You need to provide your browser session cookies as a credential.

### Getting your cookies

1. Install the SDK login helper:
   ```bash
   npx notebooklm-sdk login
   ```
2. A browser window will open. Sign in to your Google account.
3. The session is saved to `~/.notebooklm/session.json`.
4. Extract the cookie string from that file, or use the `NOTEBOOKLM_COOKIES` format:
   ```
   SID=abc123; HSID=xyz; SSID=...; ...
   ```

### Adding the credential in n8n

1. Go to **Credentials → New Credential → NotebookLM API**
2. Paste your cookie string into the **Cookie String** field
3. Save

> Cookies expire periodically. Re-run `npx notebooklm-sdk login` and update the credential when you get authentication errors.

---

## Resources & Operations

### Notebook

| Operation | Description |
|---|---|
| List | List all notebooks in your account |
| Get | Get a notebook by ID |
| Create | Create a new notebook |
| Delete | Delete a notebook |

### Source

| Operation | Description | Parameters |
|---|---|---|
| List | List all sources in a notebook | Notebook ID |
| Add URL | Add a web URL as a source | Notebook ID, URL |
| Add Text | Add plain text as a source | Notebook ID, Title, Content |
| Get Fulltext | Get the full extracted text of a source | Notebook ID, Source ID |
| Delete | Delete a source | Notebook ID, Source ID |

### Artifact

| Operation | Description | Parameters |
|---|---|---|
| List | List all artifacts | Notebook ID |
| List Audio Overviews | List audio overview artifacts | Notebook ID |
| List Reports | List report artifacts | Notebook ID |
| Create Audio Overview | Generate an audio overview podcast | Notebook ID |
| Create Report | Generate a briefing doc, study guide, or blog post | Notebook ID, Format |
| Create Mind Map | Generate a mind map note | Notebook ID |
| Export Report | Export a report artifact to Google Docs | Notebook ID, Artifact ID, Title |

**Report formats:** `Briefing Doc`, `Study Guide`, `Blog Post`

### Chat

| Operation | Description | Parameters |
|---|---|---|
| Ask | Send a question and receive a grounded response | Notebook ID, Message |

### Note

| Operation | Description | Parameters |
|---|---|---|
| List | List all text notes in a notebook | Notebook ID |
| Create | Create a new note | Notebook ID, Content |

---

## Example workflow

**Summarize a webpage into a NotebookLM notebook:**

1. **HTTP Request** — fetch a webpage URL
2. **NotebookLM: Source → Add URL** — add the URL to a notebook
3. **NotebookLM: Artifact → Create Report** — generate a briefing doc
4. **NotebookLM: Chat → Ask** — ask a follow-up question grounded in the source

---

## Finding your Notebook ID

The notebook ID is the long alphanumeric string in the NotebookLM URL:

```
https://notebooklm.google.com/notebook/abc123def456...
                                         ^^^^^^^^^^^^^^^^
```

You can also use **Notebook → List** as the first step in a workflow to retrieve notebook IDs dynamically.

---

## Local development

```bash
git clone https://github.com/agmmnn/n8n-nodes-notebooklm
cd n8n-nodes-notebooklm
npm install
npm run build
```

To test in a local n8n instance:

```bash
# In this repo
npm link

# In your n8n directory
npm link n8n-nodes-notebooklm
```

Then restart n8n — the node will appear in the node palette under **NotebookLM**.

---

## License

MIT

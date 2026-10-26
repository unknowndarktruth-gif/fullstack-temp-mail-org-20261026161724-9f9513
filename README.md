# Full-Stack Clone & AI Synthesized App

- **Source Target:** `https://temp-mail.org/en/`
- **AI Engine:** `Deterministic Cloner` (FreeLLMAPI 7.4B Token Router)
- **Intercepted API Routes:** `111`

## 1. Static Hosting (GitHub Pages)
The frontend automatically loads `assets/js/backend_mock_adapter.js`, which intercepts XHR/Fetch calls and emulates backend responses and state in-browser via LocalStorage.

## 2. Node.js Backend Server
```bash
cd backend
npm install
npm start
```

## 3. Python Backend Server
```bash
cd backend
pip install -r requirements.txt
python app.py
```

````md
# 🔆 React Custom Syntax Highlighter

A lightweight, zero-dependency syntax highlighter component for **PHP** and **Node.js** code — with language toggle, copy-to-clipboard, and dark mode support.

## ✨ Features

- ✅ Supports PHP and Node.js syntax
- 🎨 Custom Tailwind-style color tokens
- 🌘 Dark mode ready
- 🧠 Detects keywords, strings, variables, builtins, and comments
- 📋 Copy-to-clipboard button
- ⚙️ Built using plain TypeScript + React

---

## 📦 Installation

```bash
npm install react-code-syntax-highlighter
# or
yarn add react-code-syntax-highlighter
````

---

## 🚀 Usage

```tsx
import { CustomCodeBlock } from "react-code-syntax-highlighter";

const code = `
const express = require("express");
const app = express();
`;

export default function App() {
  return <CustomCodeBlock code={code} language="node" />;
}
```

### PHP Example

```tsx
const phpCode = `
<?php
$secret = "your_secret";
echo "Webhook received";
?>
`;

<CustomCodeBlock code={phpCode} language="php" />
```

---

## 🧪 Props

| Prop       | Type                | Description               |
| ---------- | ------------------- | ------------------------- |
| `code`     | `string`            | The raw code to highlight |
| `language` | `"php"` or `"node"` | Language mode             |

---

## ✍️ Screenshot

> Dark mode example:

![Screenshot](./assets/screenshot.png)

---

## 📋 TODO

* [ ] Add more language support
* [ ] Export raw HTML renderer
* [ ] Support for themes (light/dark toggle)
* [ ] Publish as CDN-compatible build

---

## 🛠 Dev Commands

```bash
npm run build     # compile to /dist
npm run watch     # watch mode (optional)
```

---

## 📜 License

MIT © [Ali Yar Khan](https://github.com/AliYar-Khan)

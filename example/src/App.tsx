import { useState } from "react";
import { CustomCodeBlock } from "react-code-syntax-highlighter";

export default function App() {
  const [lang, setLang] = useState<"node" | "php">("node");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const codeSnippets = {
    node: `const express = require("express");
const crypto = require("crypto");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "Secret123456";

function verifyWebhookSignature(payload, receivedSignature) {
  if (!WEBHOOK_SECRET) {
    console.error("Webhook secret is not set");
    return false;
  }

  const payloadString =
    typeof payload === "object" ? JSON.stringify(payload) : payload;

  const stringToHash = \`\${payloadString}:\${WEBHOOK_SECRET}\`;

  const hash = crypto
    .createHash("sha256")
    .update(stringToHash, "utf8")
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(receivedSignature, "hex")
  );
}

app.post("/webhook", (req, res) => {
  const receivedSignature = req.headers["x-payload-signature"];

  if (!receivedSignature) {
    return res.status(400).json({ error: "Signature header missing" });
  }

  const isValid = verifyWebhookSignature(req.body, receivedSignature);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  
  console.log("Received valid webhook payload:", req.body);
  res.status(200).json({ message: "Webhook received and verified" });
});


app.listen(port, () => {
  console.log(\`Webhook server listening at http://localhost:\${port}\`);
});
`,
    php: `<?php

$WEBHOOK_SECRET = getenv('WEBHOOK_SECRET') ?: 'Secret123456';

$rawPayload = file_get_contents("php://input");

$headers = getallheaders();
$receivedSignature = isset($headers['x-payload-signature']) ? $headers['x-payload-signature'] : null;

if (!$receivedSignature) {
    http_response_code(400);
    echo json_encode(["error" => "Signature header missing"]);
    exit;
}

$stringToHash = $rawPayload . ':' . $WEBHOOK_SECRET;
$expectedSignature = hash('sha256', $stringToHash);

if (!hash_equals($expectedSignature, $receivedSignature)) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid signature"]);
    exit;
}

$payload = json_decode($rawPayload, true);

file_put_contents("webhook_log.txt", print_r($payload, true), FILE_APPEND);

http_response_code(200);
echo json_encode(["message" => "Webhook received and verified"]);
?>
`,
  };

  return (
    <div className="min-h-screen min-w-full bg-white font-mono px-8 pb-8 pt-2">
      <div className="mb-6 overflow-auto rounded-lg bg-zinc-800 p-4 text-sm">
        <div className="mb-2 flex flex-row justify-between">
          <div className="mb-2 flex space-x-2">
            <button
              className={`rounded px-3 py-1 text-sm ${
                lang === "node"
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-700 text-zinc-300"
              }`}
              onClick={() => setLang("node")}
            >
              Node.js
            </button>
            <button
              className={`rounded px-3 py-1 text-sm ${
                lang === "php"
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-700 text-zinc-300"
              }`}
              onClick={() => setLang("php")}
            >
              PHP
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="mb-3 rounded bg-zinc-700 px-3 py-1 text-sm text-white hover:bg-zinc-600"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <CustomCodeBlock code={codeSnippets[lang]} language={lang} />
      </div>
    </div>
  );
}

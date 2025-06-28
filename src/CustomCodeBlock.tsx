import React from "react";
import { highlightCode } from "./util";

// include your highlightCode logic here or import from another file

export const CustomCodeBlock: React.FC<{
  code: string;
  language: "php" | "node";
}> = ({ code, language }) => {
  return (
    <pre className="bg-zinc-900 p-4 rounded-xl overflow-auto text-sm font-mono text-white relative">
      <code
        dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
      />
    </pre>
  );
};

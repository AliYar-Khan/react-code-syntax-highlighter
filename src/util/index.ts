import LanguageStyles from "../languages";
const escapeHtml = (code: string) =>
    code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const highlightCode = (code: string, lang: "node" | "php") => {
    const { keywords, types, builtin } = LanguageStyles[lang];

    const tokens: { type: string; value: string }[] = [];
    const regexParts = [
        { type: "comment", regex: /(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/g },
        { type: "string", regex: /(['"`])(?:\\.|(?!\1).)*\1/g },
        {
            type: "variable",
            regex: lang === "php"
                ? /\$[a-zA-Z_][a-zA-Z0-9_]*/g
                : /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g,
        },
        { type: "symbol", regex: /[{}();,.=+\-*/<>]/g },
        { type: "whitespace", regex: /\s+/g },
        { type: "word", regex: /\b\w+\b/g }, // fallback
    ];

    let index = 0;

    while (index < code.length) {
        let matched = false;

        for (let { type, regex } of regexParts) {
            regex.lastIndex = index;
            const match = regex.exec(code);
            if (match && match.index === index) {
                let value = match[0];

                // Reclassify word tokens
                if (type === "word" || type === "variable") {
                    if (keywords.includes(value)) type = "keyword";
                    else if (types.includes(value)) type = "type";
                    else if (builtin.includes(value)) type = "builtin";
                    else if (
                        type === "word" && lang === "node" &&
                        /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)
                    ) {
                        type = "identifier";
                    }
                }

                tokens.push({ type, value });
                index += value.length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            tokens.push({ type: "text", value: code[index] });
            index++;
        }
    }

    const classMap: Record<string, string> = {
        comment: "text-zinc-500 italic",
        string: "text-yellow-400",
        keyword: "text-blue-400 font-semibold",
        type: "text-green-400",
        variable: "text-purple-400",
        builtin: "text-teal-300",
        identifier: "text-purple-400",
        symbol: "text-white",
        whitespace: "",
        text: "",
    };

    return tokens
        .map(({ type, value }) => {
            const cls = classMap[type] || "";
            return cls
                ? `<span class="${cls}">${escapeHtml(value)}</span>`
                : escapeHtml(value);
        })
        .join("");
};

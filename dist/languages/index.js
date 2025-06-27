const LanguageStyles = {
    node: {
        keywords: [
            "const",
            "let",
            "var",
            "if",
            "else",
            "return",
            "require",
            "function",
            "async",
            "await",
        ],
        types: ["string", "number", "boolean"],
        builtin: [
            "console",
            "process",
            "crypto",
            "express",
            "app",
            "res",
            "req",
        ],
    },
    php: {
        keywords: [
            "function",
            "if",
            "else",
            "echo",
            "return",
            "exit",
            "isset",
            "true",
            "false",
        ],
        types: ["int", "float", "string", "array"],
        builtin: [
            "$_POST",
            "$_GET",
            "$_SERVER",
            "json_decode",
            "file_get_contents",
        ],
    },
};
export default LanguageStyles;

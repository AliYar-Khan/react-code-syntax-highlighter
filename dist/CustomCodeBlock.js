import { jsx as _jsx } from "react/jsx-runtime";
import { highlightCode } from "./util";
// include your highlightCode logic here or import from another file
export const CustomCodeBlock = ({ code, language }) => {
    return (_jsx("pre", { className: "bg-zinc-900 p-4 rounded-xl overflow-auto text-sm font-mono text-white relative", children: _jsx("code", { dangerouslySetInnerHTML: { __html: highlightCode(code, language) } }) }));
};

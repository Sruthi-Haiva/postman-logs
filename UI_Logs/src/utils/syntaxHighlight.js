export function syntaxHighlight(json) {
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped.replace(
    /("(\\u[\dA-Fa-f]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+\.?\d*([eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^&quot;/.test(match) || /^"/.test(match)) {
        if (/:$/.test(match) || /&quot;:$/.test(match)) {
          return `<span style="color:#19427D;font-weight:600">${match}</span>`;
        }
        return `<span style="color:#1a7a4a">${match}</span>`;
      }
      if (/true|false/.test(match)) return `<span style="color:#7c3aad">${match}</span>`;
      if (/null/.test(match))       return `<span style="color:#999999">${match}</span>`;
      return `<span style="color:#b05c00">${match}</span>`;
    }
  ).replace(/[{}\[\]]/g, m => `<span style="color:#19427D">${m}</span>`);
}

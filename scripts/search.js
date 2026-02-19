document.addEventListener("DOMContentLoaded", () => {
  const jsObjectData = [
    { id: 1, app: "browser", action: "refresh page", windows: "Ctrl + R", mac: "Cmd + R" },
    { id: 2, app: "browser", action: "find on page", windows: "Ctrl + F", mac: "Cmd + F" },
    { id: 3, app: "browser", action: "new tab", windows: "Ctrl + T", mac: "Cmd + T" },
    { id: 4, app: "browser", action: "reopen closed tab", windows: "Ctrl + Shift + T", mac: "Cmd + Shift + T" },
    { id: 5, app: "browser", action: "focus address bar", windows: "Ctrl + L", mac: "Cmd + L" },
    { id: 6, app: "browser", action: "cycle tabs forward", windows: "Ctrl + Tab", mac: "Ctrl + Tab" },

    { id: 7, app: "system", action: "switch apps", windows: "Alt + Tab", mac: "Cmd + Tab" },
    { id: 8, app: "system", action: "show desktop", windows: "Win + D", mac: "F11 (varies)" },
    { id: 9, app: "system", action: "snap window left/right", windows: "Win + Arrow Keys", mac: "Option + Green Button" },
    { id: 10, app: "system", action: "quit app", windows: "Alt + F4", mac: "Cmd + Q" },
    { id: 11, app: "system", action: "hide app", windows: "N/A", mac: "Cmd + H" },
    { id: 12, app: "system", action: "open app search", windows: "Win key", mac: "Cmd + Space" },

    { id: 13, app: "text", action: "copy", windows: "Ctrl + C", mac: "Cmd + C" },
    { id: 14, app: "text", action: "paste", windows: "Ctrl + V", mac: "Cmd + V" },
    { id: 15, app: "text", action: "paste without formatting", windows: "Ctrl + Shift + V", mac: "Cmd + Shift + V" },
    { id: 16, app: "text", action: "cut", windows: "Ctrl + X", mac: "Cmd + X" },
    { id: 17, app: "text", action: "undo", windows: "Ctrl + Z", mac: "Cmd + Z" },
    { id: 18, app: "text", action: "redo", windows: "Ctrl + Y", mac: "Cmd + Shift + Z" },
    { id: 19, app: "text", action: "select all", windows: "Ctrl + A", mac: "Cmd + A" },

    { id: 20, app: "vscode", action: "toggle terminal", windows: "Ctrl + `", mac: "Ctrl + `" },
    { id: 21, app: "vscode", action: "command palette", windows: "Ctrl + Shift + P", mac: "Cmd + Shift + P" },
    { id: 22, app: "vscode", action: "quick open file", windows: "Ctrl + P", mac: "Cmd + P" },
    { id: 23, app: "vscode", action: "search across files", windows: "Ctrl + Shift + F", mac: "Cmd + Shift + F" },
    { id: 24, app: "vscode", action: "comment line", windows: "Ctrl + /", mac: "Cmd + /" },
    { id: 25, app: "vscode", action: "delete line", windows: "Ctrl + Shift + K", mac: "Cmd + Shift + K" },
    { id: 26, app: "vscode", action: "format document", windows: "Shift + Alt + F", mac: "Shift + Option + F" },
    { id: 27, app: "vscode", action: "multiple cursors", windows: "Alt + Click", mac: "Option + Click" },

    { id: 28, app: "emmet", action: "HTML boilerplate", windows: "!", mac: "!" },
    { id: 29, app: "emmet", action: "create class div", windows: ".className", mac: ".className" },
    { id: 30, app: "emmet", action: "create id div", windows: "div#main", mac: "div#main" },
    { id: 31, app: "emmet", action: "nested classes", windows: "div.card.item", mac: "div.card.item" }
  ];

  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");
  const searchResults = document.getElementById("searchResults");
  const searchMessage = document.getElementById("searchMessage");

  if (!searchInput || !searchResults || !searchMessage) return;

  const SEARCHABLE_FIELDS = ["app", "action", "windows", "mac"];

  function normalize(s) {
    return String(s || "").trim().toLowerCase();
  }

  function renderObjectResults(items) {
    searchResults.innerHTML = "";

    if (items.length === 0) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = "No results found.";
      searchResults.appendChild(li);
      return;
    }

    items.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${item.app} | ${item.action} | Win: ${item.windows} | Mac: ${item.mac}`;
      searchResults.appendChild(li);
    });
  }

  function handleControlledObjectSearch() {
    const query = normalize(searchInput.value);

    if (!query) {
      renderObjectResults(jsObjectData);
      searchMessage.textContent = "Type to search shortcuts (app/action/windows/mac).";
      return;
    }

    const results = jsObjectData.filter(item =>
      SEARCHABLE_FIELDS.some(field => normalize(item[field]).includes(query))
    );

    renderObjectResults(results);
    searchMessage.textContent = results.length
      ? `Found ${results.length} result(s).`
      : `No results for: ${query}`;
  }

  searchInput.addEventListener("input", handleControlledObjectSearch);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      renderObjectResults(jsObjectData);
      searchMessage.textContent = "Type to search shortcuts (app/action/windows/mac).";
      searchInput.focus();
    });
  }

  renderObjectResults(jsObjectData);
  searchMessage.textContent = "Type to search shortcuts (app/action/windows/mac).";
});

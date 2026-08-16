(function registerActrLispImporter() {
  const root = typeof window !== "undefined" ? window : globalThis;
  const XML_NS = "https://developers.google.com/blockly/xml";
  const KNOWN_BUFFERS = new Set([
    "goal",
    "retrieval",
    "imaginal",
    "visual-location",
    "visual",
    "manual",
    "vocal",
    "aural",
    "temporal",
  ]);

  function parseError(message, token) {
    const suffix = token && Number.isFinite(token.index) ? ` at character ${token.index}` : "";
    return new Error(`${message}${suffix}.`);
  }

  function tokenize(source) {
    const tokens = [];
    let index = 0;

    while (index < source.length) {
      const char = source[index];

      if (/\s/.test(char)) {
        index += 1;
        continue;
      }

      if (char === ";") {
        while (index < source.length && source[index] !== "\n") {
          index += 1;
        }
        continue;
      }

      if (char === "#" && source[index + 1] === "|") {
        const endIndex = source.indexOf("|#", index + 2);
        if (endIndex === -1) {
          throw parseError("Unterminated block comment", { index });
        }
        index = endIndex + 2;
        continue;
      }

      if (char === "#" && source[index + 1] === "'") {
        tokens.push({ type: "function_quote", value: "#'", index });
        index += 2;
        continue;
      }

      if (char === "(" || char === ")") {
        tokens.push({ type: char, value: char, index });
        index += 1;
        continue;
      }

      if (char === "'") {
        tokens.push({ type: "quote", value: char, index });
        index += 1;
        continue;
      }

      if (char === "`") {
        tokens.push({ type: "quasiquote", value: char, index });
        index += 1;
        continue;
      }

      if (char === ",") {
        if (source[index + 1] === "@") {
          tokens.push({ type: "unquote_splicing", value: ",@", index });
          index += 2;
        } else {
          tokens.push({ type: "unquote", value: char, index });
          index += 1;
        }
        continue;
      }

      if (char === '"') {
        const start = index;
        let value = "";
        index += 1;

        while (index < source.length) {
          const next = source[index];

          if (next === "\\") {
            const escaped = source[index + 1];
            if (escaped === undefined) {
              throw parseError("Unterminated string literal", { index: start });
            }
            value += escaped === "n" ? "\n" : escaped === "t" ? "\t" : escaped;
            index += 2;
            continue;
          }

          if (next === '"') {
            index += 1;
            tokens.push({ type: "string", value, index: start });
            break;
          }

          value += next;
          index += 1;
        }

        if (!tokens.length || tokens[tokens.length - 1].index !== start) {
          throw parseError("Unterminated string literal", { index: start });
        }
        continue;
      }

      const start = index;
      while (
        index < source.length &&
        !/\s/.test(source[index]) &&
        source[index] !== "(" &&
        source[index] !== ")" &&
        source[index] !== '"' &&
        source[index] !== "'" &&
        source[index] !== "`" &&
        source[index] !== "," &&
        source[index] !== ";"
      ) {
        index += 1;
      }
      tokens.push({ type: "atom", value: source.slice(start, index), index: start });
    }

    return tokens;
  }

  function atom(value) {
    return { kind: "atom", value: String(value) };
  }

  function stringNode(value) {
    return { kind: "string", value: String(value) };
  }

  function parseLisp(source) {
    const tokens = tokenize(String(source || ""));
    let cursor = 0;

    function readForm() {
      const token = tokens[cursor];

      if (!token) {
        throw parseError("Unexpected end of Lisp input");
      }

      cursor += 1;

      if (token.type === "atom") {
        return { kind: "atom", value: token.value };
      }

      if (token.type === "string") {
        return { kind: "string", value: token.value };
      }

      if (token.type === "quote") {
        return { kind: "list", items: [atom("quote"), readForm()] };
      }

      if (token.type === "function_quote") {
        return { kind: "list", items: [atom("function"), readForm()] };
      }

      if (token.type === "quasiquote") {
        return { kind: "list", items: [atom("quasiquote"), readForm()] };
      }

      if (token.type === "unquote") {
        return { kind: "list", items: [atom("unquote"), readForm()] };
      }

      if (token.type === "unquote_splicing") {
        return { kind: "list", items: [atom("unquote-splicing"), readForm()] };
      }

      if (token.type === ")") {
        throw parseError("Unexpected closing parenthesis", token);
      }

      const items = [];
      while (cursor < tokens.length && tokens[cursor].type !== ")") {
        items.push(readForm());
      }

      if (cursor >= tokens.length) {
        throw parseError("Missing closing parenthesis", token);
      }

      cursor += 1;
      return { kind: "list", items };
    }

    const forms = [];
    while (cursor < tokens.length) {
      forms.push(readForm());
    }

    return forms;
  }

  function isAtom(node) {
    return node && node.kind === "atom";
  }

  function isList(node) {
    return node && node.kind === "list";
  }

  function symbolName(node) {
    return isAtom(node) ? node.value : "";
  }

  function lowerSymbol(node) {
    return symbolName(node).toLowerCase();
  }

  function isKeywordNode(node) {
    return isAtom(node) && symbolName(node).startsWith(":");
  }

  function headLower(node) {
    return isList(node) && node.items.length ? lowerSymbol(node.items[0]) : "";
  }

  function quoteString(value) {
    return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
  }

  function nodeToSource(node) {
    if (!node) {
      return "";
    }

    if (node.kind === "atom") {
      return node.value;
    }

    if (node.kind === "string") {
      return quoteString(node.value);
    }

    return `(${node.items.map(nodeToSource).join(" ")})`;
  }

  function textForField(node, fallback = "") {
    if (!node) {
      return fallback;
    }

    if (node.kind === "atom" || node.kind === "string") {
      return String(node.value || fallback);
    }

    return nodeToSource(node) || fallback;
  }

  function keywordValueFromItems(items, keyword) {
    const target = String(keyword || "").toLowerCase();

    for (let index = 0; index < items.length - 1; index += 1) {
      if (lowerSymbol(items[index]) === target) {
        return items[index + 1];
      }
    }

    return null;
  }

  function keywordValueBlock(items, keyword, fallbackNode) {
    return valueBlockFor(keywordValueFromItems(items, keyword) || fallbackNode);
  }

  function xmlEscape(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function block(type, options = {}) {
    return {
      type,
      fields: options.fields || {},
      values: options.values || {},
      statements: options.statements || {},
      x: options.x,
      y: options.y,
    };
  }

  function rawStatementBlock(code) {
    return block("actr_raw_lisp", {
      fields: {
        CODE: String(code || "").trim(),
      },
    });
  }

  function rawValueBlock(code) {
    return block("actr_raw_value", {
      fields: {
        CODE: String(code || "nil").trim() || "nil",
      },
    });
  }

  function isNumberLiteral(value) {
    return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(String(value || ""));
  }

  function valueBlockFor(node) {
    if (!node) {
      return block("actr_nil");
    }

    if (node.kind === "string") {
      return block("text", { fields: { TEXT: node.value } });
    }

    if (node.kind === "atom") {
      const value = node.value;
      const lower = value.toLowerCase();

      if (isNumberLiteral(value)) {
        return block("math_number", { fields: { NUM: value } });
      }

      if (lower === "t") {
        return block("logic_boolean", { fields: { BOOL: "TRUE" } });
      }

      if (lower === "nil") {
        return block("actr_nil");
      }

      if (value.startsWith("=") && value.length > 1) {
        return block("actr_variable", { fields: { NAME: value.replace(/^=+/, "") } });
      }

      return block("actr_symbol", { fields: { VALUE: value } });
    }

    return valueExpressionBlock(node);
  }

  function valueExpressionBlock(node) {
    const items = isList(node) ? node.items : [];
    const head = headLower(node);
    const arithmeticOps = {
      "+": "ADD",
      "-": "MINUS",
      "*": "MULTIPLY",
      "/": "DIVIDE",
      expt: "POWER",
    };
    const unaryOps = {
      sqrt: "ROOT",
      abs: "ABS",
      log: "LN",
      log10: "LOG10",
      exp: "EXP",
      sin: "SIN",
      cos: "COS",
      tan: "TAN",
      asin: "ASIN",
      acos: "ACOS",
      atan: "ATAN",
    };
    const roundOps = {
      round: "ROUND",
      ceiling: "ROUNDUP",
      floor: "ROUNDDOWN",
    };

    if (items.length === 3 && arithmeticOps[head]) {
      return block("math_arithmetic", {
        fields: { OP: arithmeticOps[head] },
        values: {
          A: valueBlockFor(items[1]),
          B: valueBlockFor(items[2]),
        },
      });
    }

    if (items.length === 2 && unaryOps[head]) {
      return block("math_single", {
        fields: { OP: unaryOps[head] },
        values: {
          NUM: valueBlockFor(items[1]),
        },
      });
    }

    if (items.length === 2 && roundOps[head]) {
      return block("math_round", {
        fields: { OP: roundOps[head] },
        values: {
          NUM: valueBlockFor(items[1]),
        },
      });
    }

    return rawValueBlock(nodeToSource(node));
  }

  function slotValueBlocksFromTerms(terms) {
    const slots = [];

    for (let index = 0; index < terms.length; index += 2) {
      const slot = terms[index];
      const value = terms[index + 1] || atom("nil");

      if (!slot) {
        continue;
      }

      slots.push(
        block("actr_slot_value", {
          fields: { SLOT: textForField(slot, "slot") },
          values: { VALUE: valueBlockFor(value) },
        }),
      );
    }

    return slots;
  }

  function splitIsaAndSlots(terms) {
    let type = "chunk";
    let hasIsa = false;
    const slotTerms = [];

    for (let index = 0; index < terms.length; index += 1) {
      if (lowerSymbol(terms[index]) === "isa" && terms[index + 1]) {
        type = textForField(terms[index + 1], "chunk");
        hasIsa = true;
        index += 1;
        continue;
      }

      slotTerms.push(terms[index]);
      if (terms[index + 1]) {
        slotTerms.push(terms[index + 1]);
        index += 1;
      }
    }

    return {
      type,
      hasIsa,
      slots: slotValueBlocksFromTerms(slotTerms),
    };
  }

  function isChunkForm(node) {
    return isList(node) && node.items.length >= 3 && lowerSymbol(node.items[1]) === "isa";
  }

  function chunkBlockFor(form) {
    const items = form.items;
    const details = splitIsaAndSlots(items.slice(1));

    return block("actr_chunk", {
      fields: {
        NAME: textForField(items[0], "chunk"),
        TYPE: details.type,
      },
      statements: {
        SLOTS: details.slots,
      },
    });
  }

  function chunkTypeBlockFor(form) {
    const items = form.items;
    const slotBlocks = items.slice(2).map((slot) =>
      block("actr_slot_name", {
        fields: { NAME: textForField(slot, "slot") },
      }),
    );

    return block("actr_chunk_type", {
      fields: { TYPE: textForField(items[1], "chunk") },
      statements: { SLOTS: slotBlocks },
    });
  }

  function addDmBlockFor(form) {
    const chunkBlocks = form.items.slice(1).map((item) =>
      isChunkForm(item) ? chunkBlockFor(item) : rawStatementBlock(nodeToSource(item)),
    );

    return block("actr_add_dm", {
      statements: { CHUNKS: chunkBlocks },
    });
  }

  function sgpBlocksFor(form) {
    const items = form.items;
    const blocks = [];

    for (let index = 1; index < items.length; index += 2) {
      blocks.push(
        block("actr_sgp", {
          fields: { PARAM: textForField(items[index], ":parameter") },
          values: { VALUE: valueBlockFor(items[index + 1] || atom("t")) },
        }),
      );
    }

    return blocks.length ? blocks : [rawStatementBlock(nodeToSource(form))];
  }

  function runBlockFor(form) {
    return block("actr_run", {
      values: {
        SECONDS: valueBlockFor(form.items[1] || atom("5")),
      },
    });
  }

  function goalFocusBlockFor(form) {
    return block("actr_goal_focus", {
      fields: {
        CHUNK: textForField(form.items[1], "chunk"),
      },
    });
  }

  function openExpWindowBlockFor(form, windowName = "*window*") {
    const items = form.items;
    const keywordItems = items.slice(2);

    return block("actr_open_exp_window", {
      fields: {
        WINDOW: windowName,
      },
      values: {
        TITLE: valueBlockFor(items[1] || stringNode("Experiment")),
        VISIBLE: keywordValueBlock(keywordItems, ":visible", atom("nil")),
        WIDTH: keywordValueBlock(keywordItems, ":width", atom("320")),
        HEIGHT: keywordValueBlock(keywordItems, ":height", atom("220")),
      },
    });
  }

  function setfBlockFor(form) {
    const value = form.items[2];

    if (form.items.length === 3 && value && headLower(value) === "open-exp-window") {
      return openExpWindowBlockFor(value, textForField(form.items[1], "*window*"));
    }

    return rawStatementBlock(nodeToSource(form));
  }

  function addTextToExpWindowBlockFor(form) {
    const args = form.items.slice(1);
    let keywordItems = args;
    let textNode = keywordValueFromItems(keywordItems, ":text");
    let windowNode = atom("*window*");

    if (!textNode && args.length >= 2 && !isKeywordNode(args[0])) {
      windowNode = args[0];
      textNode = args[1];
      keywordItems = args.slice(2);
    }

    return block("actr_add_text_to_exp_window", {
      values: {
        TEXT: valueBlockFor(textNode || stringNode("A")),
        WINDOW: valueBlockFor(windowNode),
        X: keywordValueBlock(keywordItems, ":x", atom("0")),
        Y: keywordValueBlock(keywordItems, ":y", atom("0")),
      },
    });
  }

  function addButtonToExpWindowBlockFor(form) {
    const args = form.items.slice(1);
    let keywordItems = args;
    let windowNode = atom("*window*");
    let textNode = keywordValueFromItems(keywordItems, ":text");

    if (args.length && !isKeywordNode(args[0])) {
      windowNode = args[0];
      keywordItems = args.slice(1);
      textNode = keywordValueFromItems(keywordItems, ":text");

      if (!textNode && keywordItems.length && !isKeywordNode(keywordItems[0])) {
        textNode = keywordItems[0];
        keywordItems = keywordItems.slice(1);
      }
    }

    return block("actr_add_button_to_exp_window", {
      values: {
        TEXT: valueBlockFor(textNode || stringNode("OK")),
        WINDOW: valueBlockFor(windowNode),
        X: keywordValueBlock(keywordItems, ":x", atom("0")),
        Y: keywordValueBlock(keywordItems, ":y", atom("0")),
        WIDTH: keywordValueBlock(keywordItems, ":width", atom("80")),
        HEIGHT: keywordValueBlock(keywordItems, ":height", atom("30")),
        ACTION: keywordValueBlock(keywordItems, ":action", atom("nil")),
      },
    });
  }

  function installDeviceBlockFor(form) {
    return block("actr_install_device", {
      values: {
        DEVICE: valueBlockFor(form.items[1] || atom("*window*")),
      },
    });
  }

  function bufferHeadFor(node) {
    const match = symbolName(node).match(/^([=+?\-])(.+)>$/);
    return match
      ? {
          op: match[1],
          buffer: match[2],
        }
      : null;
  }

  function isOutputOperator(node) {
    const operator = lowerSymbol(node);
    return operator === "!output!" || operator === "!output";
  }

  function splitBufferSections(terms, options = {}) {
    const sections = [];
    let current = null;
    let looseTerms = [];

    function flushLooseTerms() {
      if (looseTerms.length) {
        sections.push({ raw: true, terms: looseTerms });
        looseTerms = [];
      }
    }

    function flushCurrent() {
      if (current) {
        sections.push(current);
        current = null;
      }
    }

    for (let index = 0; index < terms.length; index += 1) {
      const term = terms[index];
      const head = bufferHeadFor(term);

      if (options.includeOutput && isOutputOperator(term)) {
        flushLooseTerms();
        flushCurrent();

        if (terms[index + 1]) {
          sections.push({ output: true, term: terms[index + 1] });
          index += 1;
        } else {
          sections.push({ raw: true, terms: [term] });
        }

        continue;
      }

      if (head) {
        flushLooseTerms();
        flushCurrent();
        current = { ...head, terms: [], headNode: term };
        continue;
      }

      if (current) {
        current.terms.push(term);
      } else {
        looseTerms.push(term);
      }
    }

    flushLooseTerms();
    flushCurrent();

    return sections;
  }

  function sectionToSource(section) {
    if (section.raw) {
      return section.terms.map(nodeToSource).join(" ");
    }

    return [`${section.op}${section.buffer}>`, ...section.terms.map(nodeToSource)].join(" ");
  }

  function outputValueBlockFor(term) {
    if (!term) {
      return block("text", { fields: { TEXT: "message" } });
    }

    if (isList(term)) {
      if (term.items.length === 1) {
        return valueBlockFor(term.items[0]);
      }

      return rawValueBlock(term.items.map(nodeToSource).join(" "));
    }

    return valueBlockFor(term);
  }

  function blockForBufferSection(section, role) {
    if (role === "action" && section.output) {
      return block("actr_output", {
        values: { MESSAGE: outputValueBlockFor(section.term) },
      });
    }

    if (section.raw || !KNOWN_BUFFERS.has(section.buffer)) {
      return rawStatementBlock(sectionToSource(section));
    }

    const details = splitIsaAndSlots(section.terms);

    if (role === "condition" && section.op === "=") {
      if (!details.hasIsa) {
        return rawStatementBlock(sectionToSource(section));
      }

      return block("actr_buffer_condition", {
        fields: {
          BUFFER: section.buffer,
          TYPE: details.type,
        },
        statements: { SLOTS: details.slots },
      });
    }

    if (role === "condition" && section.op === "?") {
      return block("actr_buffer_query", {
        fields: {
          BUFFER: section.buffer,
        },
        statements: { SLOTS: details.slots },
      });
    }

    if (role === "action" && section.op === "+") {
      if (!details.hasIsa) {
        return rawStatementBlock(sectionToSource(section));
      }

      return block("actr_buffer_request", {
        fields: {
          BUFFER: section.buffer,
          TYPE: details.type,
        },
        statements: { SLOTS: details.slots },
      });
    }

    if (role === "action" && section.op === "=") {
      if (details.hasIsa) {
        return rawStatementBlock(sectionToSource(section));
      }

      return block("actr_buffer_update", {
        fields: {
          BUFFER: section.buffer,
        },
        statements: { SLOTS: details.slots },
      });
    }

    if (role === "action" && section.op === "-" && section.terms.length === 0) {
      return block("actr_buffer_clear", {
        fields: {
          BUFFER: section.buffer,
        },
      });
    }

    return rawStatementBlock(sectionToSource(section));
  }

  function productionBlockFor(form) {
    const items = form.items;
    const separatorIndex = items.findIndex((item, index) => index > 1 && lowerSymbol(item) === "==>");

    if (separatorIndex === -1) {
      return rawStatementBlock(nodeToSource(form));
    }

    const conditionBlocks = splitBufferSections(items.slice(2, separatorIndex)).map((section) =>
      blockForBufferSection(section, "condition"),
    );
    const actionBlocks = splitBufferSections(items.slice(separatorIndex + 1), { includeOutput: true }).map(
      (section) => blockForBufferSection(section, "action"),
    );

    return block("actr_production", {
      fields: {
        NAME: textForField(items[1], "production"),
      },
      statements: {
        CONDITIONS: conditionBlocks,
        ACTIONS: actionBlocks,
      },
    });
  }

  function blocksForForm(form, options = {}) {
    if (!isList(form)) {
      return [rawStatementBlock(nodeToSource(form))];
    }

    switch (headLower(form)) {
      case "clear-all":
        return options.skipClearAll ? [] : [rawStatementBlock(nodeToSource(form))];
      case "define-model":
        return [modelBlockFor(form)];
      case "chunk-type":
        return [chunkTypeBlockFor(form)];
      case "add-dm":
        return [addDmBlockFor(form)];
      case "goal-focus":
        return [goalFocusBlockFor(form)];
      case "sgp":
        return sgpBlocksFor(form);
      case "run":
        return [runBlockFor(form)];
      case "p":
        return [productionBlockFor(form)];
      case "reset":
        return form.items.length === 1 ? [block("actr_reset")] : [rawStatementBlock(nodeToSource(form))];
      case "setf":
        return [setfBlockFor(form)];
      case "add-text-to-exp-window":
        return [addTextToExpWindowBlockFor(form)];
      case "add-button-to-exp-window":
        return [addButtonToExpWindowBlockFor(form)];
      case "clear-exp-window":
        return form.items.length === 1 ? [block("actr_clear_exp_window")] : [rawStatementBlock(nodeToSource(form))];
      case "install-device":
        return [installDeviceBlockFor(form)];
      case "start-hand-at-mouse":
        return form.items.length === 1 ? [block("actr_start_hand_at_mouse")] : [rawStatementBlock(nodeToSource(form))];
      case "proc-display":
        return form.items.length === 1 ? [block("actr_proc_display")] : [rawStatementBlock(nodeToSource(form))];
      default:
        return [rawStatementBlock(nodeToSource(form))];
    }
  }

  function modelBlockFor(form) {
    const declarationBlocks = [];
    const bodyBlocks = [];

    for (const item of form.items.slice(2)) {
      const target = headLower(item) === "chunk-type" ? declarationBlocks : bodyBlocks;
      target.push(...blocksForForm(item, { skipClearAll: true }));
    }

    return block("actr_model", {
      fields: {
        NAME: textForField(form.items[1], "model"),
      },
      statements: {
        DECLARATIONS: declarationBlocks,
        BODY: bodyBlocks,
      },
    });
  }

  function blocksToXmlChain(blocks) {
    const cleanBlocks = blocks.filter(Boolean);
    let xml = "";

    for (let index = cleanBlocks.length - 1; index >= 0; index -= 1) {
      xml = blockToXml(cleanBlocks[index], xml);
    }

    return xml;
  }

  function blockToXml(sourceBlock, nextXml = "") {
    const attributes = [`type="${xmlEscape(sourceBlock.type)}"`];

    if (Number.isFinite(sourceBlock.x)) {
      attributes.push(`x="${sourceBlock.x}"`);
    }

    if (Number.isFinite(sourceBlock.y)) {
      attributes.push(`y="${sourceBlock.y}"`);
    }

    const fields = Object.entries(sourceBlock.fields)
      .map(([name, value]) => `<field name="${xmlEscape(name)}">${xmlEscape(value)}</field>`)
      .join("");
    const values = Object.entries(sourceBlock.values)
      .filter(([, value]) => value)
      .map(([name, value]) => `<value name="${xmlEscape(name)}">${blockToXml(value)}</value>`)
      .join("");
    const statements = Object.entries(sourceBlock.statements)
      .filter(([, statementBlocks]) => statementBlocks && statementBlocks.length)
      .map(
        ([name, statementBlocks]) =>
          `<statement name="${xmlEscape(name)}">${blocksToXmlChain(statementBlocks)}</statement>`,
      )
      .join("");
    const next = nextXml ? `<next>${nextXml}</next>` : "";

    return `<block ${attributes.join(" ")}>${fields}${values}${statements}${next}</block>`;
  }

  function lispToBlocks(source) {
    const forms = parseLisp(source);
    const hasModel = forms.some((form) => headLower(form) === "define-model");
    const blocks = forms.flatMap((form) => blocksForForm(form, { skipClearAll: hasModel }));

    if (blocks[0]) {
      blocks[0].x = 30;
      blocks[0].y = 30;
    }

    return blocks;
  }

  function lispToXmlText(source) {
    return `<xml xmlns="${XML_NS}">${blocksToXmlChain(lispToBlocks(source))}</xml>`;
  }

  root.ACTRLispImporter = {
    lispToBlocks,
    lispToXmlText,
    parseLisp,
  };
})();

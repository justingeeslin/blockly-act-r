(function registerActrGenerator() {
  if (!window.Blockly) {
    throw new Error("Blockly must be loaded before the ACT-R generator.");
  }

  const generator = new Blockly.Generator("ACT-R Lisp");

  generator.ORDER_ATOMIC = 0;
  generator.ORDER_FUNCTION = 1;
  generator.ORDER_NONE = 99;
  generator.INDENT = "  ";

  function define(type, fn) {
    generator.forBlock[type] = fn;
    generator[type] = fn;
  }

  function cleanSymbol(value, fallback) {
    const cleaned = String(value || "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[()"';]/g, "");
    return cleaned || fallback;
  }

  function cleanParameter(value) {
    const parameter = cleanSymbol(value, ":parameter");
    return parameter.startsWith(":") ? parameter : `:${parameter}`;
  }

  function quoteString(value) {
    return `"${String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }

  function valueCode(block, name, fallback) {
    return generator.valueToCode(block, name, generator.ORDER_NONE) || fallback;
  }

  function statementCode(block, name) {
    return generator.statementToCode(block, name).trimEnd();
  }

  function indent(code, spaces) {
    if (!code.trim()) {
      return "";
    }
    const prefix = spaces || generator.INDENT;
    return code
      .split("\n")
      .map((line) => (line.trim() ? `${prefix}${line}` : line))
      .join("\n");
  }

  function linesFromStatements(block, name) {
    const code = statementCode(block, name);
    return code
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function slotsCode(block, inputName) {
    const lines = linesFromStatements(block, inputName);
    return lines.length ? `\n${indent(lines.join("\n"))}` : "";
  }

  function bufferHead(op, buffer) {
    return `${op}${cleanSymbol(buffer, "goal")}>`;
  }

  generator.init = function init(workspace) {
    if (Blockly.Names) {
      this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
      this.nameDB_.setVariableMap(workspace.getVariableMap());
    }
  };

  generator.finish = function finish(code) {
    if (this.nameDB_) {
      this.nameDB_.reset();
    }
    return code.trim() ? `${code.trim()}\n` : "";
  };

  generator.scrub_ = function scrub(block, code, thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = thisOnly || !nextBlock ? "" : this.blockToCode(nextBlock);
    return `${code}${nextCode}`;
  };

  define("actr_model", (block) => {
    const name = cleanSymbol(block.getFieldValue("NAME"), "model");
    const declarations = statementCode(block, "DECLARATIONS");
    const body = statementCode(block, "BODY");
    const parts = ["(clear-all)", "", `(define-model ${name}`];

    if (declarations.trim()) {
      parts.push(indent(declarations));
    }

    if (body.trim()) {
      if (declarations.trim()) {
        parts.push("");
      }
      parts.push(indent(body));
    }

    parts.push(")");
    return `${parts.join("\n")}\n`;
  });

  define("actr_chunk_type", (block) => {
    const type = cleanSymbol(block.getFieldValue("TYPE"), "chunk");
    const slots = linesFromStatements(block, "SLOTS");
    return `(chunk-type ${[type, ...slots].join(" ")})\n`;
  });

  define("actr_slot_name", (block) => `${cleanSymbol(block.getFieldValue("NAME"), "slot")}\n`);

  define("actr_add_dm", (block) => {
    const chunks = statementCode(block, "CHUNKS");
    if (!chunks.trim()) {
      return "(add-dm)\n";
    }
    return `(add-dm\n${indent(chunks)}\n)\n`;
  });

  define("actr_chunk", (block) => {
    const name = cleanSymbol(block.getFieldValue("NAME"), "chunk");
    const type = cleanSymbol(block.getFieldValue("TYPE"), "chunk");
    return `(${name} isa ${type}${slotsCode(block, "SLOTS")})\n`;
  });

  define("actr_slot_value", (block) => {
    const slot = cleanSymbol(block.getFieldValue("SLOT"), "slot");
    const value = valueCode(block, "VALUE", "nil");
    return `${slot} ${value}\n`;
  });

  define("actr_goal_focus", (block) => {
    const chunk = cleanSymbol(block.getFieldValue("CHUNK"), "chunk");
    return `(goal-focus ${chunk})\n`;
  });

  define("actr_sgp", (block) => {
    const parameter = cleanParameter(block.getFieldValue("PARAM"));
    const value = valueCode(block, "VALUE", "t");
    return `(sgp ${parameter} ${value})\n`;
  });

  define("actr_run", (block) => {
    const seconds = valueCode(block, "SECONDS", "1");
    return `(run ${seconds})\n`;
  });

  define("actr_production", (block) => {
    const name = cleanSymbol(block.getFieldValue("NAME"), "production");
    const conditions = statementCode(block, "CONDITIONS");
    const actions = statementCode(block, "ACTIONS");
    const parts = [`(p ${name}`];

    if (conditions.trim()) {
      parts.push(indent(conditions));
    }

    parts.push("==>");

    if (actions.trim()) {
      parts.push(indent(actions));
    }

    parts.push(")");
    return `${parts.join("\n")}\n`;
  });

  define("actr_buffer_condition", (block) => {
    const buffer = block.getFieldValue("BUFFER");
    const type = cleanSymbol(block.getFieldValue("TYPE"), "chunk");
    return `${bufferHead("=", buffer)}\n${indent(`isa ${type}`)}${slotsCode(block, "SLOTS")}\n`;
  });

  define("actr_buffer_query", (block) => {
    const buffer = block.getFieldValue("BUFFER");
    return `${bufferHead("?", buffer)}${slotsCode(block, "SLOTS")}\n`;
  });

  define("actr_buffer_action", (block) => {
    const op = block.getFieldValue("OP");
    const buffer = block.getFieldValue("BUFFER");
    const type = cleanSymbol(block.getFieldValue("TYPE"), "chunk");
    if (op === "=") {
      return `${bufferHead(op, buffer)}${slotsCode(block, "SLOTS")}\n`;
    }
    return `${bufferHead(op, buffer)}\n${indent(`isa ${type}`)}${slotsCode(block, "SLOTS")}\n`;
  });

  define("actr_buffer_request", (block) => {
    const buffer = block.getFieldValue("BUFFER");
    const type = cleanSymbol(block.getFieldValue("TYPE"), "chunk");
    return `${bufferHead("+", buffer)}\n${indent(`isa ${type}`)}${slotsCode(block, "SLOTS")}\n`;
  });

  define("actr_buffer_update", (block) => {
    const buffer = block.getFieldValue("BUFFER");
    return `${bufferHead("=", buffer)}${slotsCode(block, "SLOTS")}\n`;
  });

  define("actr_buffer_clear", (block) => `${bufferHead("-", block.getFieldValue("BUFFER"))}\n`);

  define("actr_symbol", (block) => [
    cleanSymbol(block.getFieldValue("VALUE"), "symbol"),
    generator.ORDER_ATOMIC,
  ]);

  define("actr_variable", (block) => {
    const name = cleanSymbol(block.getFieldValue("NAME"), "var").replace(/^=+/, "");
    return [`=${name}`, generator.ORDER_ATOMIC];
  });

  define("actr_nil", () => ["nil", generator.ORDER_ATOMIC]);

  define("actr_raw_lisp", (block) => {
    const code = String(block.getFieldValue("CODE") || "").trim();
    return code ? `${code}\n` : "";
  });

  define("math_number", (block) => [String(Number(block.getFieldValue("NUM"))), generator.ORDER_ATOMIC]);

  define("math_arithmetic", (block) => {
    const opMap = {
      ADD: "+",
      MINUS: "-",
      MULTIPLY: "*",
      DIVIDE: "/",
      POWER: "expt",
    };
    const op = opMap[block.getFieldValue("OP")] || "+";
    const a = valueCode(block, "A", "0");
    const b = valueCode(block, "B", "0");
    return [`(${op} ${a} ${b})`, generator.ORDER_FUNCTION];
  });

  define("math_single", (block) => {
    const opMap = {
      ROOT: "sqrt",
      ABS: "abs",
      NEG: "-",
      LN: "log",
      LOG10: "log10",
      EXP: "exp",
      POW10: "pow10",
      SIN: "sin",
      COS: "cos",
      TAN: "tan",
      ASIN: "asin",
      ACOS: "acos",
      ATAN: "atan",
    };
    const op = opMap[block.getFieldValue("OP")] || "identity";
    const value = valueCode(block, "NUM", "0");
    return [`(${op} ${value})`, generator.ORDER_FUNCTION];
  });

  define("math_round", (block) => {
    const opMap = {
      ROUND: "round",
      ROUNDUP: "ceiling",
      ROUNDDOWN: "floor",
    };
    const op = opMap[block.getFieldValue("OP")] || "round";
    return [`(${op} ${valueCode(block, "NUM", "0")})`, generator.ORDER_FUNCTION];
  });

  define("math_modulo", (block) => {
    const dividend = valueCode(block, "DIVIDEND", "0");
    const divisor = valueCode(block, "DIVISOR", "1");
    return [`(mod ${dividend} ${divisor})`, generator.ORDER_FUNCTION];
  });

  define("math_random_int", (block) => {
    const from = valueCode(block, "FROM", "0");
    const to = valueCode(block, "TO", "1");
    return [`(+ ${from} (random (+ 1 (- ${to} ${from}))))`, generator.ORDER_FUNCTION];
  });

  define("text", (block) => [quoteString(block.getFieldValue("TEXT")), generator.ORDER_ATOMIC]);

  define("text_join", (block) => {
    const itemCount = block.itemCount_ || 0;
    const items = [];
    for (let i = 0; i < itemCount; i += 1) {
      items.push(valueCode(block, `ADD${i}`, '""'));
    }
    return [`(concatenate 'string ${items.join(" ")})`, generator.ORDER_FUNCTION];
  });

  define("logic_boolean", (block) => [
    block.getFieldValue("BOOL") === "TRUE" ? "t" : "nil",
    generator.ORDER_ATOMIC,
  ]);

  define("logic_null", () => ["nil", generator.ORDER_ATOMIC]);

  define("logic_negate", (block) => [
    `(not ${valueCode(block, "BOOL", "nil")})`,
    generator.ORDER_FUNCTION,
  ]);

  define("logic_operation", (block) => {
    const op = block.getFieldValue("OP") === "AND" ? "and" : "or";
    return [
      `(${op} ${valueCode(block, "A", "nil")} ${valueCode(block, "B", "nil")})`,
      generator.ORDER_FUNCTION,
    ];
  });

  define("logic_compare", (block) => {
    const opMap = {
      EQ: "equal",
      NEQ: "/=",
      LT: "<",
      LTE: "<=",
      GT: ">",
      GTE: ">=",
    };
    const op = opMap[block.getFieldValue("OP")] || "equal";
    return [
      `(${op} ${valueCode(block, "A", "nil")} ${valueCode(block, "B", "nil")})`,
      generator.ORDER_FUNCTION,
    ];
  });

  define("variables_get", (block) => {
    const variableName = generator.nameDB_
      ? generator.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME)
      : block.getFieldValue("VAR");
    return [cleanSymbol(variableName, "var"), generator.ORDER_ATOMIC];
  });

  define("variables_set", (block) => {
    const variableName = generator.nameDB_
      ? generator.nameDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME)
      : block.getFieldValue("VAR");
    return `(setf ${cleanSymbol(variableName, "var")} ${valueCode(block, "VALUE", "nil")})\n`;
  });

  define("lists_create_with", (block) => {
    const itemCount = block.itemCount_ || 0;
    const items = [];
    for (let i = 0; i < itemCount; i += 1) {
      items.push(valueCode(block, `ADD${i}`, "nil"));
    }
    return [`(list ${items.join(" ")})`, generator.ORDER_FUNCTION];
  });

  define("controls_if", (block) => {
    const clauses = [];
    for (let i = 0; i <= (block.elseifCount_ || 0); i += 1) {
      const condition = valueCode(block, `IF${i}`, "nil");
      const branch = statementCode(block, `DO${i}`) || "nil";
      clauses.push(`(${condition}\n${indent(branch, "    ")})`);
    }

    if (block.elseCount_) {
      const elseBranch = statementCode(block, "ELSE") || "nil";
      clauses.push(`(t\n${indent(elseBranch, "    ")})`);
    }

    return `(cond\n${indent(clauses.join("\n"))}\n)\n`;
  });

  define("controls_repeat_ext", (block) => {
    const times = valueCode(block, "TIMES", "0");
    const branch = statementCode(block, "DO") || "nil";
    return `(dotimes (i ${times})\n${indent(branch)}\n)\n`;
  });

  define("controls_whileUntil", (block) => {
    const mode = block.getFieldValue("MODE");
    const condition = valueCode(block, "BOOL", "nil");
    const test = mode === "UNTIL" ? `(not ${condition})` : condition;
    const branch = statementCode(block, "DO") || "nil";
    return `(loop while ${test} do\n${indent(branch)}\n)\n`;
  });

  generator.forBlock.default = (block) => `; Unsupported block: ${block.type}\n`;

  window.ACTRLisp = generator;
  window.ACTRGeneratorHelpers = {
    cleanSymbol,
    quoteString,
  };
})();

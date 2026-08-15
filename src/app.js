(function bootActrBlockly() {
  const toolbox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "ACT-R Model",
        colour: "#7f4f24",
        contents: [
          { kind: "block", type: "actr_model" },
          { kind: "block", type: "actr_chunk_type" },
          { kind: "block", type: "actr_slot_name" },
          { kind: "block", type: "actr_goal_focus" },
          {
            kind: "block",
            type: "actr_sgp",
            inputs: {
              VALUE: {
                shadow: {
                  type: "logic_boolean",
                  fields: { BOOL: "TRUE" },
                },
              },
            },
          },
          {
            kind: "block",
            type: "actr_run",
            inputs: {
              SECONDS: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 5 },
                },
              },
            },
          },
          { kind: "block", type: "actr_raw_lisp" },
        ],
      },
      {
        kind: "category",
        name: "Declarative Memory",
        colour: "#b05d24",
        contents: [
          { kind: "block", type: "actr_add_dm" },
          { kind: "block", type: "actr_chunk" },
          {
            kind: "block",
            type: "actr_slot_value",
            inputs: {
              VALUE: {
                shadow: {
                  type: "actr_symbol",
                  fields: { VALUE: "start" },
                },
              },
            },
          },
        ],
      },
      {
        kind: "category",
        name: "Productions",
        colour: "#2f6f4e",
        contents: [
          { kind: "block", type: "actr_production" },
          { kind: "block", type: "actr_buffer_condition" },
          { kind: "block", type: "actr_buffer_query" },
          { kind: "block", type: "actr_buffer_request" },
          { kind: "block", type: "actr_buffer_update" },
          { kind: "block", type: "actr_buffer_clear" },
        ],
      },
      {
        kind: "category",
        name: "ACT-R Values",
        colour: "#5b6472",
        contents: [
          { kind: "block", type: "actr_symbol" },
          { kind: "block", type: "actr_variable" },
          { kind: "block", type: "actr_nil" },
          {
            kind: "block",
            type: "math_number",
            fields: { NUM: 1 },
          },
          {
            kind: "block",
            type: "text",
            fields: { TEXT: "label" },
          },
          {
            kind: "block",
            type: "logic_boolean",
            fields: { BOOL: "TRUE" },
          },
        ],
      },
      {
        kind: "sep",
      },
      {
        kind: "category",
        name: "Logic",
        colour: "%{BKY_LOGIC_HUE}",
        contents: [
          { kind: "block", type: "controls_if" },
          { kind: "block", type: "logic_compare" },
          { kind: "block", type: "logic_operation" },
          { kind: "block", type: "logic_negate" },
          { kind: "block", type: "logic_boolean" },
          { kind: "block", type: "logic_null" },
        ],
      },
      {
        kind: "category",
        name: "Loops",
        colour: "%{BKY_LOOPS_HUE}",
        contents: [
          {
            kind: "block",
            type: "controls_repeat_ext",
            inputs: {
              TIMES: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 10 },
                },
              },
            },
          },
          { kind: "block", type: "controls_whileUntil" },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: "%{BKY_MATH_HUE}",
        contents: [
          {
            kind: "block",
            type: "math_number",
            fields: { NUM: 0 },
          },
          { kind: "block", type: "math_arithmetic" },
          { kind: "block", type: "math_single" },
          { kind: "block", type: "math_round" },
          { kind: "block", type: "math_modulo" },
          { kind: "block", type: "math_random_int" },
        ],
      },
      {
        kind: "category",
        name: "Text",
        colour: "%{BKY_TEXTS_HUE}",
        contents: [
          { kind: "block", type: "text" },
          { kind: "block", type: "text_join" },
        ],
      },
      {
        kind: "category",
        name: "Lists",
        colour: "%{BKY_LISTS_HUE}",
        contents: [{ kind: "block", type: "lists_create_with" }],
      },
      {
        kind: "category",
        name: "Variables",
        colour: "%{BKY_VARIABLES_HUE}",
        custom: "VARIABLE",
      },
    ],
  };

  const sampleXml = `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="actr_model" x="30" y="30">
        <field name="NAME">counting</field>
        <statement name="DECLARATIONS">
          <block type="actr_chunk_type">
            <field name="TYPE">goal</field>
            <statement name="SLOTS">
              <block type="actr_slot_name">
                <field name="NAME">state</field>
                <next>
                  <block type="actr_slot_name">
                    <field name="NAME">count</field>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="actr_chunk_type">
                <field name="TYPE">count-order</field>
                <statement name="SLOTS">
                  <block type="actr_slot_name">
                    <field name="NAME">first</field>
                    <next>
                      <block type="actr_slot_name">
                        <field name="NAME">second</field>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </statement>
        <statement name="BODY">
          <block type="actr_add_dm">
            <statement name="CHUNKS">
              <block type="actr_chunk">
                <field name="NAME">start</field>
                <field name="TYPE">goal</field>
                <statement name="SLOTS">
                  <block type="actr_slot_value">
                    <field name="SLOT">state</field>
                    <value name="VALUE">
                      <shadow type="actr_symbol">
                        <field name="VALUE">start</field>
                      </shadow>
                    </value>
                    <next>
                      <block type="actr_slot_value">
                        <field name="SLOT">count</field>
                        <value name="VALUE">
                          <shadow type="actr_symbol">
                            <field name="VALUE">one</field>
                          </shadow>
                        </value>
                      </block>
                    </next>
                  </block>
                </statement>
                <next>
                  <block type="actr_chunk">
                    <field name="NAME">one-two</field>
                    <field name="TYPE">count-order</field>
                    <statement name="SLOTS">
                      <block type="actr_slot_value">
                        <field name="SLOT">first</field>
                        <value name="VALUE">
                          <shadow type="actr_symbol">
                            <field name="VALUE">one</field>
                          </shadow>
                        </value>
                        <next>
                          <block type="actr_slot_value">
                            <field name="SLOT">second</field>
                            <value name="VALUE">
                              <shadow type="actr_symbol">
                                <field name="VALUE">two</field>
                              </shadow>
                            </value>
                          </block>
                        </next>
                      </block>
                    </statement>
                    <next>
                      <block type="actr_chunk">
                        <field name="NAME">two-three</field>
                        <field name="TYPE">count-order</field>
                        <statement name="SLOTS">
                          <block type="actr_slot_value">
                            <field name="SLOT">first</field>
                            <value name="VALUE">
                              <shadow type="actr_symbol">
                                <field name="VALUE">two</field>
                              </shadow>
                            </value>
                            <next>
                              <block type="actr_slot_value">
                                <field name="SLOT">second</field>
                                <value name="VALUE">
                                  <shadow type="actr_symbol">
                                    <field name="VALUE">three</field>
                                  </shadow>
                                </value>
                              </block>
                            </next>
                          </block>
                        </statement>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </statement>
            <next>
              <block type="actr_goal_focus">
                <field name="CHUNK">start</field>
                <next>
                  <block type="actr_production">
                    <field name="NAME">request-next</field>
                    <statement name="CONDITIONS">
                      <block type="actr_buffer_condition">
                        <field name="BUFFER">goal</field>
                        <field name="TYPE">goal</field>
                        <statement name="SLOTS">
                          <block type="actr_slot_value">
                            <field name="SLOT">state</field>
                            <value name="VALUE">
                              <shadow type="actr_symbol">
                                <field name="VALUE">start</field>
                              </shadow>
                            </value>
                            <next>
                              <block type="actr_slot_value">
                                <field name="SLOT">count</field>
                                <value name="VALUE">
                                  <block type="actr_variable">
                                    <field name="NAME">current</field>
                                  </block>
                                </value>
                              </block>
                            </next>
                          </block>
                        </statement>
                      </block>
                    </statement>
                    <statement name="ACTIONS">
                      <block type="actr_buffer_request">
                        <field name="BUFFER">retrieval</field>
                        <field name="TYPE">count-order</field>
                        <statement name="SLOTS">
                          <block type="actr_slot_value">
                            <field name="SLOT">first</field>
                            <value name="VALUE">
                              <block type="actr_variable">
                                <field name="NAME">current</field>
                              </block>
                            </value>
                          </block>
                        </statement>
                        <next>
                          <block type="actr_buffer_update">
                            <field name="BUFFER">goal</field>
                            <statement name="SLOTS">
                              <block type="actr_slot_value">
                                <field name="SLOT">state</field>
                                <value name="VALUE">
                                  <shadow type="actr_symbol">
                                    <field name="VALUE">retrieving</field>
                                  </shadow>
                                </value>
                              </block>
                            </statement>
                          </block>
                        </next>
                      </block>
                    </statement>
                    <next>
                      <block type="actr_production">
                        <field name="NAME">store-next</field>
                        <statement name="CONDITIONS">
                          <block type="actr_buffer_condition">
                            <field name="BUFFER">goal</field>
                            <field name="TYPE">goal</field>
                            <statement name="SLOTS">
                              <block type="actr_slot_value">
                                <field name="SLOT">state</field>
                                <value name="VALUE">
                                  <shadow type="actr_symbol">
                                    <field name="VALUE">retrieving</field>
                                  </shadow>
                                </value>
                              </block>
                            </statement>
                            <next>
                              <block type="actr_buffer_condition">
                                <field name="BUFFER">retrieval</field>
                                <field name="TYPE">count-order</field>
                                <statement name="SLOTS">
                                  <block type="actr_slot_value">
                                    <field name="SLOT">second</field>
                                    <value name="VALUE">
                                      <block type="actr_variable">
                                        <field name="NAME">next</field>
                                      </block>
                                    </value>
                                  </block>
                                </statement>
                              </block>
                            </next>
                          </block>
                        </statement>
                        <statement name="ACTIONS">
                          <block type="actr_buffer_update">
                            <field name="BUFFER">goal</field>
                            <statement name="SLOTS">
                              <block type="actr_slot_value">
                                <field name="SLOT">state</field>
                                <value name="VALUE">
                                  <shadow type="actr_symbol">
                                    <field name="VALUE">start</field>
                                  </shadow>
                                </value>
                                <next>
                                  <block type="actr_slot_value">
                                    <field name="SLOT">count</field>
                                    <value name="VALUE">
                                      <block type="actr_variable">
                                        <field name="NAME">next</field>
                                      </block>
                                    </value>
                                  </block>
                                </next>
                              </block>
                            </statement>
                          </block>
                        </statement>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </xml>
  `;

  const workspace = Blockly.inject("blocklyDiv", {
    toolbox,
    renderer: "zelos",
    trashcan: true,
    collapse: true,
    comments: true,
    disable: true,
    grid: {
      spacing: 24,
      length: 3,
      colour: "#cfd9de",
      snap: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 0.86,
      maxScale: 1.8,
      minScale: 0.35,
      scaleSpeed: 1.08,
    },
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
  });

  const codeOutput = document.getElementById("codeOutput");
  const statusText = document.getElementById("statusText");
  const runButton = document.getElementById("runButton");
  const runOutput = document.getElementById("runOutput");
  const runStatusText = document.getElementById("runStatusText");
  const loadInput = document.getElementById("loadInput");
  const storageKey = "blockly-act-r-workspace";
  const runnerEndpoint = "https://act-r-2649d1971396.herokuapp.com/run-model";
  const generatedModelUrlBase = "https://httpbingo.org/base64/";
  const defaultRunSeconds = 5;

  function setStatus(text) {
    statusText.textContent = text;
  }

  function setRunStatus(text) {
    runStatusText.textContent = text;
  }

  function generateCode() {
    try {
      const code = window.ACTRLisp.workspaceToCode(workspace);
      codeOutput.textContent = code || ";";
      setStatus(`${workspace.getAllBlocks(false).length} blocks`);
      return code;
    } catch (error) {
      codeOutput.textContent = `; Generator error: ${error.message}`;
      setStatus("Generator error");
      return "";
    }
  }

  function encodeBase64(text) {
    const bytes = new TextEncoder().encode(text);
    const chunkSize = 0x8000;
    let binary = "";

    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }

    return btoa(binary);
  }

  function createGeneratedModelUrl(code) {
    return `${generatedModelUrlBase}${encodeURIComponent(encodeBase64(code))}`;
  }

  function inferRunSeconds(code) {
    const matches = [...code.matchAll(/\(run\s+([0-9]+(?:\.[0-9]+)?)\s*\)/gi)];
    const match = matches[matches.length - 1];
    const seconds = match ? Number(match[1]) : defaultRunSeconds;
    return Number.isFinite(seconds) && seconds > 0 ? seconds : defaultRunSeconds;
  }

  function formatSeconds(value) {
    return Number.isFinite(value) ? `${Number(value.toFixed(3))}s` : "";
  }

  function formatRunResult(result, codeLength) {
    const lines = [];
    lines.push(`Run ID: ${result.run_id || "unknown"}`);

    if (result.current_model) {
      lines.push(`Model: ${result.current_model}`);
    }

    if (Array.isArray(result.models) && result.models.length) {
      lines.push(`Loaded models: ${result.models.join(", ")}`);
    }

    lines.push(`Model source: generated HTTPS payload (${codeLength} chars)`);

    if (Number.isFinite(result.run_seconds)) {
      lines.push(`Run seconds: ${formatSeconds(result.run_seconds)}`);
    }

    if (Number.isFinite(result.elapsed_seconds)) {
      lines.push(`Elapsed: ${formatSeconds(result.elapsed_seconds)}`);
    }

    if (result.run_result !== undefined) {
      lines.push(`Run result: ${JSON.stringify(result.run_result)}`);
    }

    if (result.trace) {
      lines.push("", "Trace:", result.trace.trimEnd());
    } else {
      lines.push("", "Response:", JSON.stringify(result, null, 2));
    }

    return lines.join("\n");
  }

  function formatRunError(error, result) {
    const details = result ? JSON.stringify(result, null, 2) : "";
    return [`; Run failed: ${error.message}`, details].filter(Boolean).join("\n\n");
  }

  async function runModel() {
    const code = generateCode();

    if (!code.trim()) {
      setRunStatus("No model");
      runOutput.textContent = "; Add ACT-R blocks before running.";
      return;
    }

    const runSeconds = inferRunSeconds(code);
    const modelUrl = createGeneratedModelUrl(code);
    runButton.disabled = true;
    runButton.setAttribute("aria-busy", "true");
    setRunStatus("Running");
    runOutput.textContent = `Submitting model for a ${formatSeconds(runSeconds)} run...`;

    try {
      const response = await fetch(runnerEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_url: modelUrl,
          run_seconds: runSeconds,
        }),
      });
      const text = await response.text();
      let result = null;

      try {
        result = text ? JSON.parse(text) : null;
      } catch (error) {
        throw new Error(`Runner returned non-JSON response (${response.status}).`);
      }

      if (!response.ok || !result || result.ok === false) {
        const runError = new Error((result && result.error) || `Runner returned HTTP ${response.status}.`);
        runError.result = result;
        throw runError;
      }

      setRunStatus("Complete");
      runOutput.textContent = formatRunResult(result, code.length);
    } catch (error) {
      setRunStatus("Failed");
      runOutput.textContent = formatRunError(error, error.result);
    } finally {
      runButton.disabled = false;
      runButton.removeAttribute("aria-busy");
    }
  }

  function loadXmlText(xmlText) {
    workspace.clear();
    const xml = Blockly.Xml.textToDom
      ? Blockly.Xml.textToDom(xmlText)
      : Blockly.utils.xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, workspace);
    Blockly.svgResize(workspace);
    workspace.scrollCenter();
    generateCode();
  }

  function saveWorkspace() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToPrettyText(xml);
    localStorage.setItem(storageKey, text);
    setStatus("Saved");
  }

  function restoreWorkspace() {
    const saved = localStorage.getItem(storageKey);
    loadXmlText(saved || sampleXml);
  }

  function download(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  runButton.addEventListener("click", runModel);

  document.getElementById("sampleButton").addEventListener("click", () => {
    loadXmlText(sampleXml);
    setStatus("Sample loaded");
  });

  document.getElementById("copyButton").addEventListener("click", async () => {
    const code = codeOutput.textContent;
    await navigator.clipboard.writeText(code);
    setStatus("Copied");
  });

  document.getElementById("downloadButton").addEventListener("click", () => {
    download("actr-model.lisp", codeOutput.textContent, "text/x-common-lisp;charset=utf-8");
    setStatus("Downloaded");
  });

  document.getElementById("saveButton").addEventListener("click", saveWorkspace);

  document.getElementById("loadButton").addEventListener("click", () => {
    loadInput.click();
  });

  document.getElementById("clearButton").addEventListener("click", () => {
    workspace.clear();
    generateCode();
    setStatus("Cleared");
  });

  loadInput.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    const text = await file.text();
    loadXmlText(text);
    setStatus("Loaded");
    loadInput.value = "";
  });

  workspace.addChangeListener((event) => {
    if (event.isUiEvent) {
      return;
    }
    generateCode();
  });

  window.addEventListener("resize", () => Blockly.svgResize(workspace));
  restoreWorkspace();
})();

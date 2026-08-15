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
  const loadInput = document.getElementById("loadInput");
  const storageKey = "blockly-act-r-workspace";

  function setStatus(text) {
    statusText.textContent = text;
  }

  function generateCode() {
    try {
      const code = window.ACTRLisp.workspaceToCode(workspace);
      codeOutput.textContent = code || ";";
      setStatus(`${workspace.getAllBlocks(false).length} blocks`);
    } catch (error) {
      codeOutput.textContent = `; Generator error: ${error.message}`;
      setStatus("Generator error");
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

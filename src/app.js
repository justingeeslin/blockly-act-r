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
          {
            kind: "block",
            type: "actr_output",
            inputs: {
              MESSAGE: {
                shadow: {
                  type: "text",
                  fields: { TEXT: "message" },
                },
              },
            },
          },
        ],
      },
      {
        kind: "category",
        name: "Environment",
        colour: "#5b5fa8",
        contents: [
          { kind: "block", type: "actr_reset" },
          {
            kind: "block",
            type: "actr_open_exp_window",
            inputs: {
              TITLE: {
                shadow: {
                  type: "text",
                  fields: { TEXT: "Experiment" },
                },
              },
              VISIBLE: {
                shadow: {
                  type: "logic_boolean",
                  fields: { BOOL: "FALSE" },
                },
              },
              WIDTH: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 320 },
                },
              },
              HEIGHT: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 220 },
                },
              },
            },
          },
          {
            kind: "block",
            type: "actr_add_text_to_exp_window",
            inputs: {
              TEXT: {
                shadow: {
                  type: "text",
                  fields: { TEXT: "A" },
                },
              },
              WINDOW: {
                shadow: {
                  type: "actr_symbol",
                  fields: { VALUE: "*window*" },
                },
              },
              X: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 150 },
                },
              },
              Y: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 95 },
                },
              },
            },
          },
          {
            kind: "block",
            type: "actr_add_button_to_exp_window",
            inputs: {
              WINDOW: {
                shadow: {
                  type: "actr_symbol",
                  fields: { VALUE: "*window*" },
                },
              },
              TEXT: {
                shadow: {
                  type: "text",
                  fields: { TEXT: "OK" },
                },
              },
              X: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 120 },
                },
              },
              Y: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 130 },
                },
              },
              WIDTH: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 80 },
                },
              },
              HEIGHT: {
                shadow: {
                  type: "math_number",
                  fields: { NUM: 30 },
                },
              },
              ACTION: {
                shadow: {
                  type: "actr_raw_value",
                  fields: { CODE: "nil" },
                },
              },
            },
          },
          { kind: "block", type: "actr_clear_exp_window" },
          {
            kind: "block",
            type: "actr_install_device",
            inputs: {
              DEVICE: {
                shadow: {
                  type: "actr_symbol",
                  fields: { VALUE: "*window*" },
                },
              },
            },
          },
          { kind: "block", type: "actr_start_hand_at_mouse" },
          { kind: "block", type: "actr_proc_display" },
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
          { kind: "block", type: "actr_raw_value" },
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

  const samples = [
    {
      id: "counting",
      name: "Counting",
      meta: "Goal and retrieval buffers",
      xml: sampleXml,
    },
    {
      id: "visual-motor-keypress",
      name: "Visual motor keypress",
      meta: "Visual-location, visual, and manual buffers",
      lisp: `
        (clear-all)

        (define-model visual-motor-keypress
          (sgp :v t :trace-detail high :show-focus t)
          (chunk-type goal state)

          (add-dm
            (start isa goal
              state find-letter))

          (goal-focus start)

          (p find-letter
            =goal>
              isa goal
              state find-letter
            ?visual-location>
              buffer empty
          ==>
            +visual-location>
              isa visual-location
              kind text
              :attended nil
            =goal>
              state attend-letter
          )

          (p attend-letter
            =goal>
              isa goal
              state attend-letter
            =visual-location>
              isa visual-location
            ?visual>
              state free
          ==>
            +visual>
              isa move-attention
              screen-pos =visual-location
            =goal>
              state press-letter
          )

          (p press-letter
            =goal>
              isa goal
              state press-letter
            =visual>
              isa text
              value =letter
            ?manual>
              state free
          ==>
            +manual>
              isa press-key
              key =letter
            =goal>
              state done
            !output! (=letter)
          )
        )

        (defvar *letter-window* nil)
        (reset)
        (setf *letter-window* (open-exp-window "Letter keyboard sample" :visible nil :width 320 :height 220))
        (add-text-to-exp-window *letter-window* "A" :x 150 :y 95)
        (install-device *letter-window*)
        (proc-display)
        (run 2)
      `,
    },
    {
      id: "fitts-law",
      name: "Fitts' Law",
      meta: "Button target, visual attention, mouse movement, and click",
      lisp: `
        (clear-all)

        (define-model fitts-law
          (sgp :v t :trace-detail high :show-focus t :needs-mouse t :incremental-mouse-moves t)
          (chunk-type goal state)

          (add-dm
            (start isa goal
              state find-target))

          (goal-focus start)

          (p find-target
            =goal>
              isa goal
              state find-target
            ?visual-location>
              buffer empty
          ==>
            +visual-location>
              isa visual-location
              :attended nil
            =goal>
              state attend-and-move
          )

          (p attend-and-move
            =goal>
              isa goal
              state attend-and-move
            =visual-location>
              isa visual-location
            ?visual>
              state free
            ?manual>
              state free
          ==>
            +visual>
              isa move-attention
              screen-pos =visual-location
            +manual>
              isa move-cursor
              loc =visual-location
            =goal>
              state click-target
          )

          (p click-target
            =goal>
              isa goal
              state click-target
            ?manual>
              state free
          ==>
            +manual>
              isa click-mouse
            =goal>
              state done
            !output! ("clicked target")
          )
        )

        (defvar *fitts-window* nil)
        (reset)
        (setf *fitts-window* (open-exp-window "Fitts' Law" :visible nil :width 420 :height 260))
        (add-button-to-exp-window *fitts-window* :text "Target" :x 282 :y 112 :width 96 :height 42)
        (install-device *fitts-window*)
        (start-hand-at-mouse)
        (proc-display)
        (run 3)
      `,
    },
  ];
  const defaultSample = samples[0];

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
  const sampleButton = document.getElementById("sampleButton");
  const samplesMenu = document.getElementById("samplesMenu");
  const loadInput = document.getElementById("loadInput");
  const traceBackButton = document.getElementById("traceBackButton");
  const tracePlayButton = document.getElementById("tracePlayButton");
  const traceForwardButton = document.getElementById("traceForwardButton");
  const traceSpeedSelect = document.getElementById("traceSpeedSelect");
  const traceSlider = document.getElementById("traceSlider");
  const traceTimeLabel = document.getElementById("traceTimeLabel");
  const traceEventLabel = document.getElementById("traceEventLabel");
  const visualizerStage = document.getElementById("visualizerStage");
  const architectureEdges = document.getElementById("architectureEdges");
  const memoryNode = document.getElementById("memoryNode");
  const declarativeChunkList = document.getElementById("declarativeChunkList");
  const bufferGrid = document.getElementById("bufferGrid");
  const chunkToken = document.getElementById("chunkToken");
  const storageKey = "blockly-act-r-workspace";
  const runnerEndpoint = "https://act-r-2649d1971396.herokuapp.com/run-model";
  const generatedModelUrlBase = "https://httpbingo.org/base64/";
  const defaultRunSeconds = 5;
  const defaultBuffers = [
    "goal",
    "retrieval",
    "imaginal",
    "visual-location",
    "visual",
    "manual",
    "vocal",
    "aural",
    "temporal",
  ];
  const coreArchitectureBuffers = new Set(defaultBuffers);
  const declarativeBridgeBuffers = new Set(["goal", "retrieval"]);
  const environmentBuffers = new Set(["visual-location", "visual", "manual", "aural"]);
  let traceFrames = [];
  let traceFrameIndex = 0;
  let tracePlaybackTimer = null;
  let traceMotionTimer = null;
  let traceIsPlaying = false;
  let activeHighlightId = null;
  let traceContext = null;

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

  function getTraceText(result) {
    if (!result) {
      return "";
    }

    for (const key of ["trace", "stack_trace", "stackTrace", "stack"]) {
      if (typeof result[key] === "string" && result[key].trim()) {
        return result[key];
      }

      if (Array.isArray(result[key]) && result[key].length) {
        return result[key].join("\n");
      }
    }

    return "";
  }

  function formatRunResult(result, codeLength) {
    const lines = [];
    const traceText = getTraceText(result);

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

    if (traceText) {
      lines.push("", "Trace:", traceText.trimEnd());
    } else {
      lines.push("", "Response:", JSON.stringify(result, null, 2));
    }

    return lines.join("\n");
  }

  function formatRunError(error, result) {
    const details = result ? JSON.stringify(result, null, 2) : "";
    return [`; Run failed: ${error.message}`, details].filter(Boolean).join("\n\n");
  }

  function traceSecondsLabel(value) {
    return Number.isFinite(value) ? `${value.toFixed(3)}s` : "0.000s";
  }

  function cleanActrSymbol(value, fallback = "") {
    const helper = window.ACTRGeneratorHelpers && window.ACTRGeneratorHelpers.cleanSymbol;
    const cleaned = helper
      ? helper(value, fallback)
      : String(value || "")
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[()"';]/g, "");

    return String(cleaned || fallback)
      .replace(/[>,]/g, "")
      .trim();
  }

  function normalizeTraceKey(value, fallback = "") {
    return cleanActrSymbol(value, fallback).toLowerCase();
  }

  function normalizeBufferName(value) {
    return normalizeTraceKey(value, "goal").replace(/^[+=?-]+/, "").replace(/>$/, "");
  }

  function bufferNodeId(buffer) {
    return `buffer:${normalizeBufferName(buffer)}`;
  }

  function declarativeChunkNodeId(chunk) {
    const key = typeof chunk === "string" ? chunk : chunk && chunk.key;
    return key ? `declarative-chunk:${normalizeTraceKey(key)}` : "declarative-memory";
  }

  function sourceForBufferSet(buffer, catalogChunk) {
    const bufferKey = normalizeBufferName(buffer);

    if (declarativeBridgeBuffers.has(bufferKey)) {
      return {
        from: catalogChunk ? declarativeChunkNodeId(catalogChunk) : "declarative-memory",
        edgeFrom: "declarative-memory",
      };
    }

    if (environmentBuffers.has(bufferKey)) {
      return { from: "environment" };
    }

    return { from: "productions" };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function collectStatementChain(startBlock) {
    const blocks = [];
    const seen = new Set();
    let current = startBlock;

    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      blocks.push(current);
      current = current.nextConnection && current.nextConnection.targetBlock();
    }

    return blocks;
  }

  function generatedValueForBlock(block) {
    if (!block) {
      return "";
    }

    try {
      const code = window.ACTRLisp.blockToCode(block);
      const text = Array.isArray(code) ? code[0] : code;
      return String(text || "").trim().replace(/\s+/g, " ");
    } catch (error) {
      return cleanActrSymbol(block.getFieldValue("VALUE") || block.getFieldValue("NAME"), "");
    }
  }

  function readSlotValues(block) {
    const slots = {};
    const slotBlocks = collectStatementChain(block.getInputTargetBlock("SLOTS"));

    for (const slotBlock of slotBlocks) {
      if (slotBlock.type !== "actr_slot_value") {
        continue;
      }

      const slot = normalizeTraceKey(slotBlock.getFieldValue("SLOT"), "slot");
      slots[slot] = generatedValueForBlock(slotBlock.getInputTargetBlock("VALUE"));
    }

    return slots;
  }

  function cloneChunk(chunk) {
    if (!chunk) {
      return null;
    }

    return {
      key: chunk.key,
      name: chunk.name,
      type: chunk.type,
      slots: { ...(chunk.slots || {}) },
      pending: Boolean(chunk.pending),
    };
  }

  function cloneBufferStates(buffers) {
    const copy = {};

    for (const [buffer, chunk] of Object.entries(buffers)) {
      copy[buffer] = cloneChunk(chunk);
    }

    return copy;
  }

  function readBufferDescriptor(block, role) {
    const descriptor = {
      blockId: block.id,
      blockType: block.type,
      role,
      op: "",
      buffer: "",
      type: "chunk",
      slots: readSlotValues(block),
    };

    if (block.type === "actr_buffer_condition") {
      descriptor.op = "?";
      descriptor.buffer = normalizeBufferName(block.getFieldValue("BUFFER"));
      descriptor.type = cleanActrSymbol(block.getFieldValue("TYPE"), "chunk");
      return descriptor;
    }

    if (block.type === "actr_buffer_query") {
      descriptor.op = "?";
      descriptor.buffer = normalizeBufferName(block.getFieldValue("BUFFER"));
      return descriptor;
    }

    if (block.type === "actr_buffer_request") {
      descriptor.op = "+";
      descriptor.buffer = normalizeBufferName(block.getFieldValue("BUFFER"));
      descriptor.type = cleanActrSymbol(block.getFieldValue("TYPE"), "chunk");
      return descriptor;
    }

    if (block.type === "actr_buffer_update") {
      descriptor.op = "=";
      descriptor.buffer = normalizeBufferName(block.getFieldValue("BUFFER"));
      return descriptor;
    }

    if (block.type === "actr_buffer_clear") {
      descriptor.op = "-";
      descriptor.buffer = normalizeBufferName(block.getFieldValue("BUFFER"));
      return descriptor;
    }

    if (block.type === "actr_buffer_action") {
      descriptor.op = block.getFieldValue("OP") || "+";
      descriptor.buffer = normalizeBufferName(block.getFieldValue("BUFFER"));
      descriptor.type = cleanActrSymbol(block.getFieldValue("TYPE"), "chunk");
      return descriptor;
    }

    return null;
  }

  function buildWorkspaceTraceContext() {
    const chunks = new Map();
    const productions = new Map();
    let goalFocusBlockId = "";
    let goalFocusChunkKey = "";
    let goalFocusChunkName = "";

    for (const block of workspace.getAllBlocks(false)) {
      if (block.type === "actr_chunk") {
        const name = cleanActrSymbol(block.getFieldValue("NAME"), "chunk");
        const key = normalizeTraceKey(name);
        chunks.set(key, {
          key,
          name,
          type: cleanActrSymbol(block.getFieldValue("TYPE"), "chunk"),
          slots: readSlotValues(block),
          pending: false,
        });
      }

      if (block.type === "actr_goal_focus") {
        goalFocusBlockId = block.id;
        goalFocusChunkName = cleanActrSymbol(block.getFieldValue("CHUNK"), "chunk");
        goalFocusChunkKey = normalizeTraceKey(goalFocusChunkName);
      }

      if (block.type === "actr_production") {
        const name = cleanActrSymbol(block.getFieldValue("NAME"), "production");
        const production = {
          key: normalizeTraceKey(name),
          name,
          blockId: block.id,
          actions: [],
          conditions: [],
        };

        for (const conditionBlock of collectStatementChain(block.getInputTargetBlock("CONDITIONS"))) {
          const descriptor = readBufferDescriptor(conditionBlock, "condition");
          if (descriptor && descriptor.buffer) {
            production.conditions.push(descriptor);
          }
        }

        for (const actionBlock of collectStatementChain(block.getInputTargetBlock("ACTIONS"))) {
          const descriptor = readBufferDescriptor(actionBlock, "action");
          if (descriptor && descriptor.buffer) {
            production.actions.push(descriptor);
          }
        }

        productions.set(production.key, production);
      }
    }

    return {
      chunks,
      productions,
      goalFocusBlockId,
      goalFocusChunkKey,
      goalFocusChunkName,
    };
  }

  function parseTimedTraceLine(line, lineNumber) {
    const match = line.match(/^\s*([0-9]+(?:\.[0-9]+)?)\s+(\S+)\s+(.*?)\s*$/);
    if (!match) {
      return null;
    }

    const time = Number(match[1]);
    if (!Number.isFinite(time)) {
      return null;
    }

    const source = normalizeTraceKey(match[2]);
    const detail = match[3].trim();
    const base = {
      time,
      source,
      detail,
      raw: line.trim(),
      lineNumber,
      kind: "trace",
      buffer: "",
      chunk: "",
      production: "",
      blockId: "",
      label: detail,
      motion: null,
    };

    let detailMatch = detail.match(/\bPRODUCTION-(FIRED|SELECTED)\s+([^\s()]+)/i);
    if (detailMatch) {
      return {
        ...base,
        kind: "production",
        phase: detailMatch[1].toLowerCase(),
        production: normalizeTraceKey(detailMatch[2]),
        productionName: normalizeTraceKey(detailMatch[2]),
      };
    }

    detailMatch = detail.match(/\bSET-BUFFER-CHUNK\s+([^\s()]+)\s+([^\s()]+)/i);
    if (detailMatch) {
      return {
        ...base,
        kind: "buffer-set",
        buffer: normalizeBufferName(detailMatch[1]),
        chunk: normalizeTraceKey(detailMatch[2]),
        chunkName: normalizeTraceKey(detailMatch[2]),
      };
    }

    detailMatch = detail.match(/\bMOD-BUFFER-CHUNK\s+([^\s()]+)/i);
    if (detailMatch) {
      return {
        ...base,
        kind: "buffer-modify",
        buffer: normalizeBufferName(detailMatch[1]),
      };
    }

    detailMatch = detail.match(/\bCLEAR-BUFFER\s+([^\s()]+)/i);
    if (detailMatch) {
      return {
        ...base,
        kind: "buffer-clear",
        buffer: normalizeBufferName(detailMatch[1]),
      };
    }

    detailMatch = detail.match(/\bBUFFER-READ-ACTION\s+([^\s()]+)/i);
    if (detailMatch) {
      return {
        ...base,
        kind: "buffer-read",
        buffer: normalizeBufferName(detailMatch[1]),
      };
    }

    detailMatch = detail.match(/\bQUERY-BUFFER-ACTION\s+([^\s()]+)/i);
    if (detailMatch) {
      return {
        ...base,
        kind: "buffer-query",
        buffer: normalizeBufferName(detailMatch[1]),
      };
    }

    detailMatch = detail.match(/\bRETRIEVED-CHUNK\s+([^\s()]+)/i);
    if (detailMatch) {
      return {
        ...base,
        kind: "chunk-retrieved",
        buffer: "retrieval",
        chunk: normalizeTraceKey(detailMatch[1]),
        chunkName: normalizeTraceKey(detailMatch[1]),
      };
    }

    if (/\bSTART-RETRIEVAL\b/i.test(detail) || /\bRETRIEVAL-REQUEST\b/i.test(detail)) {
      return {
        ...base,
        kind: "buffer-request",
        buffer: "retrieval",
      };
    }

    return base;
  }

  function parseTraceEvents(traceText) {
    return String(traceText || "")
      .split(/\r?\n/)
      .map((line, index) => parseTimedTraceLine(line, index))
      .filter(Boolean)
      .sort((a, b) => a.time - b.time || a.lineNumber - b.lineNumber);
  }

  function isVariableValue(value) {
    return /^=[^\s]+$/.test(String(value || ""));
  }

  function resolveSlotValue(value, bindings) {
    const key = normalizeTraceKey(value);
    return isVariableValue(value) && bindings[key] ? bindings[key] : value;
  }

  function resolveSlotValues(slots, bindings) {
    const resolved = {};

    for (const [slot, value] of Object.entries(slots || {})) {
      resolved[slot] = resolveSlotValue(value, bindings);
    }

    return resolved;
  }

  function valuesMatch(expected, actual) {
    if (isVariableValue(expected)) {
      return true;
    }

    return normalizeTraceKey(expected) === normalizeTraceKey(actual);
  }

  function inferProductionBindings(production, buffers) {
    const bindings = {};

    if (!production) {
      return bindings;
    }

    for (const condition of production.conditions) {
      const chunk = buffers[condition.buffer];
      if (!chunk) {
        continue;
      }

      for (const [slot, expected] of Object.entries(condition.slots || {})) {
        if (isVariableValue(expected) && chunk.slots && chunk.slots[slot] !== undefined) {
          bindings[normalizeTraceKey(expected)] = chunk.slots[slot];
        }
      }
    }

    return bindings;
  }

  function findMatchingChunk(context, type, slots) {
    const typeKey = normalizeTraceKey(type);
    const slotEntries = Object.entries(slots || {});

    if (!slotEntries.length) {
      return null;
    }

    for (const chunk of context.chunks.values()) {
      if (typeKey && normalizeTraceKey(chunk.type) !== typeKey) {
        continue;
      }

      const matchesSlots = slotEntries.every(([slot, value]) => {
        if (!value || isVariableValue(value)) {
          return false;
        }

        return chunk.slots && chunk.slots[slot] !== undefined && valuesMatch(value, chunk.slots[slot]);
      });

      if (matchesSlots) {
        return chunk;
      }
    }

    return null;
  }

  function findBufferAction(production, op, buffer) {
    if (!production) {
      return null;
    }

    const bufferKey = normalizeBufferName(buffer);
    const candidates = production.actions.filter((action) => action.buffer === bufferKey);

    if (op === "-") {
      return candidates.find((action) => action.op === "-") || candidates.find((action) => action.op === "+") || null;
    }

    return candidates.find((action) => action.op === op) || candidates[0] || null;
  }

  function findBufferCondition(production, buffer) {
    if (!production) {
      return null;
    }

    const bufferKey = normalizeBufferName(buffer);
    return production.conditions.find((condition) => condition.buffer === bufferKey) || null;
  }

  function resolveTraceBlockId(event, context, activeProductionKey) {
    const productionKey = event.production || activeProductionKey;
    const production = context.productions.get(productionKey);

    if (event.kind === "production") {
      return production ? production.blockId : "";
    }

    if (event.kind === "buffer-read" || event.kind === "buffer-query") {
      const condition = findBufferCondition(production, event.buffer);
      return condition ? condition.blockId : production && production.blockId;
    }

    if (event.kind === "buffer-modify") {
      const action = findBufferAction(production, "=", event.buffer);
      return action ? action.blockId : production && production.blockId;
    }

    if (event.kind === "buffer-request" || event.kind === "chunk-retrieved") {
      const action = findBufferAction(production, "+", event.buffer);
      return action ? action.blockId : production && production.blockId;
    }

    if (event.kind === "buffer-clear") {
      const action = findBufferAction(production, "-", event.buffer);
      return action ? action.blockId : production && production.blockId;
    }

    if (event.kind === "buffer-set") {
      const action = findBufferAction(production, "+", event.buffer) || findBufferAction(production, "=", event.buffer);
      if (action) {
        return action.blockId;
      }

      if (event.buffer === "goal" && context.goalFocusBlockId) {
        return context.goalFocusBlockId;
      }
    }

    return production ? production.blockId : "";
  }

  function formatTraceEventLabel(event, context, activeProductionKey) {
    const productionKey = event.production || activeProductionKey;
    const production = context.productions.get(productionKey);
    const productionName = production ? production.name : productionKey;
    const chunk = event.chunk && context.chunks.get(event.chunk);
    const chunkName = chunk ? chunk.name : event.chunkName || event.chunk;

    if (event.kind === "production") {
      const namedProduction = context.productions.get(event.production);
      return `${traceSecondsLabel(event.time)} - ${namedProduction ? namedProduction.name : productionName} ${event.phase}`;
    }

    if (event.kind === "buffer-set") {
      return `${traceSecondsLabel(event.time)} - ${event.buffer} buffer gets ${chunkName || "chunk"}`;
    }

    if (event.kind === "buffer-clear") {
      return `${traceSecondsLabel(event.time)} - ${event.buffer} buffer cleared`;
    }

    if (event.kind === "buffer-modify") {
      return `${traceSecondsLabel(event.time)} - ${event.buffer} buffer modified by ${productionName || "production"}`;
    }

    if (event.kind === "buffer-request") {
      return `${traceSecondsLabel(event.time)} - ${event.buffer} request started`;
    }

    if (event.kind === "chunk-retrieved") {
      return `${traceSecondsLabel(event.time)} - retrieved ${chunkName || "chunk"}`;
    }

    if (event.kind === "buffer-read" || event.kind === "buffer-query") {
      return `${traceSecondsLabel(event.time)} - ${event.buffer} buffer checked`;
    }

    return `${traceSecondsLabel(event.time)} - ${event.detail}`;
  }

  function applyTraceEventToBuffers(event, buffers, context, activeProductionKey, bindings) {
    const production = context.productions.get(activeProductionKey);

    if (event.kind === "production") {
      event.motion = null;
      return;
    }

    if (event.kind === "buffer-read" || event.kind === "buffer-query") {
      event.motion = {
        from: bufferNodeId(event.buffer),
        to: "productions",
        buffer: event.buffer,
        label: event.buffer,
      };
      return;
    }

    if (event.kind === "chunk-retrieved") {
      const catalogChunk = event.chunk && context.chunks.get(event.chunk);
      const retrievedChunk =
        catalogChunk ||
        (event.chunk && event.chunk !== "nil"
          ? {
              key: event.chunk,
              name: event.chunkName || event.chunk,
              type: "chunk",
              slots: {},
              pending: false,
            }
          : null);

      buffers.retrieval = cloneChunk(retrievedChunk);
      event.motion = retrievedChunk
        ? {
            from: catalogChunk ? declarativeChunkNodeId(catalogChunk) : "declarative-memory",
            edgeFrom: "declarative-memory",
            to: bufferNodeId("retrieval"),
            buffer: "retrieval",
            label: retrievedChunk.name,
          }
        : null;
      return;
    }

    if (event.kind === "buffer-set") {
      const catalogChunk = event.chunk && context.chunks.get(event.chunk);
      const nextChunk =
        catalogChunk ||
        (event.chunk && event.chunk !== "nil"
          ? {
              key: event.chunk,
              name: event.chunkName || event.chunk,
              type: "chunk",
              slots: {},
              pending: false,
            }
          : null);

      event.motion = nextChunk
        ? {
            ...sourceForBufferSet(event.buffer, catalogChunk),
            to: bufferNodeId(event.buffer),
            buffer: event.buffer,
            label: nextChunk.name,
          }
        : null;
      buffers[event.buffer] = cloneChunk(nextChunk);
      return;
    }

    if (event.kind === "buffer-clear") {
      const currentChunk = buffers[event.buffer];
      event.motion = currentChunk
        ? {
            from: bufferNodeId(event.buffer),
            to: "productions",
            buffer: event.buffer,
            label: currentChunk.name,
          }
        : null;
      buffers[event.buffer] = null;
      return;
    }

    if (event.kind === "buffer-modify") {
      const action = findBufferAction(production, "=", event.buffer);
      const currentChunk = cloneChunk(buffers[event.buffer]) || {
        key: `${event.buffer}-chunk`,
        name: `${event.buffer}-chunk`,
        type: action ? action.type : "chunk",
        slots: {},
        pending: false,
      };
      const slots = action ? resolveSlotValues(action.slots, bindings) : {};

      buffers[event.buffer] = {
        ...currentChunk,
        pending: false,
        slots: {
          ...(currentChunk.slots || {}),
          ...slots,
        },
      };
      event.motion = {
        from: "productions",
        to: bufferNodeId(event.buffer),
        buffer: event.buffer,
        label: buffers[event.buffer].name,
      };
      return;
    }

    if (event.kind === "buffer-request") {
      const action = findBufferAction(production, "+", event.buffer);
      const slots = action ? resolveSlotValues(action.slots, bindings) : {};
      const requestedChunk = action ? findMatchingChunk(context, action.type, slots) : null;

      buffers[event.buffer] = {
        key: requestedChunk ? requestedChunk.key : `${event.buffer}-request`,
        name: requestedChunk ? requestedChunk.name : "requesting",
        type: action ? action.type : "request",
        slots,
        pending: true,
      };
      event.motion = {
        from: "productions",
        to: bufferNodeId(event.buffer),
        buffer: event.buffer,
        label: "request",
      };
    }
  }

  function buildTraceFrames(events, context) {
    const bufferOrder = new Set(defaultBuffers);
    for (const event of events) {
      if (event.buffer) {
        bufferOrder.add(event.buffer);
      }
    }

    const buffers = {};
    for (const buffer of bufferOrder) {
      buffers[buffer] = null;
    }

    if (context.goalFocusChunkKey) {
      buffers.goal =
        cloneChunk(context.chunks.get(context.goalFocusChunkKey)) ||
        cloneChunk({
          key: context.goalFocusChunkKey,
          name: context.goalFocusChunkName,
          type: "chunk",
          slots: {},
        });
    }

    const frames = [
      {
        index: 0,
        time: events[0] ? events[0].time : 0,
        event: null,
        buffers: cloneBufferStates(buffers),
        bufferOrder: [...bufferOrder],
        activeBlockId: null,
        activeBuffer: "",
      },
    ];
    let activeProductionKey = "";
    let activeBindings = {};

    events.forEach((sourceEvent, index) => {
      const event = { ...sourceEvent };

      if (event.kind === "production") {
        activeProductionKey = event.production;
        activeBindings = inferProductionBindings(context.productions.get(activeProductionKey), buffers);
      }

      event.blockId = resolveTraceBlockId(event, context, activeProductionKey) || "";
      applyTraceEventToBuffers(event, buffers, context, activeProductionKey, activeBindings);
      event.label = formatTraceEventLabel(event, context, activeProductionKey);

      frames.push({
        index: index + 1,
        time: event.time,
        event,
        buffers: cloneBufferStates(buffers),
        bufferOrder: [...bufferOrder],
        activeBlockId: event.blockId,
        activeBuffer: event.buffer,
      });
    });

    return frames;
  }

  function formatSlotRows(chunk) {
    if (!chunk) {
      return "";
    }

    const rows = [];
    if (chunk.type) {
      rows.push(["isa", chunk.type]);
    }

    for (const [slot, value] of Object.entries(chunk.slots || {})) {
      rows.push([slot, value]);
    }

    const visibleRows = rows.slice(0, 4).map(
      ([slot, value]) =>
        `<div class="slot-row" title="${escapeHtml(`${slot} ${value}`)}">${escapeHtml(slot)} ${escapeHtml(value)}</div>`,
    );

    if (rows.length > visibleRows.length) {
      visibleRows.push(`<div class="slot-row">${rows.length - visibleRows.length} more slots</div>`);
    }

    return visibleRows.join("");
  }

  function renderDeclarativeChunks(context, motion) {
    if (!declarativeChunkList) {
      return;
    }

    const chunks = context && context.chunks ? [...context.chunks.values()] : [];

    if (!chunks.length) {
      declarativeChunkList.innerHTML = `<span class="memory-empty">No chunks</span>`;
      return;
    }

    declarativeChunkList.innerHTML = chunks
      .map((chunk) => {
        const classes = ["memory-chunk"];
        const nodeId = declarativeChunkNodeId(chunk);
        if (motion && motion.from === nodeId) {
          classes.push("is-active");
        }

        const slotPreview = Object.entries(chunk.slots || {})
          .slice(0, 3)
          .map(([slot, value]) => `${slot} ${value}`)
          .join(", ");
        const title = [chunk.name, chunk.type ? `isa ${chunk.type}` : "", slotPreview].filter(Boolean).join(" - ");

        return `
          <span class="${classes.join(" ")}" data-chunk-key="${escapeHtml(chunk.key)}" title="${escapeHtml(title)}">
            <span class="memory-chunk-name">${escapeHtml(chunk.name)}</span>
            <span class="memory-chunk-type">${escapeHtml(chunk.type || "chunk")}</span>
          </span>
        `;
      })
      .join("");
  }

  function renderBufferCards(frame) {
    const order = frame ? frame.bufferOrder : defaultBuffers;
    const buffers = frame ? frame.buffers : {};
    const activeBuffer = frame ? frame.activeBuffer : "";

    const renderCard = (buffer) => {
      const chunk = buffers[buffer];
      const classes = ["architecture-node", "buffer-card"];
      if (!chunk) {
        classes.push("is-empty");
      }
      if (chunk && chunk.pending) {
        classes.push("is-pending");
      }
      if (buffer === activeBuffer) {
        classes.push("is-active");
      }

      const chunkName = chunk ? (chunk.pending ? `requesting ${chunk.type}` : chunk.name) : "empty";
      return `
        <article class="${classes.join(" ")}" data-buffer="${escapeHtml(buffer)}" data-node="${escapeHtml(bufferNodeId(buffer))}">
          <span class="buffer-name" title="${escapeHtml(buffer)}">${escapeHtml(buffer)}</span>
          <span class="chunk-name" title="${escapeHtml(chunkName)}">${escapeHtml(chunkName)}</span>
          <div class="slot-list">${formatSlotRows(chunk)}</div>
        </article>
      `;
    };
    const coreCards = [];
    const auxiliaryCards = [];

    for (const buffer of order) {
      if (coreArchitectureBuffers.has(buffer)) {
        coreCards.push(renderCard(buffer));
      } else {
        auxiliaryCards.push(renderCard(buffer));
      }
    }

    bufferGrid.innerHTML = [
      coreCards.join(""),
      auxiliaryCards.length
        ? `<div class="auxiliary-buffer-grid" data-node="auxiliary-buffers">${auxiliaryCards.join("")}</div>`
        : "",
    ].join("");
  }

  function getBufferCard(buffer) {
    return [...bufferGrid.querySelectorAll(".buffer-card")].find((card) => card.dataset.buffer === buffer);
  }

  function getArchitectureNode(nodeId) {
    if (!nodeId) {
      return null;
    }

    if (nodeId === "memory" || nodeId === "declarative-memory") {
      return memoryNode;
    }

    if (nodeId.startsWith("declarative-chunk:")) {
      const chunkKey = nodeId.slice("declarative-chunk:".length);
      return [...declarativeChunkList.querySelectorAll(".memory-chunk")].find((chunk) => chunk.dataset.chunkKey === chunkKey);
    }

    if (nodeId.startsWith("buffer:")) {
      return getBufferCard(nodeId.slice("buffer:".length));
    }

    return visualizerStage.querySelector(`[data-node="${nodeId}"]`);
  }

  function architectureNodeCenter(nodeId) {
    const element = getArchitectureNode(nodeId);
    if (!element) {
      return null;
    }

    return centerWithinStage(element);
  }

  function edgePath(from, to) {
    const dx = Math.abs(to.x - from.x);
    const midX = from.x + (to.x - from.x) / 2;
    const bend = Math.min(36, Math.max(12, dx / 4));
    const c1x = from.x === to.x ? from.x - bend : midX;
    const c2x = from.x === to.x ? to.x + bend : midX;

    return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${c1x.toFixed(1)} ${from.y.toFixed(1)}, ${c2x.toFixed(1)} ${to.y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
  }

  function collectArchitectureEdges(frame) {
    const order = frame && frame.bufferOrder && frame.bufferOrder.length ? frame.bufferOrder : defaultBuffers;
    const edges = [];

    for (const buffer of order) {
      const bufferNode = bufferNodeId(buffer);
      edges.push(
        { from: bufferNode, to: "productions", kind: "buffer-read" },
        { from: "productions", to: bufferNode, kind: "buffer-write" },
      );

      if (declarativeBridgeBuffers.has(buffer)) {
        edges.push(
          { from: "declarative-memory", to: bufferNode, kind: "memory" },
          { from: bufferNode, to: "declarative-memory", kind: "memory" },
        );
      }

      if (environmentBuffers.has(buffer)) {
        edges.push(
          { from: "environment", to: bufferNode, kind: "environment" },
          { from: bufferNode, to: "environment", kind: "environment" },
        );
      }
    }

    return edges;
  }

  function drawArchitectureEdges(frame) {
    if (!architectureEdges) {
      return;
    }

    const stageRect = visualizerStage.getBoundingClientRect();
    if (!stageRect.width || !stageRect.height) {
      architectureEdges.innerHTML = "";
      return;
    }

    architectureEdges.setAttribute("viewBox", `0 0 ${stageRect.width} ${stageRect.height}`);
    const motion = frame && frame.event && frame.event.motion;
    const paths = collectArchitectureEdges(frame)
      .map((edge) => {
        const from = architectureNodeCenter(edge.from);
        const to = architectureNodeCenter(edge.to);
        if (!from || !to) {
          return "";
        }

        const activeFrom = motion && (motion.edgeFrom || motion.from);
        const isActive = motion && activeFrom === edge.from && motion.to === edge.to;
        const classes = ["architecture-edge", `is-${edge.kind}`];
        if (isActive) {
          classes.push("is-active");
        }

        return `<path class="${classes.join(" ")}" d="${edgePath(from, to)}" marker-end="url(#architectureArrow${isActive ? "Active" : ""})" />`;
      })
      .join("");

    architectureEdges.innerHTML = `
      <defs>
        <marker id="architectureArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa7b0"></path>
        </marker>
        <marker id="architectureArrowActive" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#157f56"></path>
        </marker>
      </defs>
      ${paths}
    `;
  }

  function centerWithinStage(element) {
    const stageRect = visualizerStage.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return {
      x: elementRect.left - stageRect.left + elementRect.width / 2,
      y: elementRect.top - stageRect.top + elementRect.height / 2,
    };
  }

  function motionEndpoint(endpoint, buffer) {
    if (endpoint === "buffer") {
      return getBufferCard(buffer);
    }

    return getArchitectureNode(endpoint);
  }

  function animateChunkMotion(motion) {
    const fromElement = motionEndpoint(motion.from, motion.buffer);
    const toElement = motionEndpoint(motion.to, motion.buffer);

    if (!fromElement || !toElement) {
      return;
    }

    clearTimeout(traceMotionTimer);
    chunkToken.textContent = motion.label || "chunk";
    chunkToken.classList.remove("is-visible");
    chunkToken.style.transition = "none";

    const tokenWidth = chunkToken.offsetWidth || 84;
    const tokenHeight = chunkToken.offsetHeight || 30;
    const from = centerWithinStage(fromElement);
    const to = centerWithinStage(toElement);
    const fromX = Math.max(0, from.x - tokenWidth / 2);
    const fromY = Math.max(0, from.y - tokenHeight / 2);
    const toX = Math.max(0, to.x - tokenWidth / 2);
    const toY = Math.max(0, to.y - tokenHeight / 2);

    chunkToken.style.transform = `translate(${fromX}px, ${fromY}px) scale(0.95)`;
    chunkToken.classList.add("is-visible");
    chunkToken.offsetWidth;
    chunkToken.style.transition = "";

    requestAnimationFrame(() => {
      const scale = fromX === toX && fromY === toY ? 1.08 : 1;
      chunkToken.style.transform = `translate(${toX}px, ${toY}px) scale(${scale})`;
    });

    traceMotionTimer = setTimeout(() => {
      chunkToken.classList.remove("is-visible");
    }, 620);
  }

  function setBlocklyHighlight(blockId) {
    if (activeHighlightId && activeHighlightId !== blockId) {
      const previousBlock = workspace.getBlockById(activeHighlightId);
      const previousRoot = previousBlock && previousBlock.getSvgRoot && previousBlock.getSvgRoot();
      if (previousRoot) {
        previousRoot.classList.remove("actr-running-block");
      }
    }

    try {
      if (typeof workspace.highlightBlock === "function") {
        workspace.highlightBlock(blockId || null);
      }
    } catch (error) {
      // The CSS class below keeps playback useful if a Blockly build lacks highlightBlock.
    }

    if (blockId) {
      const block = workspace.getBlockById(blockId);
      const root = block && block.getSvgRoot && block.getSvgRoot();
      if (root) {
        root.classList.add("actr-running-block");
      }
    }

    activeHighlightId = blockId || null;
  }

  function updateTraceControls() {
    const hasFrames = traceFrames.length > 1;
    traceBackButton.disabled = !hasFrames || traceFrameIndex <= 0;
    traceForwardButton.disabled = !hasFrames || traceFrameIndex >= traceFrames.length - 1;
    tracePlayButton.disabled = !hasFrames;
    traceSlider.disabled = !hasFrames;
    traceSlider.max = String(Math.max(traceFrames.length - 1, 0));
    traceSlider.value = String(traceFrameIndex);

    const label = traceIsPlaying ? "Pause" : "Play";
    tracePlayButton.querySelector("span").textContent = label;
    tracePlayButton.setAttribute("aria-label", `${label} trace`);
    tracePlayButton.setAttribute("title", `${label} trace`);
  }

  function renderTraceFrame(frame, animate) {
    if (!frame) {
      renderDeclarativeChunks(traceContext, null);
      renderBufferCards(null);
      drawArchitectureEdges(null);
      traceTimeLabel.textContent = "0.000s";
      traceEventLabel.textContent = "No trace";
      setBlocklyHighlight(null);
      updateTraceControls();
      return;
    }

    const motion = frame.event && frame.event.motion;
    renderDeclarativeChunks(traceContext, motion);
    renderBufferCards(frame);
    drawArchitectureEdges(frame);
    traceTimeLabel.textContent = traceSecondsLabel(frame.time);
    traceEventLabel.textContent = frame.event ? frame.event.label : "Trace start";
    setBlocklyHighlight(frame.activeBlockId);
    updateTraceControls();

    if (animate && frame.event && frame.event.motion) {
      requestAnimationFrame(() => animateChunkMotion(frame.event.motion));
    }
  }

  function setTraceFrame(index, animate = false) {
    if (!traceFrames.length) {
      return;
    }

    traceFrameIndex = Math.max(0, Math.min(traceFrames.length - 1, Number(index) || 0));
    renderTraceFrame(traceFrames[traceFrameIndex], animate);
  }

  function stopTracePlayback() {
    clearTimeout(tracePlaybackTimer);
    tracePlaybackTimer = null;
    traceIsPlaying = false;
    updateTraceControls();
  }

  function scheduleNextTraceFrame() {
    clearTimeout(tracePlaybackTimer);

    if (!traceIsPlaying) {
      return;
    }

    if (traceFrameIndex >= traceFrames.length - 1) {
      stopTracePlayback();
      return;
    }

    const currentFrame = traceFrames[traceFrameIndex];
    const nextFrame = traceFrames[traceFrameIndex + 1];
    const speed = Number(traceSpeedSelect.value) || 1;
    const delay = Math.max(220, ((nextFrame.time - currentFrame.time) * 1000) / speed);

    tracePlaybackTimer = setTimeout(() => {
      setTraceFrame(traceFrameIndex + 1, true);
      scheduleNextTraceFrame();
    }, delay);
  }

  function playTrace() {
    if (traceFrames.length <= 1) {
      return;
    }

    if (traceFrameIndex >= traceFrames.length - 1) {
      setTraceFrame(0, false);
    }

    traceIsPlaying = true;
    updateTraceControls();
    scheduleNextTraceFrame();
  }

  function resetTraceVisualizer(message = "No trace") {
    clearTimeout(tracePlaybackTimer);
    clearTimeout(traceMotionTimer);
    tracePlaybackTimer = null;
    traceMotionTimer = null;
    traceIsPlaying = false;
    traceContext = buildWorkspaceTraceContext();
    traceFrames = [];
    traceFrameIndex = 0;
    chunkToken.classList.remove("is-visible");
    renderDeclarativeChunks(traceContext, null);
    renderBufferCards(null);
    drawArchitectureEdges(null);
    traceTimeLabel.textContent = "0.000s";
    traceEventLabel.textContent = message;
    traceSlider.max = "0";
    traceSlider.value = "0";
    setBlocklyHighlight(null);
    updateTraceControls();
  }

  function loadTraceVisualizer(traceText) {
    const events = parseTraceEvents(traceText);

    if (!events.length) {
      resetTraceVisualizer(traceText ? "No timed trace events" : "No trace");
      return false;
    }

    const context = buildWorkspaceTraceContext();
    traceContext = context;
    clearTimeout(tracePlaybackTimer);
    clearTimeout(traceMotionTimer);
    traceIsPlaying = false;
    traceFrames = buildTraceFrames(events, context);
    traceFrameIndex = 0;
    renderTraceFrame(traceFrames[0], false);
    playTrace();
    return true;
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
    resetTraceVisualizer("Trace pending");

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

      runOutput.textContent = formatRunResult(result, code.length);
      setRunStatus(loadTraceVisualizer(getTraceText(result)) ? "Complete - visualizing" : "Complete");
    } catch (error) {
      setRunStatus("Failed");
      runOutput.textContent = formatRunError(error, error.result);
      resetTraceVisualizer("No trace");
    } finally {
      runButton.disabled = false;
      runButton.removeAttribute("aria-busy");
    }
  }

  function loadXmlText(xmlText) {
    const xml = Blockly.Xml.textToDom
      ? Blockly.Xml.textToDom(xmlText)
      : Blockly.utils.xml.textToDom(xmlText);

    if (Blockly.Events && Blockly.Events.disable) {
      Blockly.Events.disable();
    }

    try {
      workspace.clear();
      Blockly.Xml.domToWorkspace(xml, workspace);
    } finally {
      if (Blockly.Events && Blockly.Events.enable) {
        Blockly.Events.enable();
      }
    }

    Blockly.svgResize(workspace);
    workspace.scrollCenter();
    generateCode();
    resetTraceVisualizer("No trace");
  }

  function isXmlWorkspaceText(text, file) {
    const name = file && file.name ? file.name.toLowerCase() : "";
    return name.endsWith(".xml") || /^\s*</.test(text);
  }

  function loadLispText(lispText) {
    if (!window.ACTRLispImporter) {
      throw new Error("Lisp importer is not available.");
    }

    loadXmlText(window.ACTRLispImporter.lispToXmlText(lispText));
  }

  function loadWorkspaceText(text, file) {
    if (isXmlWorkspaceText(text, file)) {
      loadXmlText(text);
      return "xml";
    }

    loadLispText(text);
    return "lisp";
  }

  function loadSampleWorkspace(sample) {
    if (sample.xml) {
      loadXmlText(sample.xml);
      return;
    }

    loadLispText(sample.lisp);
  }

  function loadSample(sample) {
    loadSampleWorkspace(sample);
    setSamplesMenuOpen(false);
    setStatus(`${sample.name} sample loaded`);
    sampleButton.focus();
  }

  function setSamplesMenuOpen(isOpen) {
    samplesMenu.hidden = !isOpen;
    sampleButton.setAttribute("aria-expanded", String(isOpen));
  }

  function getSampleMenuButtons() {
    return [...samplesMenu.querySelectorAll("button")];
  }

  function focusSampleMenuButton(offset) {
    const buttons = getSampleMenuButtons();
    if (!buttons.length) {
      return;
    }

    const currentIndex = buttons.indexOf(document.activeElement);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + offset + buttons.length) % buttons.length;
    buttons[nextIndex].focus();
  }

  function renderSampleMenu() {
    samplesMenu.textContent = "";

    for (const sample of samples) {
      const button = document.createElement("button");
      const title = document.createElement("span");
      const meta = document.createElement("span");

      button.type = "button";
      button.setAttribute("role", "menuitem");
      button.dataset.sampleId = sample.id;
      button.title = `Load ${sample.name} sample`;
      title.className = "sample-title";
      title.textContent = sample.name;
      meta.className = "sample-meta";
      meta.textContent = sample.meta;

      button.append(title, meta);
      button.addEventListener("click", () => loadSample(sample));
      samplesMenu.append(button);
    }
  }

  function saveWorkspace() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToPrettyText(xml);
    localStorage.setItem(storageKey, text);
    setStatus("Saved");
  }

  function restoreWorkspace() {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      loadXmlText(saved);
      return;
    }

    loadSampleWorkspace(defaultSample);
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

  renderSampleMenu();

  runButton.addEventListener("click", runModel);

  traceBackButton.addEventListener("click", () => {
    stopTracePlayback();
    setTraceFrame(traceFrameIndex - 1, true);
  });

  tracePlayButton.addEventListener("click", () => {
    if (traceIsPlaying) {
      stopTracePlayback();
    } else {
      playTrace();
    }
  });

  traceForwardButton.addEventListener("click", () => {
    stopTracePlayback();
    setTraceFrame(traceFrameIndex + 1, true);
  });

  traceSlider.addEventListener("input", (event) => {
    stopTracePlayback();
    setTraceFrame(Number(event.target.value), true);
  });

  traceSpeedSelect.addEventListener("change", () => {
    if (traceIsPlaying) {
      scheduleNextTraceFrame();
    }
  });

  sampleButton.addEventListener("click", () => {
    const nextOpenState = samplesMenu.hidden;
    setSamplesMenuOpen(nextOpenState);

    if (nextOpenState) {
      const [firstButton] = getSampleMenuButtons();
      if (firstButton) {
        firstButton.focus();
      }
    }
  });

  sampleButton.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown") {
      return;
    }

    event.preventDefault();
    setSamplesMenuOpen(true);
    focusSampleMenuButton(1);
  });

  samplesMenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSamplesMenuOpen(false);
      sampleButton.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusSampleMenuButton(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusSampleMenuButton(-1);
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const buttons = getSampleMenuButtons();
      const button = event.key === "Home" ? buttons[0] : buttons[buttons.length - 1];

      if (button) {
        button.focus();
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (samplesMenu.hidden || sampleButton.contains(event.target) || samplesMenu.contains(event.target)) {
      return;
    }

    setSamplesMenuOpen(false);
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
    try {
      const text = await file.text();
      const format = loadWorkspaceText(text, file);
      setStatus(format === "lisp" ? "Lisp imported" : "Loaded");
    } catch (error) {
      setStatus("Load failed");
      setRunStatus("Load failed");
      runOutput.textContent = `; Load failed: ${error.message}`;
    } finally {
      loadInput.value = "";
    }
  });

  workspace.addChangeListener((event) => {
    if (event.isUiEvent) {
      return;
    }
    generateCode();
    resetTraceVisualizer("No trace");
  });

  window.addEventListener("resize", () => {
    Blockly.svgResize(workspace);
    drawArchitectureEdges(traceFrames[traceFrameIndex] || null);
  });
  resetTraceVisualizer();
  restoreWorkspace();
})();

(function registerActrBlocks() {
  if (!window.Blockly) {
    throw new Error("Blockly must be loaded before ACT-R blocks.");
  }

  const ACTR_MODEL = "#7f4f24";
  const ACTR_CHUNK = "#b05d24";
  const ACTR_PRODUCTION = "#2f6f4e";
  const ACTR_BUFFER = "#1d6f7a";
  const ACTR_ENVIRONMENT = "#5b5fa8";
  const ACTR_VALUE = "#5b6472";

  Blockly.common.defineBlocksWithJsonArray([
    {
      type: "actr_model",
      message0: "define model %1 declarations %2 body %3",
      args0: [
        {
          type: "field_input",
          name: "NAME",
          text: "counting",
        },
        {
          type: "input_statement",
          name: "DECLARATIONS",
        },
        {
          type: "input_statement",
          name: "BODY",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_MODEL,
      tooltip: "Create an ACT-R define-model form.",
      helpUrl: "",
    },
    {
      type: "actr_chunk_type",
      message0: "chunk-type %1 slots %2",
      args0: [
        {
          type: "field_input",
          name: "TYPE",
          text: "goal",
        },
        {
          type: "input_statement",
          name: "SLOTS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_CHUNK,
      tooltip: "Declare a chunk type and its slots.",
      helpUrl: "",
    },
    {
      type: "actr_slot_name",
      message0: "slot name %1",
      args0: [
        {
          type: "field_input",
          name: "NAME",
          text: "state",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_CHUNK,
      tooltip: "A slot name for a chunk-type declaration.",
      helpUrl: "",
    },
    {
      type: "actr_add_dm",
      message0: "add-dm chunks %1",
      args0: [
        {
          type: "input_statement",
          name: "CHUNKS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_CHUNK,
      tooltip: "Add chunks to declarative memory.",
      helpUrl: "",
    },
    {
      type: "actr_chunk",
      message0: "chunk %1 isa %2 slots %3",
      args0: [
        {
          type: "field_input",
          name: "NAME",
          text: "start",
        },
        {
          type: "field_input",
          name: "TYPE",
          text: "goal",
        },
        {
          type: "input_statement",
          name: "SLOTS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_CHUNK,
      tooltip: "Define a chunk with an isa type and slot values.",
      helpUrl: "",
    },
    {
      type: "actr_slot_value",
      message0: "slot %1 value %2",
      args0: [
        {
          type: "field_input",
          name: "SLOT",
          text: "state",
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_CHUNK,
      tooltip: "Set or test a slot value.",
      helpUrl: "",
    },
    {
      type: "actr_goal_focus",
      message0: "goal-focus %1",
      args0: [
        {
          type: "field_input",
          name: "CHUNK",
          text: "start",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_MODEL,
      tooltip: "Set the initial goal buffer chunk.",
      helpUrl: "",
    },
    {
      type: "actr_sgp",
      message0: "sgp %1 %2",
      args0: [
        {
          type: "field_input",
          name: "PARAM",
          text: ":esc",
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_MODEL,
      tooltip: "Set an ACT-R parameter with sgp.",
      helpUrl: "",
    },
    {
      type: "actr_run",
      message0: "run %1 seconds",
      args0: [
        {
          type: "input_value",
          name: "SECONDS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_MODEL,
      tooltip: "Generate an ACT-R run command.",
      helpUrl: "",
    },
    {
      type: "actr_production",
      message0: "production %1 if %2 then %3",
      args0: [
        {
          type: "field_input",
          name: "NAME",
          text: "start",
        },
        {
          type: "input_statement",
          name: "CONDITIONS",
        },
        {
          type: "input_statement",
          name: "ACTIONS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_PRODUCTION,
      tooltip: "Create an ACT-R production rule.",
      helpUrl: "",
    },
    {
      type: "actr_buffer_condition",
      message0: "check %1 buffer isa %2 slots %3",
      args0: [
        {
          type: "field_dropdown",
          name: "BUFFER",
          options: [
            ["goal", "goal"],
            ["retrieval", "retrieval"],
            ["imaginal", "imaginal"],
            ["visual-location", "visual-location"],
            ["visual", "visual"],
            ["manual", "manual"],
            ["vocal", "vocal"],
            ["aural", "aural"],
            ["temporal", "temporal"],
          ],
        },
        {
          type: "field_input",
          name: "TYPE",
          text: "goal",
        },
        {
          type: "input_statement",
          name: "SLOTS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_BUFFER,
      tooltip: "Check the chunk currently in a buffer.",
      helpUrl: "",
    },
    {
      type: "actr_buffer_query",
      message0: "query %1 buffer %2",
      args0: [
        {
          type: "field_dropdown",
          name: "BUFFER",
          options: [
            ["goal", "goal"],
            ["retrieval", "retrieval"],
            ["imaginal", "imaginal"],
            ["visual-location", "visual-location"],
            ["visual", "visual"],
            ["manual", "manual"],
            ["vocal", "vocal"],
            ["aural", "aural"],
            ["temporal", "temporal"],
          ],
        },
        {
          type: "input_statement",
          name: "SLOTS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_BUFFER,
      tooltip: "Query buffer state or module state with ?buffer>.",
      helpUrl: "",
    },
    {
      type: "actr_buffer_action",
      message0: "%1 %2 buffer isa %3 slots %4",
      args0: [
        {
          type: "field_dropdown",
          name: "OP",
          options: [
            ["update", "="],
            ["request", "+"],
          ],
        },
        {
          type: "field_dropdown",
          name: "BUFFER",
          options: [
            ["goal", "goal"],
            ["retrieval", "retrieval"],
            ["imaginal", "imaginal"],
            ["visual-location", "visual-location"],
            ["visual", "visual"],
            ["manual", "manual"],
            ["vocal", "vocal"],
            ["aural", "aural"],
            ["temporal", "temporal"],
          ],
        },
        {
          type: "field_input",
          name: "TYPE",
          text: "goal",
        },
        {
          type: "input_statement",
          name: "SLOTS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_BUFFER,
      tooltip: "Update a buffer chunk or request a chunk into a buffer.",
      helpUrl: "",
    },
    {
      type: "actr_buffer_request",
      message0: "request %1 buffer isa %2 slots %3",
      args0: [
        {
          type: "field_dropdown",
          name: "BUFFER",
          options: [
            ["goal", "goal"],
            ["retrieval", "retrieval"],
            ["imaginal", "imaginal"],
            ["visual-location", "visual-location"],
            ["visual", "visual"],
            ["manual", "manual"],
            ["vocal", "vocal"],
            ["aural", "aural"],
            ["temporal", "temporal"],
          ],
        },
        {
          type: "field_input",
          name: "TYPE",
          text: "chunk",
        },
        {
          type: "input_statement",
          name: "SLOTS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_BUFFER,
      tooltip: "Request or create a chunk in a buffer with +buffer>.",
      helpUrl: "",
    },
    {
      type: "actr_buffer_update",
      message0: "update %1 buffer slots %2",
      args0: [
        {
          type: "field_dropdown",
          name: "BUFFER",
          options: [
            ["goal", "goal"],
            ["retrieval", "retrieval"],
            ["imaginal", "imaginal"],
            ["visual-location", "visual-location"],
            ["visual", "visual"],
            ["manual", "manual"],
            ["vocal", "vocal"],
            ["aural", "aural"],
            ["temporal", "temporal"],
          ],
        },
        {
          type: "input_statement",
          name: "SLOTS",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_BUFFER,
      tooltip: "Modify the chunk currently in a buffer with =buffer>.",
      helpUrl: "",
    },
    {
      type: "actr_buffer_clear",
      message0: "clear %1 buffer",
      args0: [
        {
          type: "field_dropdown",
          name: "BUFFER",
          options: [
            ["goal", "goal"],
            ["retrieval", "retrieval"],
            ["imaginal", "imaginal"],
            ["visual-location", "visual-location"],
            ["visual", "visual"],
            ["manual", "manual"],
            ["vocal", "vocal"],
            ["aural", "aural"],
            ["temporal", "temporal"],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_BUFFER,
      tooltip: "Clear a buffer with -buffer>.",
      helpUrl: "",
    },
    {
      type: "actr_output",
      message0: "output to trace %1",
      args0: [
        {
          type: "input_value",
          name: "MESSAGE",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_PRODUCTION,
      tooltip: "Print an item or string in the ACT-R model trace with !output!.",
      helpUrl: "",
    },
    {
      type: "actr_reset",
      message0: "reset model",
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Reset the current ACT-R model before running a task.",
      helpUrl: "",
    },
    {
      type: "actr_open_exp_window",
      message0: "set window %1 to exp window %2 visible %3 width %4 height %5",
      args0: [
        {
          type: "field_input",
          name: "WINDOW",
          text: "*window*",
        },
        {
          type: "input_value",
          name: "TITLE",
        },
        {
          type: "input_value",
          name: "VISIBLE",
        },
        {
          type: "input_value",
          name: "WIDTH",
        },
        {
          type: "input_value",
          name: "HEIGHT",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Open an ACT-R experiment window and store it in a Lisp variable.",
      helpUrl: "",
    },
    {
      type: "actr_add_text_to_exp_window",
      message0: "add text %1 to window %2 at x %3 y %4",
      args0: [
        {
          type: "input_value",
          name: "TEXT",
        },
        {
          type: "input_value",
          name: "WINDOW",
        },
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Display text in the current ACT-R experiment window.",
      helpUrl: "",
    },
    {
      type: "actr_add_button_to_exp_window",
      message0: "add button %1 to window %2 at x %3 y %4 width %5 height %6 action %7",
      args0: [
        {
          type: "input_value",
          name: "TEXT",
        },
        {
          type: "input_value",
          name: "WINDOW",
        },
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
        {
          type: "input_value",
          name: "WIDTH",
        },
        {
          type: "input_value",
          name: "HEIGHT",
        },
        {
          type: "input_value",
          name: "ACTION",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Display a clickable button in the current ACT-R experiment window.",
      helpUrl: "",
    },
    {
      type: "actr_clear_exp_window",
      message0: "clear current exp window",
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Remove all items from the current ACT-R experiment window.",
      helpUrl: "",
    },
    {
      type: "actr_install_device",
      message0: "install device %1",
      args0: [
        {
          type: "input_value",
          name: "DEVICE",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Install a window or device so the model can perceive and act through it.",
      helpUrl: "",
    },
    {
      type: "actr_start_hand_at_mouse",
      message0: "start hand at mouse",
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Place the model's hand at the mouse for mouse-based interaction.",
      helpUrl: "",
    },
    {
      type: "actr_proc_display",
      message0: "process display",
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_ENVIRONMENT,
      tooltip: "Tell ACT-R to process the current experiment window display.",
      helpUrl: "",
    },
    {
      type: "actr_symbol",
      message0: "symbol %1",
      args0: [
        {
          type: "field_input",
          name: "VALUE",
          text: "start",
        },
      ],
      output: null,
      colour: ACTR_VALUE,
      tooltip: "Generate an unquoted Lisp symbol.",
      helpUrl: "",
    },
    {
      type: "actr_variable",
      message0: "ACT-R variable %1",
      args0: [
        {
          type: "field_input",
          name: "NAME",
          text: "item",
        },
      ],
      output: null,
      colour: ACTR_VALUE,
      tooltip: "Generate an ACT-R production variable such as =item.",
      helpUrl: "",
    },
    {
      type: "actr_nil",
      message0: "nil",
      output: null,
      colour: ACTR_VALUE,
      tooltip: "Generate nil.",
      helpUrl: "",
    },
    {
      type: "actr_raw_lisp",
      message0: "raw Lisp %1",
      args0: [
        {
          type: "field_input",
          name: "CODE",
          text: "(setf *trace-detail* 'medium)",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ACTR_VALUE,
      tooltip: "Insert one raw Lisp expression.",
      helpUrl: "",
    },
    {
      type: "actr_raw_value",
      message0: "raw Lisp value %1",
      args0: [
        {
          type: "field_input",
          name: "CODE",
          text: "(+ 1 2)",
        },
      ],
      output: null,
      colour: ACTR_VALUE,
      tooltip: "Insert a raw Lisp expression where a value is expected.",
      helpUrl: "",
    },
  ]);
})();

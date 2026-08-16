# Blockly ACT-R

A static Google Blockly environment for building ACT-R models and generating Common Lisp syntax.

## Run

Open `index.html` in a browser, or serve the folder locally:

```sh
python3 -m http.server 5173
```

Then visit `http://127.0.0.1:5173`.

The app loads Blockly from a pinned CDN and keeps the ACT-R blocks and generator in `src/`.

## Load a Model

Use **Load** to open either a saved Blockly XML workspace or an ACT-R Lisp model file (`.lisp`, `.lsp`, or `.cl`). Lisp imports are converted into editable blocks for supported ACT-R forms; unsupported Lisp is preserved as raw Lisp blocks.

Use **Samples** to load an included model. The menu includes the original counting sample and a visual/motor sample that attends to a letter in a window and presses the matching key.

## Run a Model

Use the green **Run** button to evaluate the generated Lisp with the ACT-R runner at `https://act-r-2649d1971396.herokuapp.com/run-model`.

The runner requires a public `http` or `https` `model_url`, so the app encodes the current Lisp into a fetchable HTTPS base64 payload URL and posts that URL as JSON. If the model contains a `(run N)` form, `N` is sent as `run_seconds`; otherwise the app uses 5 seconds.

When the runner returns a timed trace, the Trace Visualizer replays buffer changes using the trace timestamps. Production firings and buffer actions are linked back to the current Blockly workspace, so the relevant production, condition, request, update, or clear block is highlighted during playback.

## Included Blocks

- ACT-R model forms: `define-model`, `sgp`, `goal-focus`, `run`, raw Lisp.
- Declarative memory: `chunk-type`, `add-dm`, chunk definitions, slot values.
- Productions: production rules, buffer checks, buffer queries, buffer requests, updates, clears, and trace output.
- Values: ACT-R symbols, production variables such as `=item`, `nil`, raw Lisp values, numbers, strings, booleans.
- Basic Blockly blocks: logic, loops, math, text, lists, and variables with Lisp generation.

## Generated Example

The counting sample workspace emits Lisp in this style:

```lisp
(clear-all)

(define-model counting
  (chunk-type goal state count)
  (chunk-type count-order first second)

  (add-dm
    (start isa goal
      state start
      count one)
    (one-two isa count-order
      first one
      second two)
  )

  (goal-focus start)

  (p request-next
    =goal>
      isa goal
      state start
      count =current
  ==>
    +retrieval>
      isa count-order
      first =current
    =goal>
      state retrieving
  )
)
```

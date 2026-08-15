# Blockly ACT-R

A static Google Blockly environment for building ACT-R models and generating Common Lisp syntax.

## Run

Open `index.html` in a browser, or serve the folder locally:

```sh
python3 -m http.server 5173
```

Then visit `http://127.0.0.1:5173`.

The app loads Blockly from a pinned CDN and keeps the ACT-R blocks and generator in `src/`.

## Included Blocks

- ACT-R model forms: `define-model`, `sgp`, `goal-focus`, `run`, raw Lisp.
- Declarative memory: `chunk-type`, `add-dm`, chunk definitions, slot values.
- Productions: production rules, buffer checks, buffer queries, buffer requests, updates, and clears.
- Values: ACT-R symbols, production variables such as `=item`, `nil`, numbers, strings, booleans.
- Basic Blockly blocks: logic, loops, math, text, lists, and variables with Lisp generation.

## Generated Example

The sample workspace emits Lisp in this style:

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

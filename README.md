# Blockly ACT-R

A reusable `<blockly-act-r>` web component for building ACT-R models with Google Blockly, generating Common Lisp, and visualizing execution traces. Works with plain HTML and browser frameworks. Each instance has its own editor, model, and playback state.

## Build and run

```sh
npm install
npm run dev
```

Open [the standalone editor](http://127.0.0.1:5173) or [the embedding example](http://127.0.0.1:5173/examples/embedding.html). The standalone editor uses the original local storage key, so previously saved workspaces remain available on the same origin.

`npm run build` creates `dist/blockly-act-r.js`, a self-contained ES module with Blockly 10.4.3, the ACT-R blocks, Lisp importer/generator, editor styles, and image assets. No CDN, runtime dependencies, separate CSS, or asset copying is required.

## Include in another project

### Plain HTML

Copy `dist/blockly-act-r.js` into your project's public assets and load it once:

```html
<script type="module" src="/assets/blockly-act-r.js"></script>

<blockly-act-r
  id="model-editor"
  sample="counting"
  style="width: 100%; height: 850px"
></blockly-act-r>

<script type="module">
  await customElements.whenDefined('blockly-act-r');
  const editor = document.querySelector('#model-editor');
  await editor.loadLisp('(define-model my-model (chunk-type goal state))');
  console.log(await editor.getLisp());

  editor.addEventListener('actr-change', ({ detail }) => {
    console.log(detail.xml, detail.lisp);
  });
</script>
```

Serve the host page over HTTP(S), as required for browser ES modules. Give the element an explicit height when fitting it into an application layout; its default height is 800px. Narrow embeds scroll internally and stack the workspace above the code and visualizer.

Keep `dist/THIRD_PARTY_NOTICES.txt` with redistributed copies of the bundle.

### Installable package / bundler

Create an archive in this repository:

```sh
npm pack
```

Install that archive in a consuming project:

```sh
npm install /path/to/blockly-act-r-1.0.0.tgz
```

Then register the element by importing the package from your browser entry point:

```js
import 'blockly-act-r';
```

Use `<blockly-act-r></blockly-act-r>` in your HTML, JSX, Vue, Svelte, or other templates. Frameworks that validate custom tags may need their normal custom-element configuration (for example Vue's `compilerOptions.isCustomElement`). For model data and methods, use a DOM reference to the element; events are native DOM `CustomEvent`s. Importing in a server-rendering environment is safe; the interactive editor initializes when the element connects in a browser.

The package includes TypeScript declarations, package exports, and the built bundle. It can be installed from the local folder or archive; it has not been published to the npm registry.

To register an additional tag name:

```js
import { defineBlocklyActr } from 'blockly-act-r';
defineBlocklyActr('my-actr-editor');
```

The default `blockly-act-r` name registers automatically. Registration is idempotent.

## Configuration

| Attribute | Default | Behavior |
| --- | --- | --- |
| `sample` | `counting` | Initial sample: `counting`, `visual-motor-keypress`, `fitts-law`, or `none` for an empty editor. Changing it loads that sample. |
| `runner-endpoint` | `https://act-r-2649d1971396.herokuapp.com/run-model` | Runner POST endpoint. Set to an empty string to disable Run. |
| `model-url-base` | `https://httpbingo.org/base64/` | Prefix for the encoded model's HTTPS payload URL; see runner details below. |
| `storage-key` | none | Enables explicit **Save** and startup restore in the host origin's local storage. Use distinct keys for independent saved models. |

`runnerEndpoint`, `modelUrlBase`, and `storageKey` are equivalent JavaScript properties. Set configuration before inserting a programmatically created element. Endpoint and storage-key changes apply to the active instance; changing the storage key does not automatically load or overwrite a model. Startup restores saved XML before selecting a sample.

Embeds do not write to local storage by default. **Save** still emits `actr-save`, allowing the host to persist XML in its own database. Local storage access failures emit `actr-error` and leave the editor usable.

## JavaScript API

All methods return promises and wait for initialization automatically. If you select an element before its module loads, first wait for `customElements.whenDefined('blockly-act-r')`. `editor.ready` resolves to the element when its editor is initialized; `actr-ready` also signals readiness.

| Method | Result / action |
| --- | --- |
| `getXml()` | Current workspace XML string. |
| `getLisp()` | Generated Lisp string. |
| `loadXml(xml)` | Replace the workspace with saved XML. Invalid imports reject without replacing the current model. |
| `loadLisp(lisp)` | Import supported ACT-R forms; preserve unsupported Lisp as raw blocks. |
| `clear()` | Empty the workspace and reset trace playback. |
| `getSamples()` | Array of `{ id, name, meta }` sample descriptions. |
| `loadSample(id)` | Load a sample; `none` clears the workspace. |
| `save()` | Return XML, emit `actr-save`, and write to local storage if configured. |
| `run()` | Run the current model and return the runner's parsed JSON result. Timed traces start playing automatically. |
| `loadTrace(text, { autoplay: false })` | Load an ACT-R text trace without contacting a runner. Returns whether timed events were recognized. Autoplay defaults to `true`. |
| `playTrace()` / `pauseTrace()` | Control playback. |
| `seekTrace(index)` | Pause and select a frame, clamped to the available range. Frame 0 is the initial state. |
| `getTraceState()` | `{ index, total, time, playing, event, activeBlockId }`; time is in seconds. |

Methods reject on errors. Editing or loading another model, changing the runner, starting another run, or disconnecting the element cancels an outstanding runner request. Cancellation rejects that run with an `AbortError`. Removing the component releases its workspace, observers, and timers. Reattaching the same element creates a new `ready` promise and restores its workspace; trace playback resets.

### Events

All events bubble across the shadow boundary and expose data in `event.detail`.

| Event | Detail |
| --- | --- |
| `actr-ready` | Empty object; editor initialized. |
| `actr-change` | `{ xml, lisp }` on initialization and workspace changes. |
| `actr-save` | `{ xml, lisp }` when Save or `save()` is used. |
| `actr-run` | `{ status, result?, message? }`; status is `running`, `complete`, `failed`, or `cancelled`. |
| `actr-trace-change` | Same shape as `getTraceState()` when the selected frame or playback state changes. |
| `actr-error` | `{ message, operation }` for import, generator, runner, storage, copy, or startup errors. |

## Isolation and browser support

The custom element uses an open shadow root containing a same-origin `srcdoc` iframe. This keeps the existing Blockly 10 editor, its popups, IDs, styles, and global registry isolated from the host and other instances. The frame is an implementation detail; use the public API and events for integration. It provides layout and JavaScript namespace isolation, not a security sandbox for untrusted code.

Requires a modern browser with custom elements, shadow DOM, ES modules, `structuredClone`, and `ResizeObserver`. The host's Content Security Policy must permit inline scripts and styles in `srcdoc` frames and `data:` images; stricter policies need a separately hosted editor integration. Running a model additionally requires network access and CORS support from the configured runner. Clipboard copying requires a secure context and browser permission.

## Validation

```sh
npx playwright install chromium  # once, if the test browser is missing
npm test
npm pack --dry-run
```

The browser suite checks the built distributable, including isolation, multiple instances, import/export, samples, trace playback, opt-in persistence, runner requests/errors/cancellation, and reconnect cleanup. Runner tests use mock responses and do not submit models to the live service.

## Load a Model

Use **Load** to open either a saved Blockly XML workspace or an ACT-R Lisp model file (`.lisp`, `.lsp`, or `.cl`). Lisp imports are converted into editable blocks for supported ACT-R forms; unsupported Lisp is preserved as raw Lisp blocks.

Use **Samples** to load an included model. The menu includes the original counting sample, a visual/motor sample that attends to a letter in a window and presses the matching key, and a Fitts' Law sample that sees a target button and reaches to press it.

The Fitts' Law sample uses [actr-motor-point](https://github.com/justingeeslin/actr-motor-point). Load its `motor-reach.lisp` extension into ACT-R **once before defining the model**; the hosted runner also needs that extension installed server-side. The sample maps 10 screen pixels to 1 cm on a flat panel, configures the right hand after `reset`, and treats a `reach-complete` event inside the button bounds as a press. The extension reports contact but does not move or click the mouse cursor.

## Run a Model

Use the green **Run** button to evaluate the generated Lisp with the ACT-R runner at `https://act-r-2649d1971396.herokuapp.com/run-model`.

The runner requires a public `http` or `https` `model_url`, so the app encodes the current Lisp into a fetchable HTTPS base64 payload URL and posts that URL as JSON. If the model contains a `(run N)` form, `N` is sent as `run_seconds`; otherwise the app uses 5 seconds.

When the runner returns a timed trace, the Trace Visualizer replays buffer changes using the trace timestamps. Production firings and buffer actions are linked back to the current Blockly workspace, so the relevant production, condition, request, update, or clear block is highlighted during playback.

## Included Blocks

- ACT-R model forms: `define-model`, `sgp`, `goal-focus`, `run`, raw Lisp.
- Declarative memory: `chunk-type`, `add-dm`, chunk definitions, slot values.
- Productions: production rules, buffer checks, buffer queries, buffer requests, updates, clears, and trace output.
- Environment: reset, experiment windows, text, buttons, window clearing, device install, mouse hand setup, and display processing.
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

// EDITOR_DOCUMENT is inserted by scripts/build.mjs. No runtime dependencies.
const eventNames = ["actr-change", "actr-save", "actr-run", "actr-trace-change", "actr-error"];
const defaults = {
  runnerEndpoint: "https://act-r-2649d1971396.herokuapp.com/run-model",
  modelUrlBase: "https://httpbingo.org/base64/",
};

const HTMLElementBase = globalThis.HTMLElement || class {};

export class BlocklyActr extends HTMLElementBase {
  static observedAttributes = ["runner-endpoint", "model-url-base", "storage-key", "sample"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>
      :host { display: block; height: 800px; min-width: 0; }
      :host([hidden]) { display: none; }
      iframe { display: block; width: 100%; height: 100%; border: 0; }
      [role="status"] { padding: 1rem; font: 14px system-ui, sans-serif; }
    </style><div role="status">Loading Blockly ACT-R…</div>`;
    this._newReady();
  }

  _newReady() {
    this.ready = new Promise((resolve, reject) => {
      this._resolveReady = resolve;
      this._rejectReady = reject;
    });
    // Declarative use does not have to consume the promise.
    this.ready.catch(() => {});
  }

  connectedCallback() {
    if (this._frame) return;
    if (this._hasConnected) this._newReady();
    this._hasConnected = true;
    const frame = document.createElement("iframe");
    this._frame = frame;
    frame.title = "Blockly ACT-R model editor and trace visualizer";
    frame.setAttribute("part", "frame");
    frame.setAttribute("allow", "clipboard-write");
    frame.addEventListener("load", () => this._onLoad(frame), { once: true });
    const config = JSON.stringify({
      runnerEndpoint: this.runnerEndpoint,
      modelUrlBase: this.modelUrlBase,
      storageKey: this.storageKey,
      sample: this.getAttribute("sample") || "counting",
      ...(this._savedXml === undefined ? {} : { initialXml: this._savedXml }),
    }).replace(/</g, "\\u003c");
    this._initialSample = this.getAttribute("sample") || "counting";
    // Configuration is data, never interpolated as executable source.
    frame.srcdoc = EDITOR_DOCUMENT.replace("/* ACTR_COMPONENT_CONFIG */", () => `window.ACTREditorOptions = ${config};`);
    this.shadowRoot.querySelector('[role="status"]').hidden = false;
    frame.hidden = true;
    this.shadowRoot.append(frame);
  }

  _onLoad(frame) {
    if (this._frame !== frame) return;
    const runtime = frame.contentWindow.ACTREditor;
    const bootError = frame.contentWindow.ACTREditorBootError;
    if (!runtime || bootError) {
      const error = new Error(bootError || "The editor could not start. Check your Content Security Policy allows inline frame scripts.");
      this.shadowRoot.querySelector('[role="status"]').textContent = error.message;
      this._rejectReady(error);
      this._emit("actr-error", { message: error.message, operation: "initialize" });
      return;
    }
    this._runtime = runtime;
    for (const name of eventNames) {
      frame.contentWindow.addEventListener(name, (event) => this._emit(name, structuredClone(event.detail)));
    }
    runtime.configure({ runnerEndpoint: this.runnerEndpoint, modelUrlBase: this.modelUrlBase, storageKey: this.storageKey });
    const sample = this.getAttribute("sample") || "counting";
    if (sample !== this._initialSample) {
      try { runtime.loadSample(sample); }
      catch (error) { this._emit("actr-error", { message: error.message, operation: "loadSample" }); }
    }
    frame.hidden = false;
    this.shadowRoot.querySelector('[role="status"]').hidden = true;
    this._resolveReady(this);
    this._emit("actr-ready", {});
    for (const detail of runtime.connectEvents()) this._emit("actr-error", structuredClone(detail));
    this._emit("actr-change", { xml: runtime.getXml(), lisp: runtime.getLisp() });
  }

  disconnectedCallback() {
    if (!this._frame) return;
    if (this._runtime) {
      this._savedXml = this._runtime.getXml();
      this._runtime.dispose();
    }
    this._rejectReady(new Error("The editor was disconnected."));
    this._runtime = null;
    this._frame.remove();
    this._frame = null;
  }

  attributeChangedCallback(name, oldValue, value) {
    if (oldValue === value) return;
    if (name === "sample") this._savedXml = undefined;
    if (!this._runtime) return;
    if (name === "sample") {
      this.loadSample(value || "counting").catch(() => {});
    } else {
      const property = { "runner-endpoint": "runnerEndpoint", "model-url-base": "modelUrlBase", "storage-key": "storageKey" }[name];
      this._runtime.configure({ [property]: this[property] });
    }
  }

  _emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }

  async _call(method, ...args) {
    await this.ready;
    if (!this._runtime || !this.isConnected) throw new Error("The editor is disconnected.");
    try {
      return await this._runtime[method](...args);
    } catch (error) {
      if (method !== "run" && method !== "save") this._emit("actr-error", { message: error.message, operation: method });
      throw error;
    }
  }

  get runnerEndpoint() { return this.getAttribute("runner-endpoint") ?? defaults.runnerEndpoint; }
  set runnerEndpoint(value) { this.setAttribute("runner-endpoint", value); }
  get modelUrlBase() { return this.getAttribute("model-url-base") ?? defaults.modelUrlBase; }
  set modelUrlBase(value) { this.setAttribute("model-url-base", value); }
  get storageKey() { return this.getAttribute("storage-key"); }
  set storageKey(value) {
    if (value == null) this.removeAttribute("storage-key");
    else this.setAttribute("storage-key", value);
  }

  getXml() { return this._call("getXml"); }
  getLisp() { return this._call("getLisp"); }
  loadXml(xml) { return this._call("loadXml", xml); }
  loadLisp(lisp) { return this._call("loadLisp", lisp); }
  loadSample(id) { return this._call("loadSample", id); }
  getSamples() { return this._call("getSamples"); }
  loadTrace(text, options) { return this._call("loadTrace", text, options); }
  getTraceState() { return this._call("getTraceState"); }
  playTrace() { return this._call("playTrace"); }
  pauseTrace() { return this._call("pauseTrace"); }
  seekTrace(index) { return this._call("seekTrace", index); }
  clear() { return this._call("clear"); }
  save() { return this._call("save"); }
  run() { return this._call("run"); }
}

export function defineBlocklyActr(tagName = "blockly-act-r") {
  if (!customElements.get(tagName)) {
    // A subclass allows this module to register additional names safely.
    customElements.define(tagName, tagName === "blockly-act-r" ? BlocklyActr : class extends BlocklyActr {});
  }
  return customElements.get(tagName);
}

if (typeof customElements !== "undefined") defineBlocklyActr();

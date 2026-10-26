export interface Sample { id: string; name: string; meta: string; }
export interface ModelChange { xml: string; lisp: string; }
export interface TraceState {
  index: number;
  total: number;
  time: number;
  playing: boolean;
  event: string | null;
  activeBlockId: string | null;
}
export interface RunResult {
  ok?: boolean;
  trace?: string | string[];
  [key: string]: unknown;
}
export interface BlocklyActrEventMap {
  "actr-ready": CustomEvent<Record<string, never>>;
  "actr-change": CustomEvent<ModelChange>;
  "actr-save": CustomEvent<ModelChange>;
  "actr-trace-change": CustomEvent<TraceState>;
  "actr-run": CustomEvent<{ status: "running" | "complete" | "failed" | "cancelled"; result?: RunResult; message?: string }>;
  "actr-error": CustomEvent<{ message: string; operation: string }>;
}
export declare class BlocklyActr extends HTMLElement {
  /** Resolves on initialization. Replaced on reconnection. */
  ready: Promise<this>;
  runnerEndpoint: string;
  modelUrlBase: string;
  storageKey: string | null;
  getXml(): Promise<string>;
  getLisp(): Promise<string>;
  loadXml(xml: string): Promise<void>;
  loadLisp(lisp: string): Promise<void>;
  loadSample(id: string): Promise<void>;
  getSamples(): Promise<Sample[]>;
  loadTrace(text: string, options?: { autoplay?: boolean }): Promise<boolean>;
  getTraceState(): Promise<TraceState>;
  playTrace(): Promise<void>;
  pauseTrace(): Promise<void>;
  seekTrace(index: number): Promise<void>;
  clear(): Promise<void>;
  save(): Promise<string>;
  run(): Promise<RunResult>;
  addEventListener<K extends keyof BlocklyActrEventMap>(type: K, listener: (this: BlocklyActr, event: BlocklyActrEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
}
export declare function defineBlocklyActr(tagName?: string): CustomElementConstructor;
declare global {
  interface HTMLElementTagNameMap { "blockly-act-r": BlocklyActr; }
}

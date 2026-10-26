import { test, expect } from "@playwright/test";

const trace = "0.050 PROCEDURAL PRODUCTION-FIRED REQUEST-NEXT\n0.150 DECLARATIVE SET-BUFFER-CHUNK RETRIEVAL ONE-TWO";

async function open(page) {
  await page.goto("/examples/embedding.html");
  await page.evaluate(async () => {
    await customElements.whenDefined("blockly-act-r");
    await Promise.all([...document.querySelectorAll("blockly-act-r")].map((editor) => editor.ready));
  });
}

test("is self-contained, isolates globals/styles, and supports independent instances", async ({ page }) => {
  const requests = [];
  const errors = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("pageerror", (error) => errors.push(error.message));
  await open(page);
  const state = await page.evaluate(async () => {
    const first = document.querySelector("#editor");
    const second = document.querySelector("#second");
    const secondBefore = await second.getLisp();
    await second.loadLisp("(define-model independent (chunk-type goal state))");
    const style = document.createElement("style");
    style.textContent = "button { background: rgb(255, 0, 0) !important; }";
    document.head.append(style);
    const frame = first.shadowRoot.querySelector("iframe");
    return {
      first: await first.getLisp(), second: await second.getLisp(), secondBefore,
      blocklyGlobal: typeof window.Blockly,
      buttonColor: frame.contentWindow.getComputedStyle(frame.contentDocument.querySelector("#runButton")).backgroundColor,
    };
  });
  expect(state.first).toContain("define-model counting");
  expect(state.secondBefore).toBe("");
  expect(state.second).toContain("define-model independent");
  expect(state.blocklyGlobal).toBe("undefined");
  expect(state.buttonColor).not.toBe("rgb(255, 0, 0)");
  expect(requests.filter((url) => /^https?:/.test(url) && !url.startsWith("http://127.0.0.1:5173/"))).toEqual([]);
  expect(errors).toEqual([]);
});

test("round trips XML and Lisp, reports changes, and preserves the model after invalid imports", async ({ page }) => {
  await open(page);
  const result = await page.evaluate(async () => {
    const editor = document.querySelector("#editor");
    const changes = [];
    const errors = [];
    document.body.addEventListener("actr-change", (event) => changes.push(event.detail));
    editor.addEventListener("actr-error", (event) => errors.push(event.detail));
    await editor.loadLisp("(define-model embedded (chunk-type goal state) (goal-focus start))");
    const xml = await editor.getXml();
    const lisp = await editor.getLisp();
    await editor.clear();
    await editor.loadXml(xml);
    const roundTrip = await editor.getLisp();
    const invalid = await editor.loadXml('<xml><block type="does-not-exist"/></xml>').then(() => false, () => true);
    return { lisp, roundTrip, invalid, afterInvalid: await editor.getLisp(), changes, errors };
  });
  expect(result.lisp).toContain("define-model embedded");
  expect(result.roundTrip).toBe(result.lisp);
  expect(result.afterInvalid).toBe(result.lisp);
  expect(result.invalid).toBe(true);
  expect(result.changes.some((change) => change.lisp === result.lisp && change.xml.includes("actr_model"))).toBe(true);
  expect(result.errors.some((error) => error.operation === "loadXml")).toBe(true);
});

test("loads every supplied sample through the public API", async ({ page }) => {
  await open(page);
  const samples = await page.evaluate(async () => {
    const editor = document.querySelector("#editor");
    const results = [];
    for (const sample of await editor.getSamples()) {
      await editor.loadSample(sample.id);
      results.push({ id: sample.id, lisp: await editor.getLisp() });
    }
    return results;
  });
  expect(samples.map((sample) => sample.id)).toEqual(["counting", "visual-motor-keypress", "fitts-law"]);
  for (const sample of samples) expect(sample.lisp).toContain("define-model");
});

test("loads, seeks, and plays traces independently and highlights the active block", async ({ page }) => {
  await open(page);
  const result = await page.evaluate(async (text) => {
    const editor = document.querySelector("#editor");
    await editor.loadTrace(text, { autoplay: false });
    const initial = await editor.getTraceState();
    await editor.seekTrace(1);
    const selected = await editor.getTraceState();
    const frame = editor.shadowRoot.querySelector("iframe");
    const highlighted = frame.contentDocument.querySelectorAll(".actr-running-block").length;
    await editor.playTrace();
    const playing = (await editor.getTraceState()).playing;
    await editor.pauseTrace();
    const other = await document.querySelector("#second").getTraceState();
    return { initial, selected, highlighted, playing, other };
  }, trace);
  expect(result.initial.total).toBe(3);
  expect(result.initial.playing).toBe(false);
  expect(result.selected.time).toBe(0.05);
  expect(result.selected.activeBlockId).toBeTruthy();
  expect(result.highlighted).toBe(1);
  expect(result.playing).toBe(true);
  expect(result.other.total).toBe(0);
});

test("saves through events by default and persists only with a storage key", async ({ page }) => {
  await open(page);
  const saved = await page.evaluate(async () => {
    localStorage.clear();
    const editor = document.querySelector("#editor");
    const events = [];
    editor.addEventListener("actr-save", (event) => events.push(event.detail));
    const xml = await editor.save();
    const noStorage = localStorage.length;
    editor.storageKey = "test-editor";
    await editor.save();
    return { xml, events, noStorage, stored: localStorage.getItem("test-editor") };
  });
  expect(saved.noStorage).toBe(0);
  expect(saved.events[0].xml).toBe(saved.xml);
  expect(saved.stored).toBe(saved.xml);
});

test("restores saved state and handles denied local storage", async ({ page }) => {
  await open(page);
  const result = await page.evaluate(async () => {
    const first = document.querySelector("#editor");
    first.storageKey = "restore-test";
    await first.loadLisp("(define-model persisted)");
    await first.save();
    const restored = document.createElement("blockly-act-r");
    restored.storageKey = "restore-test";
    restored.runnerEndpoint = "";
    document.body.append(restored);
    await restored.ready;
    const lisp = await restored.getLisp();
    const frame = restored.shadowRoot.querySelector("iframe");
    frame.contentWindow.Storage.prototype.setItem = () => { throw new Error("Storage denied"); };
    const denied = await restored.save().then(() => false, (error) => error.message);
    return { lisp, denied, afterError: await restored.getLisp() };
  });
  expect(result.lisp).toContain("define-model persisted");
  expect(result.denied).toBe("Storage denied");
  expect(result.afterError).toBe(result.lisp);
});

test("reports startup storage errors without preventing initialization", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage unavailable"); } });
    window.startupErrors = [];
    document.addEventListener("actr-error", (event) => window.startupErrors.push(event.detail));
  });
  await page.goto("/");
  const result = await page.evaluate(async () => {
    await customElements.whenDefined("blockly-act-r");
    const editor = document.querySelector("blockly-act-r");
    await editor.ready;
    return { lisp: await editor.getLisp(), errors: window.startupErrors };
  });
  expect(result.lisp).toContain("define-model counting");
  expect(result.errors).toContainEqual({ message: "Storage unavailable", operation: "restore" });
});

test("uses a configurable runner and returns results while loading the trace", async ({ page }) => {
  let body;
  await page.route("**/test-runner", async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true, current_model: "counting", trace } });
  });
  await open(page);
  const result = await page.evaluate(async () => {
    const editor = document.querySelector("#editor");
    editor.runnerEndpoint = `${location.origin}/test-runner`;
    editor.modelUrlBase = "https://models.example/base64/";
    const events = [];
    editor.addEventListener("actr-run", (event) => events.push(event.detail.status));
    const response = await editor.run();
    await editor.pauseTrace();
    return { response, events, state: await editor.getTraceState() };
  });
  expect(body.model_url).toMatch(/^https:\/\/models.example\/base64\//);
  expect(body.run_seconds).toBeGreaterThan(0);
  expect(result.response.ok).toBe(true);
  expect(result.events).toEqual(["running", "complete"]);
  expect(result.state.total).toBe(3);
});

test("reports runner failures and cancels pending runs when the model changes", async ({ page }) => {
  await page.route("**/bad-runner", (route) => route.fulfill({ status: 500, body: "unavailable" }));
  await page.route("**/slow-runner", () => {});
  await open(page);
  const failed = await page.evaluate(async () => {
    const editor = document.querySelector("#editor");
    editor.runnerEndpoint = `${location.origin}/bad-runner`;
    return editor.run().then(() => "unexpected", (error) => error.message);
  });
  expect(failed).toContain("non-JSON");
  const pending = page.waitForRequest("**/slow-runner");
  await page.evaluate(() => {
    const editor = document.querySelector("#editor");
    editor.runnerEndpoint = `${location.origin}/slow-runner`;
    window.runOutcome = editor.run().then(() => "unexpected", (error) => error.name);
  });
  await pending;
  const cancelled = await page.evaluate(async () => {
    await document.querySelector("#editor").clear();
    return window.runOutcome;
  });
  expect(cancelled).toBe("AbortError");
  const nextPending = page.waitForRequest("**/slow-runner");
  await page.evaluate(async () => {
    const editor = document.querySelector("#editor");
    await editor.loadSample("counting");
    window.runOutcome = editor.run().then(() => "unexpected", (error) => error.name);
  });
  await nextPending;
  const removed = await page.evaluate(async () => {
    document.querySelector("#editor").remove();
    return window.runOutcome;
  });
  expect(removed).toBe("AbortError");
});

test("disposes on removal and restores the workspace on reconnection", async ({ page }) => {
  await open(page);
  const result = await page.evaluate(async () => {
    const editor = document.querySelector("#editor");
    await editor.loadLisp("(define-model reconnected)");
    const before = await editor.getLisp();
    editor.remove();
    const disconnected = await editor.getLisp().then(() => false, () => true);
    document.body.append(editor);
    await editor.ready;
    return { before, after: await editor.getLisp(), disconnected };
  });
  expect(result.after).toBe(result.before);
  expect(result.disconnected).toBe(true);
});

test("supports alternate tag names and idempotent registration", async ({ page }) => {
  await open(page);
  const lisp = await page.evaluate(async () => {
    const { defineBlocklyActr } = await import("/dist/blockly-act-r.js");
    defineBlocklyActr();
    defineBlocklyActr("my-actr-editor");
    defineBlocklyActr("my-actr-editor");
    const editor = document.createElement("my-actr-editor");
    editor.setAttribute("sample", "none");
    document.body.append(editor);
    await editor.loadLisp("(define-model custom-tag)");
    return editor.getLisp();
  });
  expect(lisp).toContain("define-model custom-tag");
});

test("preserves toolbar, file import, field editing, and download interactions", async ({ page }) => {
  await open(page);
  const frame = page.locator("#editor iframe").contentFrame();
  await frame.getByRole("button", { name: "Show sample models" }).click();
  await frame.getByRole("menuitem", { name: /Visual motor/i }).click();
  await expect(frame.locator("#codeOutput")).toContainText("define-model");
  await frame.locator("#loadInput").setInputFiles({
    name: "host-model.lisp",
    mimeType: "text/plain",
    buffer: Buffer.from("(define-model toolbar-model (chunk-type goal state))"),
  });
  await expect(frame.locator("#codeOutput")).toContainText("define-model toolbar-model");
  await frame.locator(".blocklyEditableText").filter({ hasText: "toolbar-model" }).dblclick();
  const input = frame.locator(".blocklyHtmlInput");
  await input.fill("edited-model");
  await input.press("Enter");
  await expect(frame.locator("#codeOutput")).toContainText("define-model edited-model");
  const download = page.waitForEvent("download");
  await frame.getByRole("button", { name: "Download Lisp" }).click();
  expect((await download).suggestedFilename()).toBe("actr-model.lisp");
});

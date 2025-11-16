console.log('renderer script');

// @ts-ignore
globalThis.gep.onMessage(function(...args) {
  console.info(...args);

  let item = ''
  for (const arg of args) {
    item = `${item}-${JSON.stringify(arg)}`;
  }
  addMessageToTerminal(item);

});

// Screen Capture UI wiring
async function scRefreshOnce() {
  try {
    // @ts-ignore
    const last = await globalThis.screenCapture.getLastScreenshot();
    const img = document.getElementById('scPreview') as HTMLImageElement | null;
    const statsEl = document.getElementById('scStats') as HTMLPreElement | null;
    if (!img || !statsEl) return;

    if (last?.dataURL) {
      img.src = last.dataURL;
      const { metadata } = last;
      statsEl.textContent = JSON.stringify({
        timestamp: new Date(metadata.timestamp).toISOString(),
        windowName: metadata.windowName,
        size: metadata.size
      }, null, 2);
    } else {
      img.removeAttribute('src');
      statsEl.textContent = 'No screenshot yet';
    }
  } catch (e) {
    console.error('screenCapture refresh error', e);
    addMessageToTerminal('screenCapture refresh error');
  }
}

let scInterval: number | null = null;

function scStartAutoRefresh() {
  if (scInterval) return;
  // refresh right away, then every 3s to match capture cadence
  scRefreshOnce();
  scInterval = globalThis.setInterval(scRefreshOnce, 3000) as unknown as number;
}

function scStopAutoRefresh() {
  if (scInterval) {
    globalThis.clearInterval(scInterval);
    scInterval = null;
  }
}

function wireScreenCaptureControls() {
  const startBtn = document.getElementById('scStartBtn');
  const stopBtn = document.getElementById('scStopBtn');
  const refreshBtn = document.getElementById('scRefreshBtn');
  const listBtn = document.getElementById('scListBtn');

  if (startBtn) startBtn.addEventListener('click', async () => {
    try {
      // @ts-ignore
      await globalThis.screenCapture.start();
      scStartAutoRefresh();
      addMessageToTerminal('screenCapture started');
    } catch (e) {
      console.error('screenCapture start error', e);
      addMessageToTerminal('screenCapture start error');
    }
  });

  if (stopBtn) stopBtn.addEventListener('click', async () => {
    try {
      // @ts-ignore
      await globalThis.screenCapture.stop();
      scStopAutoRefresh();
      addMessageToTerminal('screenCapture stopped');
    } catch (e) {
      console.error('screenCapture stop error', e);
      addMessageToTerminal('screenCapture stop error');
    }
  });

  if (refreshBtn) refreshBtn.addEventListener('click', scRefreshOnce);

  if (listBtn) listBtn.addEventListener('click', async () => {
    try {
      // @ts-ignore
      const list = await globalThis.screenCapture.listWindows();
      addMessageToTerminal(`windows: ${JSON.stringify(list.map((w:any)=>({ name:w.name, id:w.id })))}`);
    } catch (e) {
      console.error('screenCapture list error', e);
      addMessageToTerminal('screenCapture list error');
    }
  });

  // Try to fetch stats on load
  (async () => {
    try {
      // @ts-ignore
      const s = await globalThis.screenCapture.getStats();
      addMessageToTerminal(`screenCapture stats: ${JSON.stringify(s)}`);
    } catch {}
  })();
}


// Clear terminal button
const btn = document.querySelector<HTMLButtonElement>('#clearTerminalTextAreaBtn');
if (btn) {
  btn.addEventListener('click', () => {
    const terminal = document.querySelector<HTMLTextAreaElement>('#TerminalTextArea');
    if (terminal) {
      terminal.value = '';
    }
  });
}


function addMessageToTerminal(message: string) {
  const terminal = document.querySelector<HTMLTextAreaElement>('#TerminalTextArea');
  if (!terminal) return;
  terminal.value += message + '\n';
  terminal.scrollTop = terminal.scrollHeight;
}



// Removed overlay exclusive UI wiring

// wire after DOM ready (current file is loaded via script tag at top, so defer wiring)
globalThis.addEventListener('DOMContentLoaded', () => {
  wireScreenCaptureControls();
});

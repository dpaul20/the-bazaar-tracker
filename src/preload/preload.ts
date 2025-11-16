
console.log('** preload **')
const { contextBridge, ipcRenderer  } = require('electron');

async function initialize () {
  function replaceText (selector: string, text: string) {
   const element = document.querySelector<HTMLElement>(selector);
   if (element) {
     element.innerText = text;
   }
 }

 replaceText('.electron-version', `ow-electron v${process.versions.electron}`);
}

contextBridge.exposeInMainWorld('app', {
 initialize
});

contextBridge.exposeInMainWorld('gep', {
  onMessage: (func) =>{
    ipcRenderer.on('console-message',(e, ...args)=>{
      func(...args);
    });
  }
});

// Removed OSR and overlay demo exposures

contextBridge.exposeInMainWorld('screenCapture', {
  start: () => {
    return ipcRenderer.invoke('screen-capture:start');
  },
  stop: () => {
    return ipcRenderer.invoke('screen-capture:stop');
  },
  getLastScreenshot: () => {
    return ipcRenderer.invoke('screen-capture:get-last');
  },
  getAllScreenshots: () => {
    return ipcRenderer.invoke('screen-capture:get-all');
  },
  listWindows: () => {
    return ipcRenderer.invoke('screen-capture:list-windows');
  },
  getStats: () => {
    return ipcRenderer.invoke('screen-capture:stats');
  }
});


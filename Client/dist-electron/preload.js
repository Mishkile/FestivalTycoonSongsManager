"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  openDirectoryDialog: async () => electron.ipcRenderer.invoke("open-directory-dialog")
});

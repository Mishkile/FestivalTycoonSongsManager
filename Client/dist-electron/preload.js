"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("electronAPI",{openDirectoryDialog:async()=>e.ipcRenderer.invoke("open-directory-dialog")});

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openDirectoryDialog: async () => ipcRenderer.invoke('open-directory-dialog')
});

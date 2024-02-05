import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { outputFile, outputFileSync } from 'fs-extra/esm'
import path from 'path'

import { app, BrowserWindow, ipcMain, dialog } from "electron"

let mainWindow : any;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // Your window configurations
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: "path_to_your_preload_script.js" // Setup your preload script here
        }
    });

    // Load your index.html or React app entry point
    mainWindow.loadURL('path_to_your_index.html');

    ipcMain.handle('open-directory-dialog', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        });
        return result.filePaths;
    });
});
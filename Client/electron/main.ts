import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

import path from 'path';
import express from 'express';
import cors from 'cors';
// Initialize Express
import { addSongLength, getFileData, getSongsWithId, removeSongFromFolderAndFile, renameAndAddSongEntry } from './Server/Repositories/fileRepository';


// Environment variables for the client build path and the public path
const DIST_PATH = path.join(__dirname, '../dist');
const PUBLIC_PATH = app.isPackaged ? DIST_PATH : path.join(DIST_PATH, '../public');


const server = express();
const SERVER_PORT = 8000; // The port your server will listen on

server.use(cors()); // Enable CORS for all routes


server.use(express.json());


server.post("/api/file", async (req, res) => {
  const documentPath = req.body.documentPath;
  try {

    const data = await getFileData(documentPath);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
})

server.post("/api/songsWithIds", async (req, res) => {
  const documentPath = req.body.documentPath;
  try {

    const data = await getSongsWithId(documentPath);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
})

server.post("/api/add", async (req, res) => {
  const documentPath = req.body.documentPath;
  const genreId = req.body.genreId;
  const length = req.body.length;
  const bandName = req.body.bandName;
  const songName = req.body.songName;

  try {

    const data = await renameAndAddSongEntry(documentPath, genreId, length, bandName, songName);
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
})

server.post("/api/addlength", async (req, res) => {
  const documentPath = req.body.documentPath;
  const existingSongId = req.body.existingSongId;
  const songLength = req.body.songLength;
  const genreId = req.body.genreId;
  console.log(documentPath, existingSongId, songLength)

  try {

    const data = await addSongLength(existingSongId, documentPath, songLength, genreId);
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
})

server.delete("/api/:songId", async (req, res) => {
  const songId = req.params.songId;
  const documentPath = req.body.documentPath;
  console.log(req.body)
  console.log(songId, documentPath)
  try {
    const data = await removeSongFromFolderAndFile(songId, documentPath);
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
})






// Set up server routes



// Start the server
server.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});


let win: BrowserWindow | null = null;
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow(): void {
  win = new BrowserWindow({
    icon: path.join(PUBLIC_PATH, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date()).toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(DIST_PATH, 'index.html'));
  }
}

ipcMain.handle('open-directory-dialog', async () => {
  if (!win) {
    throw new Error('The main window is not created yet.');
  }

  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
  });

  if (canceled) {
    return; // User canceled the dialog
  } else {
    return filePaths[0]; // Return the selected directory path
  }
});



app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  win = null;
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

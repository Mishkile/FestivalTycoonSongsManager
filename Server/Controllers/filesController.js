const express = require('express');
const router = express.Router();
const fileRepository = require('../Repositories/fileRepository');

router.post("/file", async (req,res) => {
    const documentPath = req.body.documentPath;
    try {
       
        const data = await fileRepository.getFileData(documentPath);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/songsWithIds", async (req,res) => {
    const documentPath = req.body.documentPath;
    try {
       
        const data = await fileRepository.getSongsWithId(documentPath);
        return res.status(200).send(data);
    } catch (error) {
       return res.status(500).send(error);
    }
})

router.post("/add", async (req,res) => {
    const documentPath = req.body.documentPath;
    const genreId = req.body.genreId;
    const length = req.body.length;
    const bandName = req.body.bandName;
    const songName = req.body.songName;
  
    try {
       
        const data = await fileRepository.renameAndAddSongEntry(documentPath, genreId, length, bandName, songName);
        return res.status(200).send(data);
    } catch (error) {
       return res.status(500).send(error.message);
    }
})

router.post("/addlength", async (req,res) => {
    const documentPath = req.body.documentPath;
    const existingSongId = req.body.existingSongId;
    const songLength = req.body.songLength;
    const genreId = req.body.genreId;
    console.log(documentPath, existingSongId, songLength)
  
    try {
       
        const data = await fileRepository.addSongLength(existingSongId, documentPath, songLength, genreId);
        return res.status(200).send(data);
    } catch (error) {
       return res.status(500).send(error.message);
    }
})

router.delete("/:songId", async (req,res) => {
    const songId = req.params.songId;
    const documentPath = req.body.documentPath;
    console.log(req.body)
    console.log(songId, documentPath)
    try {
        const data = await fileRepository.removeSongFromFolderAndFile(songId, documentPath);
        return res.status(200).send(data);
    } catch (error) {
       return res.status(500).send(error.message);
    }
})
module.exports = router;
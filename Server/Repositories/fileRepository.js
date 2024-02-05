const fs = require("fs")
const path = require('path');
const fs2 = require('fs').promises;
const fse = require('fs-extra');


const getFileData = (documentPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${documentPath}/songData.txt`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            // Split the file content into lines
            const lines = data.trim().split('\n');

            // Initialize an array to store the parsed objects
            const dataArray = [];

            // Iterate through the lines and parse each JSON object
            lines.forEach((line) => {
                try {
                    // Extract the "song id" from the beginning of each line
                    const songIdMatch = line.match(/^([^:]+):/);
                    if (songIdMatch) {
                        const songId = songIdMatch[1];
                        const jsonStart = line.indexOf('{');
                        if (jsonStart !== -1) {
                            const jsonObject = JSON.parse(line.substring(jsonStart));
                            // Include the "song id" in the parsed object
                            jsonObject.songId = songId;
                            // // u_[genre ID]_[song ID]_[length]-[text] - check what is the length of the song, 1 == 30sec, 2 == 60sec, 3 == 90sec and add this as a field to the object as: songLength: "30sec" for eaxmple
                            const songLength = songId.split('_')[3]; // 1 === 30sec, 2 === 60sec, 3 === 90sec
                            switch (songLength) {
                                case "1":
                                    jsonObject.songLength = "30sec";
                                    break;
                                case "2":
                                    jsonObject.songLength = "60sec";
                                    break;
                                case "3":
                                    jsonObject.songLength = "90sec";
                                    break;
                                default:
                                    jsonObject.songLength = "unknown";
                                    break;
                            }



                            dataArray.push(jsonObject);
                        }
                    }
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            });

            resolve(dataArray);
        });
    });
};


async function getSongsWithId(documentPath) {
    const songs = await getFileData(documentPath)

    const groupedSongs = {};

    for (const song of songs) {
        const regex = /u_\d+_(\d+)_\d+/;
        const match = song.songId.match(regex);
        const songId = match ? match[1] : null;

        if (songId) {
            if (!groupedSongs[songId]) {
                groupedSongs[songId] = [];
            }
            groupedSongs[songId].push(song);
        }
    }



    console.log(groupedSongs)
    return Object.keys(groupedSongs).map(songId => {
        return { songId: songId, songs: groupedSongs[songId] };
    });
}



async function renameAndAddSongEntry(documentPath, genreId, length, bandName, songName) {
    const directoryPath = path.dirname(documentPath);

    const songDataPath = path.join(directoryPath, 'songData.txt');



    const songData = await getFileData(directoryPath)
    console.log(songData)

    // Generate a new unique song ID
    let songId;
    for (let id = 1; id <= 300; id++) {
        let formattedSongId = id.toString().padStart(3, '0');
        let potentialId = `u_${genreId}_${formattedSongId}_${length}`;
        let idExists = songData.some(song => song.songId.startsWith(`u_${genreId}_${formattedSongId}_`));

        if (!idExists) {
            songId = potentialId;
            break;
        }
    }

    if (!songId) {
        throw new Error('Unable to generate a unique song ID. All IDs are taken.');
    }

    // Rename the file
    const newFileName = `${songId}.wav`;
    const newFilePath = path.join(directoryPath, newFileName);
    console.log(newFilePath)
    await fse.move(documentPath, newFilePath);


    // Construct the new entry with the songId as the key
    const newEntry = {};
    newEntry[songId] = {
        bandName: bandName, // Replace with actual data if available
        songName: songName // Remove songId and songLength from here
    };

    // Convert the new entry to a string that looks like a JSON object line
    const newEntryString = `${songId}: ${JSON.stringify(newEntry[songId])}\n`;

    // Append the new entry string to songData.txt
    await fs2.appendFile(songDataPath, newEntryString);

    console.log(`File renamed to ${newFileName} and entry added to songData.txt`);
    return `File renamed to ${newFileName} and entry added to songData.txt`
}



async function addSongLength(existingSongId, documentPath, songLength, genreId) {
    const directoryPath = path.dirname(documentPath);
    const songDataPath = path.join(directoryPath, 'songData.txt');
    const fileExtension = path.extname(documentPath); // Assuming .wav, but dynamically getting it
    const songDataContent = await getFileData(directoryPath)
    const songExists = songDataContent.some(entry => entry.songId.includes(`u_${genreId}_${existingSongId}`));
    console.log(songExists)
    if (!songExists) {
        throw new Error(`Song ID u_${genreId}_${existingSongId} does not exist.`);
    }
    const songData = songDataContent.filter(entry => entry.songId.includes(`u_${genreId}_${existingSongId}`));
    console.log(songData)

    const lengthExists = songData.some(entry => entry.songId === `u_${genreId}_${existingSongId}_${songLength}`);
    if (lengthExists) {
        throw new Error(`Length ${songLength} for song ID u_${genreId}_${existingSongId} already exists.`);
    }

    // Rename the file
    const newFileName = `u_${genreId}_${existingSongId}_${songLength}${fileExtension}`;
    console.log(newFileName)
    const newFilePath = path.join(directoryPath, newFileName);
    await fse.move(documentPath, newFilePath);

    // Get the details from the existing song
    const existingEntry = songData.find(entry => entry.songId.includes(`u_${genreId}_${existingSongId}`))
    const newEntry = {};
    newEntry[`u_${genreId}_${existingSongId}_${songLength}`] = {
        bandName: existingEntry.bandName,
        songName: existingEntry.songName
    };

    // Add new entry to songData.txt
    const newEntryString = `${`u_${genreId}_${existingSongId}_${songLength}`}: ${JSON.stringify(newEntry[`u_${genreId}_${existingSongId}_${songLength}`])}\n`;
    await fs2.appendFile(songDataPath, newEntryString);

    console.log(`File renamed to ${newFileName} and entry added to songData.txt`);
    return `File renamed to ${newFileName} and entry added to songData.txt`;
}


const removeSongFromFolderAndFile = async (songId, documentPath) => {
    const songDataPath = path.join(documentPath, 'songData.txt');

    // Read and parse the songData.txt
    const songDataContent = await fs2.readFile(songDataPath, 'utf8');
    const songEntries = songDataContent.split('\n').filter(Boolean);

    // Filter out the entries corresponding to the song ID and its lengths
    const newSongData = songEntries.filter(entry => !entry.includes(`_${songId}_`));

    // Determine the associated WAV files to remove
    const filesToRemove = songEntries.filter(entry => entry.includes(`_${songId}_`))
        .map(entry => {
            const fileNameMatch = entry.match(/^(u_\d+_\d+_\d+):/); // This regex will capture the file name format u_genreId_songId_length
            if (fileNameMatch) {
                const fileName = fileNameMatch[1] + '.wav'; // Construct the file name
                return path.join(documentPath, fileName); // Get the full path to the file
            }
            return null;
        })
        .filter(Boolean); // Remove any null entries that didn't match the regex

    // Remove the WAV files
    for (const filePath of filesToRemove) {
        try {
            console.log("filePath is", filePath)
            await fs2.unlink(filePath);
            console.log(`Removed file: ${filePath}`);
        } catch (err) {
            console.error(`Failed to delete ${filePath}: ${err.message}`);
        }
    }

    // Rewrite the songData.txt file with the filtered entries
    await fs2.writeFile(songDataPath, newSongData.join('\n') + '\n');

    console.log(`Removed song ${songId} and all associated files.`);
    return `Removed song ${songId} and all associated files.`;
};
module.exports = { getFileData, getSongsWithId, renameAndAddSongEntry, addSongLength, removeSongFromFolderAndFile }
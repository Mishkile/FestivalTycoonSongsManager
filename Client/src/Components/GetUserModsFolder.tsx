import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
declare global {
  interface Window {
    electronAPI: {
      openDirectoryDialog: () => Promise<string>;
    };
  }
}

const GetUserModsFolder = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state);

  const [folderPath, setFolderPath] = useState('');

  const selectFolder = async () => {
    try {
      let path = await window.electronAPI.openDirectoryDialog();
      console.log(path); // You can remove this line after confirming it works
      path = path.replace(/\\/g, '\\\\');



      // const action: Action = new Action('SET_DOCUMENTS_PATH', folderPath)

      dispatch({ type: 'SET_DOCUMENTS_PATH', payload: path })
      localStorage.setItem('documentsPath', path);
      setFolderPath(path);
      // Now you can use the folder path as needed
    } catch (error) {
      console.error('An error occurred while selecting the folder:', error);
      alert('An error occurred while selecting the folder:');

    }
  };

  return (
    <div>
      <h1>Select a Folder</h1>
      <button onClick={selectFolder}>Open Folder Dialog</button>
      {folderPath && <p>Selected Folder: {store?.documentsPath} from redux</p>}
    </div>
  );
};

export default GetUserModsFolder;

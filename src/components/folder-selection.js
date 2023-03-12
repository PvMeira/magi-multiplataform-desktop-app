import React from 'react';
import { Button } from 'react-bootstrap';
const remote = window.require('@electron/remote');
const fs = window.require('fs');
const { dialog } = remote;

function FolderSelection({disable, selectionCallback}) {

    const openFolderSelection = async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory'],
            buttonLabel:'Select folder',
            title:'Select The folder containing the translation json files.',
            message:'Select The folder containing the translation json files.'
          })
          if (!result.canceled) {
            const files = fs.readdirSync(result.filePaths[0]);
            selectionCallback({files, folderLocation:result.filePaths[0]});

          }
         
    }
  return (
    <Button variant="outline-primary"  onClick={openFolderSelection} disabled={!disable}>
    Select Target Folder
  </Button>
  )
}

export default FolderSelection
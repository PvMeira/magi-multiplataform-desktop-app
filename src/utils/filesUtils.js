
const fs = window.require('fs');
const path = window.require('path');

export const godFunction = (file, targetLocation, name, value) => {
        try {
            const filePath = path.join(targetLocation, file);
            const jsonData = JSON.parse(fs.readFileSync(filePath));
        
            const keyName = path.basename(file, '.json');
            if (jsonData[keyName]) {
                jsonData[keyName] = { ...jsonData[keyName], [name]:  value}; // Replace with the new property and value
            } else {
                return {process:false, message: 'The file does not contain a object with the file name of  : ' + keyName}
            }
            
            try {
                fs.writeFileSync(filePath, JSON.stringify(jsonData));
            } catch (error) {
                return {process:false, message: 'A error has occur while trying to write the file : ' + error.message}

            }
            return {process:true};
        } catch (error) {
            return {process:false, message: 'A unknown error has occur'}
        }
};

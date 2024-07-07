const fs = require('fs');
const path = require('path');

exports.getFromFile = (filePath) => {
	return new Promise((resolve, rejects) => {
		fs.readFile(filePath, (error, fileContent) => {
			if (error) {
				resolve(null);
			} else {
				const parsedFileContent = JSON.parse(fileContent);
				resolve(parsedFileContent ? parsedFileContent : null);
			}
		});
	});
};

exports.saveToFile = (filePath, newContent) => {
	return new Promise((resolve, rejects) => {
		fs.writeFile(filePath, JSON.stringify(newContent), (error) => {
			if (error) {
				rejects(error);
			} else {
				resolve();
			}
		});
	});
}

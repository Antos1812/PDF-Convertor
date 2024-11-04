function updateFileName() {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = 'Missing File';
    }
}

// Funkcja konwertująca PDF do TXT
function convertPDFToTXT() {
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0) {
        alert('Please select file');
        return;
    }

    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            let textContent = '';
            const promises = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                promises.push(pdf.getPage(i).then(function(page) {
                    return page.getTextContent().then(function(text) {
                        text.items.forEach(function(item) {
                            textContent += item.str + ' ';  // Dodajemy spację po każdym elemencie tekstu
                        });
                    });
                }));
            }

            Promise.all(promises).then(function() {
                const blob = new Blob([textContent], {type: 'text/plain'});
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'yourFile.txt';
                link.click();
                
                // Usunięcie obiektu URL po pobraniu
                URL.revokeObjectURL(link.href);
            }).catch(function(error) {
                console.error("Error while convertering pdf sites: ", error);
                alert("Failed to extract text from PDF.");
            });
        }).catch(function(error) {
            console.error("Error in load PDF sites: ", error);
            alert("Failed to upload PDF file");
        });
    };

    fileReader.readAsArrayBuffer(file);
}

// Funkcja konwertująca PDF do Word
function convertPDFToWord() {
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0) {
        alert('Please select PDF file');
        return;
    }

    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            let textContent = '';
            const promises = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                promises.push(pdf.getPage(i).then(function(page) {
                    return page.getTextContent().then(function(text) {
                        text.items.forEach(function(item) {
                            textContent += item.str + ' ';
                        });
                    });
                }));
            }

            Promise.all(promises).then(function() {
                const blob = new Blob([textContent], {type: 'application/msword'});
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'yourFile.doc';
                link.click();
                
                // Usunięcie obiektu URL po pobraniu
                URL.revokeObjectURL(link.href);
            }).catch(function(error) {
                console.error("Error while processing PDF pages:", error);
                alert("Failed to extract text from PDF.");
            });
        }).catch(function(error) {
            console.error("Error while loading PDF: ", error);
            alert("Failed to load PDF file..");
        });
    };

    fileReader.readAsArrayBuffer(file);
}

// Funkcja konwertująca PDF do OpenOffice
function convertPDFToOpenOffice() {
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0) {
        alert('Please select file');
        return;
    }

    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            let textContent = '';
            const promises = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                promises.push(pdf.getPage(i).then(function(page) {
                    return page.getTextContent().then(function(text) {
                        text.items.forEach(function(item) {
                            textContent += item.str + ' ';  // Dodajemy spację po każdym elemencie tekstu
                        });
                    });
                }));
            }

            Promise.all(promises).then(function() {
                const blob = new Blob([textContent], {type: 'application/vnd.oasis.opendocument.text'});
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'yourFile.odt';
                link.click();
                
                // Usunięcie obiektu URL po pobraniu
                URL.revokeObjectURL(link.href);
            }).catch(function(error) {
                console.error("Błąd podczas przetwarzania stron PDF: ", error);
                alert("Nie udało się wyodrębnić tekstu z PDF.");
            });
        }).catch(function(error) {
            console.error("Błąd podczas ładowania PDF: ", error);
            alert("Nie udało się załadować pliku PDF.");
        });
    };

    fileReader.readAsArrayBuffer(file);
}

// Przypisanie funkcji do przycisków
document.getElementById('convertBtn').onclick = convertPDFToTXT;
document.getElementById('convertToWordBtn').onclick = convertPDFToWord;
document.getElementById('convertToOpenOfficeBtn').onclick = convertPDFToOpenOffice;

function encryptMessage() {
    const message = document.getElementById('message').value;
    const key1 = document.getElementById('key1').value;
    const key2 = document.getElementById('key2').value;

    if (!message || !key1 || !key2) {
        alert('Lütfen mesaj ve anahtarları girin.');
        return;
    }

    const firstEncrypted = CryptoJS.AES.encrypt(message, key1).toString();
    const secondEncrypted = CryptoJS.AES.encrypt(firstEncrypted, key2).toString();
    
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<strong>Şifrelenmiş Mesaj:</strong> <a href="#" onclick="return false;">${secondEncrypted}</a>`;
    appendCopyButton(resultElement, secondEncrypted);
}

function decryptMessage() {
    const encryptedMessage = document.getElementById('message').value;
    const key1 = document.getElementById('key1').value;
    const key2 = document.getElementById('key2').value;

    if (!encryptedMessage || !key1 || !key2) {
        alert('Lütfen şifrelenmiş mesaj ve anahtarları girin.');
        return;
    }

    try {
        const firstDecrypted = CryptoJS.AES.decrypt(encryptedMessage, key2);
        const firstDecryptedText = firstDecrypted.toString(CryptoJS.enc.Utf8);

        if (!firstDecryptedText) {
            throw new Error('Çözme başarısız oldu.');
        }

        const secondDecrypted = CryptoJS.AES.decrypt(firstDecryptedText, key1);
        const originalMessage = secondDecrypted.toString(CryptoJS.enc.Utf8);

        if (!originalMessage) {
            throw new Error('Çözme başarısız oldu.');
        }

        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `<strong>Çözülmüş Mesaj:</strong><br><a href="#" onclick="return false;">${originalMessage}</a>`;
    } catch (error) {
        alert('Şifre çözme başarısız oldu. Lütfen geçerli anahtarları ve şifrelenmiş mesaj girin.');
    }
}

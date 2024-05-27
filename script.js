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
    resultElement.innerHTML = `<strong>Şifrelenmiş Mesaj:</strong> ${secondEncrypted}`;
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
        const link = `<a href="https://${originalMessage}" target="_blank">${originalMessage}</a>`;
        resultElement.innerHTML = `<strong>Çözülmüş Mesaj:</strong><br>${link}`;
    } catch (error) {
        alert('Şifre çözme başarısız oldu. Lütfen geçerli anahtarları ve şifrelenmiş mesaj girin.');
    }
}

function appendCopyButton(parentElement, message) {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '&#128203;';
    copyButton.className = 'copy-button';
    copyButton.onclick = function() {
        copyToClipboard(message);
    };
    parentElement.insertAdjacentHTML('beforeend', ' ');
    parentElement.insertAdjacentElement('beforeend', copyButton);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Mesaj panoya kopyalandı.');
}

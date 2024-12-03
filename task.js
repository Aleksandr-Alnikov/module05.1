const loadName = () => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('displayName').textContent =`Сохранённое имя: ${savedName}`;
    }
};

const saveName = () => {
    const nameInput = document.getElementById('nameInput').value;
    localStorage.setItem('userName', nameInput);
    document.getElementById('displayName').textContent = `Сохранённое имя: ${nameInput}`;
};

window.onload = loadName;
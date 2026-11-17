const changePhotoBtn = document.getElementById("changePhotoBtn");
const userAvatar = document.getElementById("userAvatar");

if (changePhotoBtn && userAvatar) {
  const photos = [
    "Фото/Профиль.svg",
    "Фото/Профиль2.svg",
  ];
  let current = 0;
  
  changePhotoBtn.addEventListener("click", () => {
    current = (current + 1) % photos.length;
    userAvatar.src = photos[current];
  });
}

const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const fio = document.getElementById("fio").value.trim();
    const group = document.getElementById("group").value.trim();
    
    const fioInput = document. getElementById("fio");
    const groupInput = document.getElementById("group");
    const fioError = document.getElementById("fioError");
    const groupError = document.getElementById("groupError");
    
    fioInput.style.borderColor = "";
    groupInput.style.borderColor = "";
    fioError.textContent = "";
    groupError.textContent = "";
    
    let hasError = false;
    
    if (!fio) {
      fioInput.style.borderColor = "#ef4444";
      fioError.textContent = "Введите ФИО";
      hasError = true;
    } else {
      const fioParts = fio.split(/\s+/);
      if (fioParts.length < 2 || fioParts.length > 3) {
        fioInput.style.borderColor = "#ef4444";
        fioError.textContent = "ФИО должно содержать 2-3 слова";
        hasError = true;
      } else if (!/^[А-Яа-яЁёA-Za-z\s]+$/.test(fio)) {
        fioInput.style.borderColor = "#ef4444";
        fioError.textContent = "ФИО должно содержать только буквы";
        hasError = true;
      }
    }
    
    if (!group) {
      groupInput.style.borderColor = "#ef4444";
      groupError.textContent = "Введите группу";
      hasError = true;
    } else if (!/^[А-Яа-яЁёA-Za-z]{1,4}[-\d]*$/.test(group)) {
      groupInput.style.borderColor = "#ef4444";
      groupError.textContent = "Неверный формат группы (пример: ВР1, ИТ-21)";
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    localStorage.setItem("userFio", fio);
    localStorage.setItem("userGroup", group);
    
    saveBtn.textContent = "Сохранено!";
    saveBtn.style.background = "#22c55e";
    
    setTimeout(() => {
      saveBtn.textContent = "Сохранить изменения";
      saveBtn.style.background = "";
    }, 2000);
  });
  
  const fioInput = document.getElementById("fio");
  const groupInput = document.getElementById("group");
  
  if (fioInput) fioInput.value = localStorage.getItem("userFio") || "";
  if (groupInput) groupInput.value = localStorage.getItem("userGroup") || "";
  
  if (fioInput) {
    fioInput.addEventListener("input", () => {
      fioInput.style.borderColor = "";
      document.getElementById("fioError").textContent = "";
    });
  }
  
  if (groupInput) {
    groupInput.addEventListener("input", () => {
      groupInput.style.borderColor = "";
      document.getElementById("groupError").textContent = "";
    });
  }
}
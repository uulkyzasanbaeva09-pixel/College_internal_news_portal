const changePhotoBtn = document.getElementById("changePhotoBtn");
const userAvatar=document.getElementById("userAvatar");
if(changePhotoBtn && userAvatar){
  const photos =[
    "Фото/Профиль.svg",
    "Фото/Профиль2.svg",
  ];
  let current=0;
  changePhotoBtn.addEventListener("click", () => {
    current=(current+1) % photos.length;
    userAvatar.src = photos[current];
  });
};
const saveBtn = document.querySelector(".save-btn");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const fio = document.getElementById("fio").value;
    const group = document.getElementById("group").value;

    if (fio) localStorage.setItem("userFio", fio);
    if (group) localStorage.setItem("userGroup", group);

    const originalText = saveBtn.textContent;
    saveBtn.textContent = "Сохранено!";
    saveBtn.style.background = "#22c55e"; 

    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.background = ""; 
    }, 2000);
  });

  const savedFio = localStorage.getItem("userFio");
  const savedGroup = localStorage.getItem("userGroup");

  const fioInput = document.getElementById("fio");
  const groupInput = document.getElementById("group");

  if (savedFio && fioInput) fioInput.value = savedFio;
  if (savedGroup && groupInput) groupInput.value = savedGroup;
}
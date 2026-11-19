const exitButton = document.querySelector(".exit");
const logoutModal = document.querySelector("#logoutModal");

if (exitButton && logoutModal) {
  const confirmExit = document.querySelector(".logout-confirm");
  const cancelExit = document.querySelector(".logout-cancel");

  exitButton.addEventListener("click", () => {
    logoutModal.showModal();
  });

  cancelExit.addEventListener("click", () => {
    logoutModal.close();
  });

  if (confirmExit) {
    confirmExit.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const arrowNext = document.querySelector(".arrow-next");
const arrowBack = document.querySelector(".arrow-back");

if (slides.length > 0 && dots.length > 0 && arrowNext && arrowBack) {
  let current = 0;
  let timer;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 6000);
  }

  arrowNext.addEventListener("click", () => {
    showSlide(current + 1);
    startTimer();
  });

  arrowBack.addEventListener("click", () => {
    showSlide(current - 1);
    startTimer();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      startTimer();
    });
  });

  showSlide(0);
  startTimer();
}


if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
}

const themeRadios = document.querySelectorAll('input[name="theme"]');

if (themeRadios.length > 0) {
  themeRadios.forEach((radio) => {
    radio.checked = radio.value === localStorage.getItem("theme");

    radio.addEventListener("change", () => {
      if (radio.value === "light") {
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
      }
    });
  });
}
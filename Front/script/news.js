const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".new");
const emptyState = document.getElementById("emptyState");
const filterModal = document.getElementById("filterModal");
const filterIcon = document.querySelector(".filter-icon");
const resetBtn = document.getElementById("resetFilters");
const applyBtn = document.getElementById("applyFilters");

cards.forEach((card) => card.classList.remove("hidden"));
if (emptyState) emptyState.classList.remove("show");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    checkEmpty();
  });
});

if (filterIcon) {
  filterIcon.addEventListener("click", () => {
    filterModal.showModal();
  });
}

filterModal.addEventListener("click", (e) => {
  if (e.target === filterModal) {
    filterModal.close();
  }
});

resetBtn.addEventListener("click", () => {
  document.getElementById("filterSpecialty").value = "";
  document.getElementById("filterDate").value = "";
  document.getElementById("filterTime").value = "";

  document.querySelectorAll('input[name="category"]').forEach((cb) => {
    cb.checked = false;
  });

  cards.forEach((card) => card.classList.remove("hidden"));

  filterBtns.forEach((b) => b.classList.remove("active"));
  document
    .querySelector('.filter-btn[data-filter="all"]')
    .classList.add("active");

  checkEmpty();
  filterModal.close();
});

applyBtn.addEventListener("click", () => {
  const specialty = document.getElementById("filterSpecialty").value;
  const date = document.getElementById("filterDate").value.trim();
  const timePeriod = document.getElementById("filterTime").value;

  const selectedCategories = [];
  document.querySelectorAll('input[name="category"]:checked').forEach((cb) => {
    selectedCategories.push(cb.value);
  });

  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const cardSpecialty = card.dataset.specialty;
    const cardDate = card.dataset.date;
    const cardTimePeriod = card.dataset.timePeriod;

    let show = true;

    if (specialty && cardSpecialty !== specialty) show = false;
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(cardCategory)
    )
      show = false;
    if (date && cardDate !== date) show = false;
    if (timePeriod && cardTimePeriod !== timePeriod) show = false;

    if (show) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  filterBtns.forEach((b) => b.classList.remove("active"));

  checkEmpty();
  filterModal.close();
});

function checkEmpty() {
  const visible = document.querySelectorAll(".new:not(.hidden)");

  if (emptyState) {
    if (visible.length === 0) {
      emptyState.classList.add("show");
    } else {
      emptyState.classList.remove("show");
    }
  }
}

document.querySelectorAll(".heart").forEach((heart) => {
  heart.addEventListener("click", (e) => {
    e.stopPropagation();
    heart.classList.toggle("active");
  });
});

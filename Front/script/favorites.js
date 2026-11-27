function getArticleId(card) {
    return card.dataset.articleId || "";
}

function addToFavorites(card) {
    const id = getArticleId(card);

    if (!id) return;

    const favorites = getFavorites();

    if (favorites.some(item => item.id === id)) return;

    favorites.push({
        id,
        image: card.querySelector("img")?.getAttribute("src") || "",
        title: card.querySelector("h3")?.textContent.trim() || "",
        date: card.querySelectorAll("time")[0]?.textContent.trim() || "",
        time: card.querySelectorAll("time")[1]?.textContent.trim() || "",
        category: card.dataset.category || "",
        selected: false
    });

    saveFavorites(favorites);
}

function removeFromFavorites(id) {
    saveFavorites(getFavorites().filter(item => item.id !== id));
    renderFavorites();
    updateHearts();
}

function renderFavorites() {
    const container = document.querySelector("#favoritesContainer");

    if (!container) return;

    const favorites = getFavorites();

    container.innerHTML = "";

    if (favorites.length === 0) {
        container.innerHTML =
            '<p class="empty-favorites">В избранном пока нет новостей</p>';

        updateSelection();
        return;
    }

    favorites.forEach(item => {
        const wrapper = document.createElement("div");
        wrapper.className = "favorite-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "favorite-checkbox";
        checkbox.checked = item.selected || false;
        checkbox.setAttribute("aria-label", "Выбрать новость");

        checkbox.addEventListener("change", () => {
            const current = getFavorites();
            const found = current.find(news => news.id === item.id);

            if (found) {
                found.selected = checkbox.checked;
                saveFavorites(current);
            }

            updateSelection();
        });

        const card = document.createElement("article");
        card.className = "new favorite-card";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.title;

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("time");
        date.textContent = item.date;

        const time = document.createElement("time");
        time.textContent = item.time;

        const heart = document.createElement("button");
        heart.type = "button";
        heart.className = "heart active";
        heart.setAttribute("aria-label", "Убрать из избранного");

        heart.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 21s-8.5-5.3-10-9.5C.8 7.8 3.2 4.5 6.7 4.5c2 0 3.8 1.2 5.3 3 1.5-1.8 3.3-3 5.3-3 3.5 0 5.9 3.3 4.7 7C20.5 15.7 12 21 12 21z"/>
            </svg>
        `;

        heart.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            removeFromFavorites(item.id);
        });

        card.addEventListener("click", () => {
            window.location.href = item.id;
        });

        card.append(image, title, date, time, heart);
        wrapper.append(checkbox, card);
        container.appendChild(wrapper);
    });

    updateSelection();
}

function updateSelection() {
    const favorites = getFavorites();
    const selected = favorites.filter(item => item.selected);

    const count = document.querySelector("#selectedCount");
    const actions = document.querySelector("#selectionActions");

    if (count) {
        count.textContent = `Выбрано: ${selected.length}`;
    }

    if (actions) {
        actions.style.display = favorites.length ? "flex" : "none";
    }
}

function updateHearts() {
    const favorites = getFavorites();

    document.querySelectorAll(".card, .new").forEach(card => {
        const id = getArticleId(card);
        const heart = card.querySelector(".heart");

        if (!heart || !id) return;

        const isFavorite = favorites.some(item => item.id === id);

        heart.classList.toggle("active", isFavorite);
    });
}

const deleteButton = document.querySelector("#deleteSelectedBtn");

if (deleteButton) {
    deleteButton.addEventListener("click", () => {
        const remaining = getFavorites().filter(item => !item.selected);

        saveFavorites(remaining);
        renderFavorites();
        updateHearts();
    });
}

const clearButton = document.querySelector("#clearFavoritesBtn");

if (clearButton) {
    clearButton.addEventListener("click", () => {
        if (!confirm("Удалить все новости из избранного?")) return;

        saveFavorites([]);
        renderFavorites();
        updateHearts();
    });
}

document.addEventListener("click", event => {
    const heart = event.target.closest(".heart");

    if (!heart) return;

    const card = heart.closest(".card, .new");

    if (!card || card.classList.contains("favorite-card")) return;

    event.preventDefault();
    event.stopPropagation();

    const id = getArticleId(card);

    if (!id) return;

    const favorites = getFavorites();
    const exists = favorites.some(item => item.id === id);

    if (exists) {
        removeFromFavorites(id);
    } else {
        addToFavorites(card);
    }

    updateHearts();
}, true);

const articleHeart = document.querySelector(".article-meta .heart");

if (articleHeart) {
    const id = location.pathname.split("/").pop();

    articleHeart.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        const current = getFavorites();
        const exists = current.some(item => item.id === id);

        if (exists) {
            removeFromFavorites(id);
        } else {
            const title =
                document.querySelector(".article-header h1")?.textContent.trim() || "";

            const image =
                document.querySelector(".article-header img")?.getAttribute("src") || "";

            const date =
                document.querySelector(".article-meta .meta-item")?.textContent.trim() || "";

            current.push({
                id,
                title,
                image,
                date,
                time: "",
                selected: false
            });

            saveFavorites(current);
        }

        articleHeart.classList.toggle("active", !exists);
    });
}

databaseReady.then(() => {
    renderFavorites();
    updateHearts();

    if (articleHeart) {
        const id = location.pathname.split("/").pop();

        articleHeart.classList.toggle(
            "active",
            getFavorites().some(item => item.id === id)
        );
    }
}).catch(error => {
    console.error("Ошибка загрузки избранного:", error);
});
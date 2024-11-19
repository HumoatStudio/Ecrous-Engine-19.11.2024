// Функция для перехода на другую страницу
function openPage(pageUrl) {
    window.location.href = pageUrl;
}

// Скрываем модальные окна при старте
window.onload = function() {
    var modal = document.getElementById("myModal"); // Модальное окно
    var modalNews = document.getElementById("myModalNews"); // Модальное окно новостей

    if (modal) modal.style.display = "none"; // Скрываем модальное окно при старте
    if (modalNews) modalNews.style.display = "none"; // Скрываем модальное окно новостей при старте
};

// Получаем элементы DOM
var modal = document.getElementById("myModal"); // Модальное окно
var btn = document.getElementById("myBtn"); // Кнопка "Благодарности"
var span = document.getElementsByClassName("close")[0]; // Кнопка закрытия

var modalNews = document.getElementById("myModalNews"); // Модальное окно новостей
var btnNews = document.getElementById("News"); // Кнопка "Новости"
var NewsClose = document.getElementsByClassName("closeNews")[0]; // Кнопка закрытия новостей

// Проверяем наличие элементов перед добавлением событий
if (btn && modal) {
    btn.onclick = function() {
        modal.style.display = "block"; // Показываем модальное окно
    };
}

if (span && modal) {
    span.onclick = function() {
        modal.style.display = "none"; // Закрываем модальное окно
    };
}

if (btnNews && modalNews) {
    btnNews.onclick = function() {
        modalNews.style.display = "block"; // Показываем модальное окно новостей
    };
}

if (NewsClose && modalNews) {
    NewsClose.onclick = function() {
        modalNews.style.display = "none"; // Закрываем модальное окно новостей
    };
}

// Функция для открытия секций
function openSection(section) {
    // Скрываем все секции
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(sec) {
        sec.style.display = 'none';
    });

    // Показываем выбранную секцию
    const activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

// Закрываем модальные окна при клике вне их
window.onclick = function(event) {
    if (modal && event.target == modal) {
        modal.style.display = "none"; // Закрываем модальное окно
    }
    if (modalNews && event.target == modalNews) {
        modalNews.style.display = "none"; // Закрываем модальное окно новостей
    }
};

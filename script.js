document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из JSON-файла
    fetch('ru_data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tableBody = document.querySelector('tbody');

            // Проход по данным и создание строк таблицы
            data.games.forEach(game => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${game.title}</td>
                    <td>${game.engine}</td>
                    <td>${game.version}</td>
                    <td><a href="${game.game_info}" target="_blank">Об игре</a></td>
                    <td>${generateLinks(game.foreign_localization)}</td>
                    <td>${generateLinks(game.russian_localization)}</td>
                    <td>${generateUnionLink(game.union_link)}</td>
                    <td>${generateDownloadLinks(game.download_links)}</td>
                    <td>${game.note}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
});

// Функция для генерации ссылок
function generateLinks(links) {
    return links.map(link => `<a href="${link.link}" target="_blank">${link.translator}</a>`).join(', ');
}

// Функция для генерации ссылки на Union
function generateUnionLink(unionLink) {
    if (unionLink.link === " — ") {
        return " — ";
    } else {
        return `<a href="${unionLink.link}" target="_blank">${unionLink.type}</a>`;
    }
}

// Функция для генерации ссылок на скачивание
function generateDownloadLinks(links) {
    return links.map(link => `${link.type}: <a href="${link.link}" target="_blank">Скачать</a>`).join(', ');
}


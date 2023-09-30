document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из JSON-файла
    fetch('ru_data.json')
        .then(response => response.json())
        .then(data => {
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

// Функция для генерации ссылок на переводчиков
function generateLinks(links) {
    const translatorLinks = links.map(link => `<a href="${link.link}" target="_blank">${link.translator}</a>`).join(', ');

    // Используем <br> для переноса на новую строку
    return translatorLinks.replace(/,/g, ',<br>');
}

// Добавьте слушатели событий для кнопок сортировки
document.getElementById('sortTitle').addEventListener('click', () => {
    sortTable('Название');
});

document.getElementById('sortEngine').addEventListener('click', () => {
    sortTable('Движок');
});

// Функция для сортировки таблицы по выбранному столбцу
function sortTable(columnName) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Сортируем строки таблицы
    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelector(`td:nth-child(${getColumnIndex(columnName)})`);
        const cellB = rowB.querySelector(`td:nth-child(${getColumnIndex(columnName)})`);

        return cellA.textContent.localeCompare(cellB.textContent);
    });

    // Удаляем существующие строки из таблицы
    rows.forEach(row => tbody.removeChild(row));

    // Добавляем отсортированные строки обратно в таблицу
    rows.forEach(row => tbody.appendChild(row));
}

// Функция для получения индекса столбца по его имени
function getColumnIndex(columnName) {
    const headerRow = document.querySelector('thead tr');
    const cells = Array.from(headerRow.querySelectorAll('th'));

    return cells.findIndex(cell => cell.textContent === columnName);
}

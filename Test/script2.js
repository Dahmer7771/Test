// Создание константы таблицы GoodTable
const GOOD_TABLE = document.getElementById('GoodTable');

// MINUS_CELL - кнопка удаления колонки, 
// MINUS_ROW - кнопка удаления ряда
const MINUS_CELL = document.getElementsByClassName('BtnTop')[0];
const MINUS_ROW = document.getElementsByClassName('BtnLeft')[0];

// PLUS_CELL - кнопка добавления колонки, 
// PLUS_ROW - кнопка добавления ряда
const PLUS_CELL = document.getElementsByClassName('BtnRight')[0];
const PLUS_ROW = document.getElementsByClassName('BtnBottom')[0];

// Таймер скрытия кнопок удаления
let timerHideButtons;

// Переменная которая будет хранить номер 
// ряда в котором находится элемент который был нажат
let currentRowNum;

// Переменная которая будет хранить номер 
// колонки в которой находится элемент который был нажат
let currentCellNum;

// Создание таблицы 4*4 после загрузки страницы
window.onload = function () {
    ToHideMinusButtons();

    for (let i = 0; i < 4; i++) {
        let row = GOOD_TABLE.insertRow(i);
        for (let x = 0; x < 4; x++) {
            row.insertCell(x);
        }
    }
}

// Скрытие кнопок удаления
function ToHideMinusButtons() {
    MINUS_CELL.style.visibility = 'hidden';
    MINUS_ROW.style.visibility = 'hidden';
}

// появление кнопок удаления
function ToShowMinusButtons() {
    if (GOOD_TABLE.rows.length != 1) {
        MINUS_ROW.style.visibility = 'visible';
    }
    if (GOOD_TABLE.rows[0].cells.length != 1) {
        MINUS_CELL.style.visibility = 'visible';
    }
}

// Обработка события при нажатии на таблицу GoodTable
GOOD_TABLE.onmouseover = (event) => {
    clearTimeout(timerHideButtons);
    ToShowMinusButtons();

    let target = event.target;

    // Если элемент на который нажали не 'TD', то 
    // нужно прекратить выполнение функции
    if (target.tagName != 'TD') return;

    MINUS_ROW.style.top = target.offsetTop + 'px';
    MINUS_CELL.style.left = target.offsetLeft + 'px';

    // Сохранение индекса ряда на который навели мышкой
    currentRowNum = target.parentNode.rowIndex;

    // Сохранение индекса колонки на которую навели мышкой
    currentCellNum = target.cellIndex;
}

// Если мыша не наведена на таблицу то срабатывает 
// таймер скрытия кнопок удаления
GOOD_TABLE.onmouseout = () => {
    timerHideButtons = setTimeout(ToHideMinusButtons, 500);
}

// Обработка события при нажатии на кнопку добавления колонки
PLUS_CELL.onclick = () => {
    // Переменная для хранения массива рядов
    let rowsInGoodTable = GOOD_TABLE.rows;

    // Добавление ячейки в конец каждого ряда
    for (let i = 0; i < rowsInGoodTable.length; i++) {
        rowsInGoodTable[i].insertCell(-1);
    }
}

PLUS_ROW.onclick = () => {
    // Количество ячеек которое нужно добавить в ряд
    let rowsInGoodTableLength = GOOD_TABLE.rows.length;

    GOOD_TABLE.insertRow(-1);

    // Добавление ячеек в ряд
    for (let i = 0; i < GOOD_TABLE.rows[0].cells.length; i++) {
        GOOD_TABLE.rows[rowsInGoodTableLength].insertCell(i);
    }
}

// Удаление колонки
MINUS_CELL.onclick = () => {
    if (GOOD_TABLE.rows[0].cells.length != 1) {
        for (let i = 0; i < GOOD_TABLE.rows.length; i++) {
            GOOD_TABLE.rows[i].deleteCell(currentCellNum);
        }

        // Смещение кнопки удаления колонок до последней колонки
        MINUS_CELL.style.left = GOOD_TABLE.rows[0].cells[GOOD_TABLE.rows[0].cells.length - 1].offsetLeft + 'px';

        ToHideMinusButtons();
    }
}

// Удаление ряда
MINUS_ROW.onclick = () => {
    if (GOOD_TABLE.rows.length != 1) {
        GOOD_TABLE.deleteRow(currentRowNum);

        // Смещение кнопки удаления рядов до последнего ряда
        MINUS_ROW.style.top = GOOD_TABLE.rows[GOOD_TABLE.rows.length - 1].offsetTop + 'px';

        ToHideMinusButtons();
    }
}

// Отмена таймера при наведении на кнопку удаления колонок
MINUS_CELL.onmouseover = () => {
    clearTimeout(timerHideButtons);
}

// Отмена таймера при наведении на кнопку удаления рядов
MINUS_ROW.onmouseover = () => {
    clearTimeout(timerHideButtons);
}

// Установка таймера при уведении мыши с кнопки удаления колонок
MINUS_CELL.onmouseout = () => {
    timerHideButtons = setTimeout(ToHideMinusButtons, 500);
}

// Установка таймера при уведении мыши с кнопки удаления рядов
MINUS_ROW.onmouseout = () => {
    timerHideButtons = setTimeout(ToHideMinusButtons, 500);
}
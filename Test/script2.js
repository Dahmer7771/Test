// Создание константы таблицы GoodTable
const GOOD_TABLE = document.getElementById('GoodTable');

// WRAPPER - Контейнер для элементов GoodTable, PlusCell, PlusRow
const WRAPPER = document.getElementsByClassName('Wrapper')[0];

// MINUS_CELL - кнопка удаления колонки, 
// MINUS_ROW - кнопка удаления ряда
const MINUS_CELL = document.getElementsByClassName('ButtonMinus')[0];
const MINUS_ROW = document.getElementsByClassName('ButtonMinus')[1];

// PLUS_CELL - кнопка добавления колонки, 
// PLUS_ROW - кнопка добавления ряда
const PLUS_CELL = document.getElementsByClassName('ButtonPlus')[1];
const PLUS_ROW = document.getElementsByClassName('ButtonPlus')[0];

// Начальное значение параметров стиля кнопок 
// добавления колонок и рядов
var plusCellStyleLeft = 230;
var plusRowStyleTop = 0;

// Начальная ширина wrapper
var wrapperWidth = 286;

// Таймер скрытия кнопок удаления
var timerHideButtons;

// Переменная которая будет хранить номер 
// ряда в котором находится элемент который был нажат
var currentRowNum;

// Переменная которая будет хранить номер 
// колонки в которой находится элемент который был нажат
var currentCellNum;

// Создание таблицы 4*4 после загрузки страницы
window.onload = function () {
    ToHideMinusButtons();

    for (var i = 0; i < 4; i++) {
        var row = GOOD_TABLE.insertRow(i);
        for (var x = 0; x < 4; x++) {
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


// Функция перемещения кнопки удаления колонок
function ButtonMinusCellMotion(cell) {
    // Начальное значение свойства left кнопки для удаления колонок
    var buttonMinusCellStyleLeft = 59;

    // Проверка имеет ли колонка на которую навелись индекс 0
    if (cell != 0) {
        MINUS_CELL.style.left = ((cell) * 56 + buttonMinusCellStyleLeft) + 'px';
    }

    else {
        MINUS_CELL.style.left = buttonMinusCellStyleLeft + 'px';
    }
}

// Функция перемещения кнопки удаления рядов
function ButtonMinusRowMotion(row) {
    // Начальное значение свойства top кнопки для удаления рядов
    var buttonMinusRowStyleTop = 4;

    if (row != 0) {
        MINUS_ROW.style.top = (row * 56 + 4) + 'px';
    }

    else {
        MINUS_ROW.style.top = buttonMinusRowStyleTop + 'px';
    }
}

// Обработка события при нажатии на таблицу GoodTable
GOOD_TABLE.onmouseover = function (event) {
    clearTimeout(timerHideButtons);
    ToShowMinusButtons();
    // setTimeout(ToHideMinusButtons, 2000);

    var target = event.target;

    // Если элемент на который нажали не 'TD', то 
    // нужно прекратить выполнение функции
    if (target.tagName != 'TD') return;

    // Перебор элементов TR и нахождение в каком находится 
    // ячейка на которую кликнули
    for (var i = 0; i < GOOD_TABLE.rows.length; i++) {
        if (target.parentNode == GOOD_TABLE.rows[i]) {
            currentRowNum = i;

            // Перемещение кнопки удаления рядов
            ButtonMinusRowMotion(currentRowNum);
            break;
        }
    }

    // Перебор элементов TD внутри ряда по которому кликнули
    for (var i = 0; i < GOOD_TABLE.rows[0].cells.length; i++) {
        if (target == GOOD_TABLE.rows[currentRowNum].cells[i]) {
            currentCellNum = i;

            // Перемещение кнопки удаления колонок
            ButtonMinusCellMotion(currentCellNum);
            break;
        }
    }
}

// Если мыша не наведена на таблицу то срабатывает 
// таймер скрытия кнопок удаления
GOOD_TABLE.onmouseout = function () {
    timerHideButtons = setTimeout(ToHideMinusButtons, 500);
}

// Обработка события при нажатии на кнопку добавления колонки
PLUS_CELL.onclick = function () {
    // Переменная для хранения массива рядов
    var rowsInGoodTable = GOOD_TABLE.rows;

    // Добавление ячейки в конец каждого ряда
    for (var i = 0; i < rowsInGoodTable.length; i++) {
        rowsInGoodTable[i].insertCell(-1);
    }

    // Изменение положения кнопки добавления колонок
    plusCellStyleLeft += 56;
    PLUS_CELL.style.left = plusCellStyleLeft + 'px';

    // Изминение ширины wrapper
    wrapperWidth += 56;
    WRAPPER.style.width = wrapperWidth + 'px';


}

PLUS_ROW.onclick = function () {
    // Количество ячеек которое нужно добавить в ряд
    var rowsInGoodTableLength = GOOD_TABLE.rows.length;

    GOOD_TABLE.insertRow(-1);

    // Добавление ячеек в ряд
    for (var i = 0; i < GOOD_TABLE.rows[0].cells.length; i++) {
        GOOD_TABLE.rows[rowsInGoodTableLength].insertCell(i);
    }
}

// Удаление колонки
MINUS_CELL.onclick = function () {
    if (GOOD_TABLE.rows[0].cells.length != 1) {
        for (var i = 0; i < GOOD_TABLE.rows.length; i++) {
            GOOD_TABLE.rows[i].deleteCell(currentCellNum);
        }

        ButtonMinusCellMotion(GOOD_TABLE.rows[0].cells.length - 1);

        // Перемещение кнопки добавления ряда
        plusCellStyleLeft -= 56;
        PLUS_CELL.style.left = plusCellStyleLeft + 'px';

        ToHideMinusButtons();
    }
}

// Удаление ряда
MINUS_ROW.onclick = function () {
    if (GOOD_TABLE.rows.length != 1) {
        GOOD_TABLE.deleteRow(currentRowNum);
        ButtonMinusRowMotion(GOOD_TABLE.rows.length - 1);
        ToHideMinusButtons();
    }
}

// Отмена таймера при наведении на кнопку удаления колонок
MINUS_CELL.onmouseover = function () {
    clearTimeout(timerHideButtons);
}

// Отмена таймера при наведении на кнопку удаления рядов
MINUS_ROW.onmouseover = function () {
    clearTimeout(timerHideButtons);
}

// Установка таймера при уведении мыши с кнопки удаления колонок
MINUS_CELL.onmouseout = function () {
    timerHideButtons = setTimeout(ToHideMinusButtons, 500);
}

// Установка таймера при уведении мыши с кнопки удаления рядов
MINUS_ROW.onmouseout = function () {
    timerHideButtons = setTimeout(ToHideMinusButtons, 500);
}
var column;
var row;

//Initialization of document. Making table 4*4
window.onload = function(){
    for(var i = 0; i < 4; i++){
        GoodTable.appendChild(document.createElement('tr'));
    }

    var TR = document.getElementsByTagName('tr');

    for(var i = 0; i < 4; i++){
        for(var x = 0; x < 4; x++){
            TR[i].appendChild(document.createElement('td'));
        }
    }
}


GoodTable.onmouseover = function(){
    var TDAll = GoodTable.getElementsByTagName('td');
    var TR = GoodTable.getElementsByTagName('tr');
    var TDinTR = TR[0].getElementsByTagName('td').length;  
    var target = event.target;

    for(var i = 0; i < TDAll.length; i++){
        if(TR.length > 1){
            BlockLeft.style.visibility = 'visible';
        }
        if(TDinTR > 1){
            BlockTop.style.visibility = 'visible';
        }
        if(target == TDAll[i]){
            column = (((i + TDinTR) % TDinTR) + 1);
            row = Math.ceil((i + 1) / TDinTR);
            TopMotion(column);
            LeftMotion(row);
        }
    }
}

GoodTable.onmouseout = function(){
    BlockTop.style.visibility = 'hidden';
    BlockLeft.style.visibility = 'hidden';
}

BlockTop.onmouseover = function(){
    BlockTop.style.visibility = 'visible';
}

BlockLeft.onmouseover = function(){
    BlockLeft.style.visibility = 'visible';
}

function TopMotion(column){
    var margin = 4;
    if(column != 1){
        margin += ((column - 1) * 55) + (1 * column);
    }
    BlockTop.style.marginLeft = margin + 'px';
}

function LeftMotion(row){
    var margin = 4;
    if(row != 1){
        margin += ((row - 1) * 55) + (1 * row);
    }
    BlockLeft.style.marginTop = margin + 'px';
}

BlockRight.onclick = () => {
    var numOfRows = document.getElementsByTagName('tr');

    for(var i = 0; i < numOfRows.length; i++){
        numOfRows[i].appendChild(document.createElement('td'));
    }
}

BlockBottom.onclick = () => {
    GoodTable.appendChild(document.createElement('tr'));

    var numOfRows = document.getElementsByTagName('tr');
    var numOfColumns = numOfRows[0].children.length;

    for(var i = 0; i < numOfColumns; i++){
        numOfRows[numOfRows.length - 1].appendChild(document.createElement('td'));
    }   
}

BlockLeft.onclick = () => {
    var numOfRows = GoodTable.getElementsByTagName('tr');
    if(numOfRows.length == 1){
        BlockLeft.style.visibility = 'hidden';
    } else{
        var TDAll = GoodTable.getElementsByTagName('td');
        var TDinTR = numOfRows[0].getElementsByTagName('td').length; 
        GoodTable.removeChild(numOfRows[row - 1]);
        for(var i = 0; i < TDAll.length; i++){
            row = Math.ceil((i + 1) / TDinTR);
            LeftMotion(row);
        }
    }
}

BlockTop.onclick = () => {
    var numOfRows = GoodTable.getElementsByTagName('tr');

    for(var i = 0; i < numOfRows.length; i++){
        if(numOfRows[i].getElementsByTagName('td').length == 1){
            BlockTop.style.visibility = 'hidden';
        } else{
            var TDAll = GoodTable.getElementsByTagName('td');
            var TDinTR = numOfRows[row - 1].getElementsByTagName('td').length; 
            numOfRows[i].removeChild(numOfRows[i].getElementsByTagName('td')[column - 1]);
        }
    }
    for(var x = 0; x < TDAll.length; x++){
        column = (((x + TDinTR) % TDinTR) + 1);
        TopMotion(column);
    }
}
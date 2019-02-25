'use strict';
function getAllItems() {
   $.ajax({ 
        type: 'GET', 
        url: '/items', 
        dataType: 'json',
        success: function (data) { 
          buildHtmlTable(data,'#myTable')
        }
    });
}
function getAllItemsByType(sType) {
       $.ajax({ 
        type: 'GET', 
        url: '/items/' + "movies", 
        dataType: 'json',
        success: function (data) { 
           alert("dsdsd");
        }
    });
}
function getItem(sType, sId) {
       $.ajax({ 
        type: 'GET', 
        url: '/items/' + sType + '/' + sId, 
        dataType: 'json',
        success: function (data) { 
           alert("dsdsd");
        }
    });
}

function deleteItem(oEvent) {
    let theTD = oEvent.parentNode;
    var theParentTR = theTD.parentNode;
    let theType = theParentTR.cells[1].innerText;
    let theName = theParentTR.cells[2].innerText;
    
    $.ajax({
        url: '/delete/' + theType + "/" + theName,
        type: 'DELETE',
        success: function(result) {
           console.log("Entity Deleted from the DB !!")
        }
    })
    .done(function() {
        theParentTR.remove();
    })
    .fail(function() {
        console.log("Faild to delete from the DB !!")
    })
    .always(function() {
    });
}

function saveItem() {
    let oNewEntity = {name: document.getElementById('nameInput').value ,year: document.getElementById('yearInput').value, type:document.getElementById('typeInput').value, description:document.getElementById('descInput').value};
    $.post( "/add",oNewEntity, function() {
        console.log("Entity Saved in the DB !!")
    })
    .done(function() {
        var rowTr$ = $('<tr/>');

        rowTr$.append($('<td class="removeIcon"/>').html("<i class=\"far fa-window-close\" onclick=\"deleteItem(this)\"> </i>"));
        rowTr$.append($('<td/>').html(oNewEntity.type));
        rowTr$.append($('<td/>').html(oNewEntity.name));
        rowTr$.append($('<td/>').html(oNewEntity.year));
        rowTr$.append($('<td/>').html(oNewEntity.description));

        $('#myTable').append(rowTr$);
    })
    .fail(function() {
        console.log("Faild to Save in the DB !!")
    })
    .always(function() {
    });
}

function buildHtmlTable(myList, selector) {
    aBuildHeaders(myList, selector);
    let categoris = Object.keys(myList);
    let columns = ["name", "year","description"];    

   for (var i = 0; i < categoris.length; i++) {
        var aItemsInCat = myList[categoris[i]];
        for (var j = 0; j < aItemsInCat.length; j++) {
            var rowTr$ = $('<tr/>');
            rowTr$.append($('<td class="removeIcon"/>').html("<i class=\"far fa-window-close\" onclick=\"deleteItem(this)\"> </i>"));
            rowTr$.append($('<td/>').html(categoris[i]));
            for (var z = 0; z < columns.length; z++) {
                rowTr$.append($('<td/>').html(aItemsInCat[j][columns[z]]));
            }
            $(selector).append(rowTr$);
        }
        
    }
}

function aBuildHeaders(myList, selector) {
    let categoris = Object.keys(myList);
    let columns = ["name", "year","description"];     
    var headerTr$ = $('<tr/>');
    headerTr$.append($('<th class="removeIcon"/>').html(""));
    headerTr$.append($('<th/>').html("category"));
    for (var i = 0; i < columns.length; i++) {
        var rowHash = columns[i];
        headerTr$.append($('<th/>').html(rowHash));
    }
    $(selector).append(headerTr$);
}

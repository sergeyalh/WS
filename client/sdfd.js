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
        let newRow = '<tr>' + 
            + '<td class="removeIcon">' + "<i class=\"far fa-window-close\" onclick=\"deleteItem(this)\"> </i> </td>" +
            + '<td>' + oNewEntity.type + "</td>" +
            + '<td>' + oNewEntity.name + "</td>" +
            + '<td>' + oNewEntity.year + "</td>" +
            + '<td>' + oNewEntity.description + "</td>" +
        '</tr>'
       
        var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        tableRef.innerHTML += newRow;
    })
    .fail(function() {
        console.log("Faild to Save in the DB !!")
    })
    .always(function() {
    });
}

function buildHtmlTable(myList, selector) {
    let prefoCount = performance.now();

    let categoris = Object.keys(myList);
    let columns = ["name", "year","description"];    
    let sInnerHtml = "";

    for (var i = 0; i < categoris.length; i++) {
        var aItemsInCat = myList[categoris[i]];
        for (var j = 0; j < aItemsInCat.length; j++) {
            sInnerHtml = sInnerHtml + '<tr>' + '<td class=\"removeIcon\">' + '<i class=\"far fa-window-close\" onclick=\"deleteItem(this)\"' + 
            '</i>' + '</td>' + '<td>' + categoris[i] + '</td>';

            for (var z = 0; z < columns.length; z++) {
                sInnerHtml = sInnerHtml + '<td>' + aItemsInCat[j][columns[z]] + '</td>';
            }

            sInnerHtml = sInnerHtml + '<tr/>';
        }
    }

    var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "<tr><th class=\"removeIcon\"></th><th>category</th><th>name</th><th>year</th><th>description</th></tr>" + sInnerHtml;

    let prefoCountEnd = performance.now();
    console.log("Built the table in: " + (prefoCountEnd - prefoCount) + " milliseconds");
}

function renderRow(rowValues) {
    return `
    <tr>
        <td class="removeIcon"> <i class=\"far fa-window-close\" onclick=\"deleteItem(this)\"> </i> </td>
        ${rowValues.map(rowValues => `<td>${value}</td>`)}
    </tr>
    `;
}


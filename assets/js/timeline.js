var previousSelection = "0_0";
let baseTimelineHTML = document.getElementById("timeline_container").innerHTML;
let baseContentHTML = document.getElementById("main_content").innerHTML;

FetchData("theavengers");

function NewMovie() {
    FetchData(document.getElementById("movieSelect").value);
}

function FetchData(movie) {
    $.getJSON("assets/moviedata/" + movie + ".json", function(data) {
        CreateTimeline(data, "0");
    });
}

function CreateTimeline(data, offset) {
    var timelineContainer = document.getElementById("timeline_container");
    var contentContainer = document.getElementById("main_content");
    timelineContainer.innerHTML = baseTimelineHTML;
    contentContainer.innerHTML = baseContentHTML;
    document.getElementById("title").innerText = data.title;
    var position = 0;
    var movieLength = 0.0;
    for (i = 0; i < data.scenes.length; i++) {
        movieLength += parseFloat(data.scenes[i].length);
    }
    
    for (i = 0; i < data.scenes.length; i++) {
        var newDataLength = data.scenes[i].length / movieLength * 100;
        var newId = "'" + offset + "_" + i + "'";
        var newSection = '<rect id="rect' + offset + '_' + i + '"  height="90%" width="' + newDataLength + '%" y="5%" x="' + position + '%" fill="' + data.scenes[i].color + '" onclick="ChangeSelection(' + newId + ')"></rect>';
        timelineContainer.innerHTML = timelineContainer.innerHTML + newSection;
        
        var newContent = '<div id="' + offset + '_' + i + '" class="event"><h3>' + data.scenes[i].title + '</h3><h4>' + data.scenes[i].length + ' minutes </h4><p>' + data.scenes[i].desc + '</p></div>';
        contentContainer.innerHTML = contentContainer.innerHTML + newContent;
        //document.getElementById(offset + "_" + i).childNodes[3].innerHTML = data[i].length + " minutes";
        position += newDataLength;
    }
    ChangeSelection(previousSelection); //Set the first event as the active event
}

function ChangeSelection(i) {
    document.getElementById('rect' + previousSelection).classList.remove('selected');
    document.getElementById(previousSelection).style.display = "none";
    document.getElementById('rect' + i).classList.add('selected');
    document.getElementById(i).style.display = "block";
    previousSelection = i;
}
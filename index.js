const URL = "http://192.168.0.216:1234";

function updateTaskBook(jsonData) {
    let data = JSON.parse(jsonData);

    let columnString = "";

    for(let s=0; s<data.sections.length; s++) {
        let section = data.sections[s];

        columnString += `
        <div class="column-section">
            <div class="column-section-header">
                <b>${section.name}</b>
                <a href="javascript:replaceScript('${URL}/update?callback=updateTaskBook&action=shiftSection&user=0&task_book=0&section=${s}&direction=up')" class="material-icons">arrow_drop_up</a>
                <a href="javascript:replaceScript('${URL}/update?callback=updateTaskBook&action=shiftSection&user=0&task_book=0&section=${s}&direction=down')" class="material-icons">arrow_drop_down</a>
                <a class="material-icons">add_circle</a>
            </div>
        `;

        for(let t=0; t<section.tasks.length; t++) {
            let task = section.tasks[t];

            columnString += `
            <div class="task-card">
                <div class="task-text"> <div><div class="task-title"><b>${task.name}</b></div><br><div class="task-due-date">${task.notes}</div></div> </div>      <div class="task-button completed-button"><span class="material-icons">task_alt</span></div>    <div class="task-button submitted-button"><span class="material-icons">publish</span></div>
            </div>
            `;

        }
        columnString += "</div>";
    }

    columnString += `
        <div class="new-section">
            <div class="new-section-line"><div></div></div>    <div class="new-section-symbol"><span class="material-icons">add_circle_outline</span></div>     <div class="new-section-line"><div></div></div>
        </div>
        `;
    
    document.getElementsByClassName('column-header')[0].childNodes[1].innerText = data.title;
    document.getElementsByClassName('column-contents')[0].innerHTML = columnString;
}

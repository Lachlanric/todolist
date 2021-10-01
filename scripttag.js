function removeScript(scriptname)
{
    let oldscript = document.getElementById(scriptname);
    if (oldscript) {
        oldscript.remove()
    }
}

function insertScript(src, id)
{
    let script = document.createElement('script');
    script.src = src;
    script.id = id;
    document.body.appendChild(script);
}

function replaceScript(src, id)
{
    removeScript(id);
    insertScript(src, id);
}
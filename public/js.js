function go(){
    let inp = document.getElementById('text').value;
    if(inp != ''){
        let elem = document.createElement('p'),
        plus = 'new ',
        content=document.createTextNode(plus + inp),
        wrap = document.getElementById('todo-list');
        elem.appendChild(content);
        wrap.parentNode.insertBefore(elem, wrap);
    fetch('/newText', {
        method:'POST',
        body: JSON.stringify({
            'text':inp
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    }
    document.getElementById('text').value='';
}

function del(){
    if(event.target.className == 'del-one'){
        let idCode = event.target.id;
        fetch('/del-some-elemrnt',{
            method:'POST',
            body: JSON.stringify({
                'text':idCode
                }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        document.getElementById(event.target.name).parentNode.removeChild(document.getElementById(event.target.name));
}
}

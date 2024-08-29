const loadPage = (page,idTarget) =>{
    fetch(page)
    .then((res) => {
        if (res.ok)
            return res.text()
    })
    .then((res) => {
        document.getElementById(idTarget).innerHTML = res
    });
}


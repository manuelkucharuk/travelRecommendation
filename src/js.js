const loadPage = (page,idTarget) =>{
    let box = document.getElementsByClassName("box")
    box[0].classList.remove("align-items-start")
    box[0].classList.add("align-items-center")
    return fetch(page)
        .then((res) => {
           if (res.ok) return res.text()
         })
        .then((res) => {
            document.getElementById(idTarget).innerHTML = res
        })
        .catch((e)=>console.log(e));
}

const search = (e) =>{
    e.preventDefault()
    const keyword = document.getElementById("searchKeyword").value.toLowerCase()
    loadPage("../pages/searchResults.html","content")
    .then(res=>{document.getElementById("place").innerHTML = ""})
    .then(res=>{searchRecommendation(keyword)})
    .catch(e=>{console.log(e)})
}

const searchRecommendation = async (key)=>{
    const data = await fetchData()
    if(!data) alert("No data found")
    else {
        if (key === "temple" || key === "temples") {
            data.temples.forEach((temple)=>{
                showRecommendation(temple)
            })
        }
        else if (key === "beach" || key === "beaches") {
            data.beaches.forEach((beach)=>{
                showRecommendation(beach)
            })
        }
        else if (findCountry(data, key).country) {
            let country = findCountry(data,key).country
            country.cities.forEach((city) => {
                showRecommendation(city)
            })
        }
        else showRecommendation(false)
    }

}

const fetchData = ()=>{
    return fetch("../api/data.json")
        .then(res=>{if (res.ok) return res})
        .then(res=> res.json())
        .then(res=>res)
        .catch(res=>console.log("Error",res))
}

const findCountry = (data,key)=>{
    let res = {
        country: undefined,
    }
    data.countries.forEach((country)=>{
        if(country.name.toLowerCase() === key){
            res.country = country
        }
    })
    return res
}

const showRecommendation = (place)=>{
    const errorMsg = "<h2>Place not found!</h2>"
    const placeElement = document.getElementById("place")
    if(!place) placeElement.innerHTML = errorMsg
    else{
        let box = document.getElementsByClassName("box")
        box[0].classList.remove("align-items-center")
        box[0].classList.add("align-items-start")
        const placeHtml = createHtml(place)
        placeElement.innerHTML += placeHtml
    }
}

const createHtml = (place)=>{
    let htmlStr = `<div class="card col-6" style="background-color: rgba(255, 255, 255, 0.5)">`
    htmlStr += `<img src=${place.imageUrl} class="card-img-top" style="height: 450px; object-fit: contain" alt="...">`
    htmlStr += `<div class="card-body">`
    htmlStr += `<h5 class="card-title">${place.name}</h5>`
    htmlStr += `<p class="card-text">${place.description}</p>`
    htmlStr += `<a href="#" class="btn btn-primary">Go!</a>`
    htmlStr += `</div></div>`
    return htmlStr
}



const clear = (e) =>{
    e.preventDefault()
    document.getElementById("searchKeyword").value = ""
}

document.getElementById("submitBtn").addEventListener("click",search)
document.getElementById("clearBtn").addEventListener("click",clear)
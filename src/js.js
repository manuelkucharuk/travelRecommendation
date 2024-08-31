const loadPage = (page,idTarget) =>{
    return fetch(page)
            .then((res) => {
                if (res.ok)
                    return res.text()
            })
            .then((res) => {
                document.getElementById(idTarget).innerHTML = res
            });
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
    loadPage("../pages/searchResults.html","content")
        .then(res=>{
            const placeElement = document.getElementById("place")
            if(!place) placeElement.innerHTML = errorMsg
            else{
                const placeHtml = createHtml(place)
                placeElement.app = placeHtml
                console.log(placeHtml)
            }

        })
}

const createHtml = (place)=>{
    return `<h1>${place.name}</h1>`
}



const clear = (e) =>{
    e.preventDefault()
    document.getElementById("searchKeyword").value = ""
}

document.getElementById("submitBtn").addEventListener("click",search)
document.getElementById("clearBtn").addEventListener("click",clear)
//import loadPage from "./loadPage"
const search = (e) =>{
    e.preventDefault()
    const keyword = document.getElementById("searchKeyword").value.toLowerCase()
    searchRecommendation(keyword)
}

const clear = (e) =>{
    e.preventDefault()
    document.getElementById("searchKeyword").value = ""
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

const showRecommendation = (place)=>{
    if(!place){

    }
    console.log(place)
}



document.getElementById("submitBtn").addEventListener("click",search)
document.getElementById("clearBtn").addEventListener("click",clear)
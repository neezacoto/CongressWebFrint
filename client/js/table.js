




document.addEventListener("DOMContentLoaded",(event) =>{

    let button = document.getElementById("congress_search");
    button.addEventListener("click",inputEvent);

    let searchField = document.getElementById("congress_field");
    searchField.addEventListener("keyup",(key) =>
    {
        if(key.key === "Enter")
            inputEvent();
    })

    let option = document.getElementById("fetch_type");
    option.addEventListener("change",(selection)=>{
        (selection.value === "Post")? searchField.disabled = true: searchField.disabled = false;
    })

})

function inputEvent()
{
    let headers = document.getElementById("headers");
    let searchResults = document.getElementById("search_result");

    searchResults.innerHTML = "";
    headers.innerHTML ="";

    let inputField = document.getElementById("congress_field");
    let inputVal = inputField.value;

    let searchMethods = document.getElementById("fetch_type");
    let searchType = searchMethods.value;

    let promiseResult = fetch("http://localhost/Politician",{
        method: searchType
    })

    promiseResult
        .then( (response)=> {

        if (response.status === 200)
            return response.json();

        return {};
    })
        .then((resData)=> {

            let tr = document.createElement("tr");
            for(let header of ["congress","chamber","bioguide","firstname", "middlename","lastname","suffix",
                "birthday","state","party","incumbent","termstart","age"])
            {
                let th = document.createElement("th");
                th.innerText = header;
                tr.appendChild(th);
            }
            headers.appendChild(tr);

            for (let congress_person of resData)
            {
                let tr = document.createElement("tr");


                for (let fields of ["congress","chamber","bioguide","firstname", "middlename","lastname","suffix",
                    "birthday","state","party","incumbent","termstart","age"])
                {
                    let td = document.createElement("td");
                    td.innerText = congress_person[fields];
                    tr.appendChild(td);
                }
                searchResults.appendChild(tr);
            }
        })






}



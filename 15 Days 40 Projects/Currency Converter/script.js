const apiKey = "cur_live_SaBDOWfMeDGgbepQiEDBcaCLiSHFaYrgVCbewmAG";
const btn = document.querySelector(".btn");
const tableBody = document.querySelector("tbody");
const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=`;
let myStr = "";

const populate = async (value, currency) => {
    let response = await fetch(url + currency);
    let jData = await response.json();
    document.querySelector(".output").style.display = "block";

    for (let key of Object.keys(jData["data"])) {
        myStr += `<tr>
                    <td>${key}</td>
                    <td>${jData["data"][key]["code"]}</td>
                    <td>${Math.round(jData["data"][key]["value"] * value)}</td>
                 </tr>
        `
    }

    tableBody.innerHTML = myStr;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = (document.querySelector("#quantity").value);
    const currency = (document.querySelector("#Currency").value);
    populate(value, currency);
})


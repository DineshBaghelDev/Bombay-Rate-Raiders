// Fetch Exchange Rates API
const API_URL = '';

// Adding Event Listener to submit button
submit_btn = document.getElementsByClassName("btn")[0]
submit_btn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Getting Form Values
    starting_currency = document.getElementById("starting_currency").value.toUpperCase()
    final_currency = document.getElementById("final_currency").value.toUpperCase()
    amount = parseFloat(document.getElementById("amount").value)

    // Checking If Data is valid or not
    if (starting_currency && final_currency && amount) {

        // Fetching data form api
        try {
            response = await fetch(API_URL + starting_currency)
            data = await response.json()
            converted_amount = (data.conversion_rates[final_currency] * amount).toFixed(2)

            converted_amount_div = document.getElementById("converted_amount")
            converted_amount_div.innerHTML = `<p style="color:yellow;">${amount} ${starting_currency} = ${converted_amount} ${final_currency}</p>`

            find_best_route(data.conversion_rates, starting_currency, final_currency, amount)

            // Error handling
        } catch (error) {
            console.log(error)
            alert('Error fetching exchange rates.')
        }
    } else {
        alert("Please Enter a Valid Data")
    }

})

async function find_best_route(conversion_rates, starting_currency, final_currency, amount) {
    const best_paths = document.getElementById('best_paths')

    const currencies = Object.keys(conversion_rates)
    const paths = []
    const promises = []

    for (const intermediate of currencies) {
        if (intermediate === starting_currency || intermediate === final_currency) continue

        const intermediateRate = conversion_rates[intermediate]

        // Create a promise for fetching rates for the intermediate currency
        const fetchPromise = fetch(API_URL + intermediate)
            .then(response => response.json())
            .then(intermediateData => {
                const finalRate = intermediateData.conversion_rates[final_currency]
                const profit = (amount * intermediateRate * finalRate).toFixed(2)

                paths.push({
                    path: `${starting_currency} → ${intermediate} → ${final_currency}`,
                    amount: profit
                })
            })
            .catch(error => {
                console.error(`Error fetching rates for ${intermediate}:`, error);
            })

        promises.push(fetchPromise)
    }

    // Wait for all fetch promises to resolve
    await Promise.all(promises)

    // Sort paths by highest profit and display top 3
    paths.sort((a, b) => b.amount - a.amount)

    best_paths.innerHTML = '<h2>Best Paths</h2>'
    paths.slice(0, 3).forEach(path => {
        const listItem = document.createElement('li')
        listItem.textContent = `${path.path}: ${path.amount} ${final_currency}`
        best_paths.appendChild(listItem)
    })
}

const base_url = 'https://api.apilayer.com/fixer';
const api_key = 'uLUgjPPhzGAjPUe8EDmurtvpEEkTlEqi';

function loadCurrencies() {
    fetch(`${base_url}/symbols`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            apikey: api_key
        }
    })
        .then(result => result.json())
        .then(data => {
            const currencies = data.symbols;
            const fromSelect = document.getElementById('from');
            const toSelect = document.getElementById('to');

            for (const currency in currencies) {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currencies[currency];
                fromSelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currencies[currency];
                toSelect.appendChild(optionTo);
            }
        })
        .catch(e => console.log('Error receiving data: ', error));
}

loadCurrencies();

convert.onclick = () => {
    const fromCurrency = from.value.trim();
    const toCurrency = to.value.trim();
    const amount = sum.value.trim();

    fetch(`${base_url}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, {
        headers: {
            apikey: api_key
        }
    })
        .then(result => result.json())
        .then(data => data.result)
        .then(res => {
            const h1 = document.createElement('h1');
            h1.append(`Result: ${res.toFixed(2)}`);
            if (result.firstElementChild) {
                result.replaceChild(h1, result.firstElementChild);
            } else {
                result.append(h1);
            }
        })
        .catch(e => {
            const h1 = document.createElement('h1');
            h1.append(`Error`);
            if (result.firstElementChild) {
                result.replaceChild(h1, result.firstElementChild);
            } else {
                result.append(h1);
            }
        });
};


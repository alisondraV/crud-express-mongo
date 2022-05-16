const update = document.querySelector('#update-button')

// TODO: make this dynamic
const data = {
    name: 'Darth Vadar',
    quote: 'I find your lack of faith disturbing.'
}

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(_ => {
        window.location.reload();
    })
})
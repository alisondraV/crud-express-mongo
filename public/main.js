const updateButton = document.querySelector('#update-button')
const deleteButtons = document.querySelectorAll('.delete-button')

// TODO: make this dynamic
const data = {
    name: 'Darth Vadar',
    quote: 'I find your lack of faith disturbing.'
}

updateButton.addEventListener('click', _ => {
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

deleteButtons.forEach(button => button.addEventListener('click', ({target}) => {
    const quoteId = target.closest('quote-model').dataset.id

    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId })
    })
    .then(() => {
        window.location.reload()
    })
}))


const deleteButtons = document.querySelectorAll('.delete-button')

deleteButtons.forEach(button => button.addEventListener('click', async _ => {
    const quoteId = button.closest('quote-model').dataset.id

    try {
        await fetch('/quotes', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quoteId })
        })
        window.location.reload()
    } catch (e) {
        console.log('Error occurred: ', e.message)
    }
}))

function showUpdateForm(button) {
    const updateForm = button.parentElement.querySelector('.update-form')
    updateForm.style.display = 'block'
}

async function updateQuote(button, id) {
    const name = button.parentElement.querySelector('[name=name]')
    const quote = button.parentElement.querySelector('[name=quote]')

    try {
        await fetch(`/quotes/${id}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name.value, quote: quote.value}),
        })
        window.location.reload()
    } catch (e) {
        console.log('Error occurred: ', e.message)
    }
}
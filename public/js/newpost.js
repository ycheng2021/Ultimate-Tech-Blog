// submit post function
const submitFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-content').value.trim();

    if (title && contents) {
        const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace('/');
        } else {
        alert('Failed to submit new post.');
        }
    }
};

// addEventListeners for sumbit buttons
document
.querySelector('.newpost')
.addEventListener('submit', submitFormHandler);

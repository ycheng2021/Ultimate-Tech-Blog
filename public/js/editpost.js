// update the post
const updateFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#update-title').value.trim();
    const contents = document.querySelector('#update-content').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (contents) {
        const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace(`/post/${id}`);
        } else {
        alert('Failed to edit post.');
        }
    }
};

// addEventListeners for updating
document
.querySelector('.updatepost')
.addEventListener('submit', updateFormHandler);

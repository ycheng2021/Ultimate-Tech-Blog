const commentButton = document.querySelector('.comment-btn');
const commentBox = document.querySelector('.comment-box');

commentButton.addEventListener('click', function() {
    commentButton.style.display = "none"
    commentBox.style.display= "block"
})

// submit comment function
const submitFormHandler = async (event) => {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const post_id = id;
    const contents = document.querySelector('#comment-content').value.trim();

    if (contents) {
        const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id, contents }),
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
.querySelector('.newcomment')
.addEventListener('submit', submitFormHandler);


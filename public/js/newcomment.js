const commentButton = document.querySelector('.addComment-btn');
const commentBox = document.querySelector('.comment-box')

commentButton.addEventListener('click', function() {
    commentButton.style.display = "none";
    commentBox.style.display = "block";
    console.log("this button is working")
})

// submit comment function
const submitFormHandler = async () => {
    const contents = document.querySelector('#comment-content').value.trim();
    const post_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    if (contents) {
        const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ contents, post_id}),
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


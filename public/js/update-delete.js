const updateButton = document.querySelector('.update-btn');
const updateBox = document.querySelector('.update-box');
const submitUpdateButton = document.querySelector('.postupdate-btn');
const deleteButton = document.querySelector('.delete-btn');

updateButton.addEventListener('click', function() {
    deleteButton.style.display= "none"
    updateButton.style.display = "none"
    updateBox.style.display= "block"
})

deleteButton.addEventListener('click', function() {
    
})

// update the post
const updateFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#update-title').value.trim();
    const contents = document.querySelector('#update-content').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title && contents) {
        const response = await fetch(`api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace(`/${id}`);
        } else {
        alert('Failed to edit post.');
        }
    }
};


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete project');
      }
    }
  };

// addEventlisteners for deleting
deleteButton.addEventListener('click', delButtonHandler);

// addEventListeners for updating
document
    .querySelector('.updatepost')
    .addEventListener('submit', updateFormHandler);


const postTitles = document.querySelector('.container')

postTitles.addEventListener('click', function(event) {
    console.log("it works")
    console.log(event.target)
    if (event.target.matches("div")) {
        let postId = event.target.getAttribute("data-id")
        document.location.replace('/post/' + postId)
    }
})
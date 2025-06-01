const textarea = document.getElementById('content');
const form = document.getElementById("addPostForm")
const body = document.querySelector("body")
const add = document.getElementById("add")
const postsContainer = document.getElementById("posts-container");
const drop = document.querySelector(".backdrop")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
     const content = textarea.value;

    const response = await fetch("/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `content=${encodeURIComponent(content)}`
    });

    const newPost = await response.json();

    const article = document.createElement("article");
    article.className = "post";
    article.id = "post" + newPost.postID
    article.innerHTML = `
        <div id="head">
            <div id="user"> 
                <img src="/images/user.png" alt="">
                <h4 id="username">${newPost.username}</h4>
            </div>
            <div id="buttons">
                <button class="edit" id="edit${newPost.postID}"><img src="/images/lapis.png" alt=""></button>
                <button class="delete" id="delete${newPost.postID}"><img src="/images/lixeira.png" alt=""></button>
            </div>
        </div>
        <p>${newPost.content}</p>
    `;

    const deleteBtn = article.querySelector("#delete" + newPost.postID)
    deleteBtn.addEventListener("click", () => {
        article.remove()
         fetch(`/delete-post/${newPost.postID}`, {
            method: "DELETE"
        })
    })


    postsContainer.appendChild(article);
    textarea.value = "";
    form.style.display = "none"
    drop.style.display = "none"

})


add.addEventListener("click", () => {


    if(form.style.display == "block"){
        form.style.display = "none"
        drop.style.display = "none"
        
    } else {
        form.style.display = "block"
        drop.style.display = "block"
    }
})


if (textarea) {
  textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  }); 
}
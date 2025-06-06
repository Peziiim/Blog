const textarea = document.getElementById('content');
const form = document.getElementById("addPostForm")
const edit = document.getElementById("editPostForm")
const body = document.querySelector("body")
const add = document.getElementById("add")
const postsContainer = document.getElementById("posts-container");
const drop = document.querySelector(".backdrop")

let tempText;
let editingPostID

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
    const formattedContent = newPost.content.replace(/\n/g, "<br>");
    article.innerHTML = `
        <div id="head">
            <div id="user"> 
                <img src="/images/user.png" alt="">
                <h4 id="username">${newPost.username} <span>°${newPost.day} de ${newPost.month}</span></h4>
            </div>
            <div id="buttons">
                <button class="edit" id="edit${newPost.postID}"><img src="/images/lapis.png" alt=""></button>
                <button class="delete" id="delete${newPost.postID}"><img src="/images/lixeira.png" alt=""></button>
            </div>
        </div>
        <p id="content${newPost.postID}">${formattedContent}</p>
        <div class="post-footer">

        </div>
    `;

    const deleteBtn = article.querySelector("#delete" + newPost.postID)
    const editBtn = article.querySelector("#edit" + newPost.postID)
    
    editBtn.addEventListener("click", () => {
        const content = article.querySelector("p").textContent;

        document.querySelector("#editPostForm textarea").value = content;
        editingPostID = newPost.postID;
        edit.style.display = "block"
        drop.style.display = "block"
   
    
    })

    deleteBtn.addEventListener("click", () => {
        article.remove()
         fetch(`/delete-post/${newPost.postID}`, {
            method: "DELETE"
        })
    })


    tempText = textarea.value


    postsContainer.appendChild(article);
    textarea.value = "";
    form.style.display = "none"
    edit.style.display = "none"
    drop.style.display = "none"

})


edit.addEventListener("submit", async (e) => {
     e.preventDefault()

    const content = document.querySelector("#editPostForm textarea").value;

    const response = await fetch(`/edit-post/${editingPostID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `content=${encodeURIComponent(content)}`
    });

    const newPost = await response.json();


    const articleContent = document.querySelector(`#content${newPost.postID}`);
    if (articleContent) {
        articleContent.textContent = newPost.content;
    }


    edit.style.display = "none"
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
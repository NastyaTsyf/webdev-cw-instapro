import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getAllPosts } from "../api.js";

export function renderPostsPageComponent({ appEl, token, setPost }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const fetchPost = () => {
    return getAllPosts({ token }).then((responseData) => {
       const allPosts = responseData.posts.map((posts) => {
         return {
           name: posts.user.name,
           avatar: posts.user.imageUrl,
           userId: posts.user.id,
           time: posts.createdAt,
           text: posts.description,
           photo: posts.imageUrl,
           postId: posts.id,
           isLiked: posts.isLiked,
           likes: posts.likes
         }
       })
      setPost(allPosts);
      //console.log(posts); 
      renderPostFeed(posts);
     })
 };

 fetchPost();

 const renderPostFeed = (posts) =>{
    const listElHtml = posts.map((post) =>{return `
    <li class="post">
      <div class="post-header" data-user-id="${post.userId}">
          <img src="${post.avatar}" class="post-header__user-image">
          <p class="post-header__user-name">${post.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.photo}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.postId}" class="like-button">
          <img src="./assets/images/like-active.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.name}</span>
        ${post.text}
      </p>
      <p class="post-date">
      ${post.time}
      </p>
    </li>`}).join('');
  //console.log(listElHtml);

  const postFeedHtml = `
  <div class="page-container">
  <div class="header-container"></div>
  <ul class="posts">
  ${listElHtml}
  </ul>
  </div>`;
  //console.log(postFeedHtml);

  appEl.innerHTML = postFeedHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
 }



  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */



}

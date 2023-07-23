import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { dislike, getAllPosts, getUserPosts, like } from "../api.js";

export function renderPostsPageComponent({ appEl, token, setPost }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const initLikeButton = (posts, token) => {
    const likeButtons = document.querySelectorAll("like-button")

    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", () => {
        const index = likeButton.dataset.index;
        const postId = likeButton.dataset.postId;
        //const isLiked = likeButton.dataset.isLiked;

        if (posts[index].isLiked === false) {
          like({postId, token})
        } else {
          dislike({postId, token})
        }
        renderPostFeed(posts);
    })
  }
  }     
  
  

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
    const listElHtml = posts.map((post, index) =>{return `
    <li class="post">
      <div class="post-header" data-user-id="${post.userId}">
          <img src="${post.avatar}" class="post-header__user-image">
          <p class="post-header__user-name">${post.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.photo}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.postId}" data-index="${index}" class="like-button">
        ${post.isLiked ? '<img src="./assets/images/like-active.svg">' : '<img src="./assets/images/like-not-active.svg">'}
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length === 0 ? 0 : post.likes.length === 1 ? post.likes[0].name : post.likes[(post.likes.length - 1)].name + 'и еще' + (post.likes.length - 1)}</strong>
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
      const userId = userEl.dataset.userId;
      console.log({userId});
      //let userPosts = posts.filter(item => item.userId === userEl.dataset.userId);
      getUserPosts({ token, userId }).then((responseData) => {
        const allUserPosts = responseData.posts.map((posts) => {
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
       setPost(allUserPosts);
       console.log(allUserPosts); 
       renderPostFeed(allUserPosts);
      })
    });


  }
 }
 initLikeButton(posts, token);




  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */



}

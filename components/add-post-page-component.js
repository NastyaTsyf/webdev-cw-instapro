import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {

    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
            <h3 class="form-title">
              Добавить пост
              </h3>
            <div class="form-inputs"> 
                <div class="upload-image-container"></div>
                <p class="">Опишите фотографию</p>
                <input type="text" id="postDescription-input" class="input"  style="height: 150px" placeholder="" />
                
                <div class="form-error"></div>
                
                <button class="button" id="add-button">Добавить</button>
            </div>
        </div>
    </div>    
`;

    appEl.innerHTML = appHtml;

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }


    document.getElementById("add-button").addEventListener("click", () => {
      const postDescription = document.getElementById("postDescription-input").value;
      onAddPostClick({
        description: postDescription
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        imageUrl: imageUrl,
      });
    });
  };

  render();
}

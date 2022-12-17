import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", onClickImage);

function onClickImage(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  const imgSRC = e.target.getAttribute("data-source");

  const instance = basicLightbox.create(
    `
    <div class="modal">
       <img src="${imgSRC}" width="800" height="600">
    </div>
`
  );

  instance.show(() => window.addEventListener("keydown", onListner));

  function onListner(evt) {
    console.log(evt.code);
    if (evt.code === "Escape") {
      instance.close();
      removeKeyboardListener();
    }
  }

  function removeKeyboardListener() {
    window.removeEventListener("keydown", onListner);
  }
}

const createMurcupImages = galleryItems
  .map(({ preview, original, description }) => {
    const murcup = `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    return murcup;
  })
  .join("");
gallery.insertAdjacentHTML("beforeend", createMurcupImages);

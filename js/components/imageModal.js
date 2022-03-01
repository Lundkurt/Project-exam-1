const modal = document.querySelector(".modal");
const imageContainer = document.querySelector(".modal-image");
const backdrop = document.querySelector(".backdrop");

    function getDetailsImgAttr() {
        const detailsImage = document.querySelector(".details-image");
        return detailsImage;
    }

    function openModal() {
        const imageDetails = getDetailsImgAttr();
        imageContainer.src = imageDetails.src;
        backdrop.style.display = "block";
        modal.style.display = "block";
    }

    backdrop.addEventListener("click", closeModal)

    function closeModal() {
        modal.style.display = "none";
        backdrop.style.display = "none";
    }
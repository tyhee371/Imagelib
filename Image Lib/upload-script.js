document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const closeModal = document.querySelector('.close');
    const imageInput = document.getElementById('imageInput');
    const imageCaptionInput = document.getElementById('imageCaption');
    const uploadSubmit = document.getElementById('uploadSubmit');
    const imageGrid = document.getElementById('imageGrid');
    const deleteSectionButton = document.getElementById('deleteSectionButton');

    let selectedImage = null;
    let selectedCaption = null;
    const likesCounter = {};

    function handleLikeClick(likeButton, caption) {
        likeButton.addEventListener('click', function() {
            const isLiked = likeButton.classList.toggle('active');
            likesCounter[caption] = isLiked ? (likesCounter[caption] || 0) + 1 : (likesCounter[caption] || 0) - 1;
            likeButton.innerText = likesCounter[caption] + ' Likes';
        });
    }

    uploadButton.addEventListener('click', function() {
        uploadModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        uploadModal.style.display = 'none';
        selectedImage = null;
        selectedCaption = null;
        imageInput.value = '';
        imageCaptionInput.value = '';
    });

    imageInput.addEventListener('change', function() {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            selectedImage = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    imageCaptionInput.addEventListener('input', function() {
        selectedCaption = imageCaptionInput.value;
    });

    uploadSubmit.addEventListener('click', function() {
        if (selectedImage) {
            const confirmUpload = confirm("Do you want to upload this image with the caption: " + selectedCaption + "?");
            if (confirmUpload) {
                const cardContainer = document.createElement('div');
                cardContainer.classList.add('image-card');

                const shadowBox = document.createElement('div');
                shadowBox.classList.add('shadow-box');

                const img = document.createElement('img');
                img.src = selectedImage;
                img.alt = selectedCaption;
                img.classList.add('image');

                const caption = document.createElement('div');
                caption.classList.add('caption');
                caption.innerText = selectedCaption;

                const likeButton = document.createElement('button');
                likeButton.classList.add('like-button');
                likeButton.innerText = 'Like';

                const commentsCount = document.createElement('div');
                commentsCount.classList.add('comments-count');
                commentsCount.innerHTML = '<span class="comments-icon">&#128172;</span> <span class="comments-number">0</span> Comments';

                const viewsCount = document.createElement('div');
                viewsCount.classList.add('views-count');
                viewsCount.innerHTML = '<span class="views-icon">&#128065;</span> <span class="views-number">0</span> Views';

                const uploadDate = document.createElement('div');
                uploadDate.classList.add('upload-date');
                const today = new Date();
                const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                uploadDate.innerText = 'Uploaded on ' + dateString;

                const deleteCheckbox = document.createElement('input');
                deleteCheckbox.type = 'checkbox';
                deleteCheckbox.classList.add('delete-checkbox');

                handleLikeClick(likeButton, selectedCaption);

                shadowBox.appendChild(img);
                shadowBox.appendChild(caption);
                shadowBox.appendChild(likeButton);
                shadowBox.appendChild(commentsCount);
                shadowBox.appendChild(viewsCount);
                shadowBox.appendChild(uploadDate);
                shadowBox.appendChild(deleteCheckbox);

                cardContainer.appendChild(shadowBox);

                imageGrid.appendChild(cardContainer);

                selectedImage = null;
                selectedCaption = null;
                imageInput.value = '';
                imageCaptionInput.value = '';
                uploadModal.style.display = 'none';
            }
        } else {
            alert("Please select an image first.");
        }
    });

    deleteSectionButton.addEventListener('click', function() {
        const imageCards = document.querySelectorAll('.image-card');

        if (imageCards.length > 0) {
            const confirmDelete = confirm("Are you sure you want to delete these images?");
            
            if (confirmDelete) {
                imageCards.forEach(card => {
                    const deleteCheckbox = card.querySelector('.delete-checkbox');

                    if (deleteCheckbox.checked) {
                        card.remove();
                    }
                });
            }
        } else {
            alert("No images found to delete.");
        }
    });
});

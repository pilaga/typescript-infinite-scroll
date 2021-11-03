const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos_array = [];

//unsplash API
//count - The number of photos to return. (Default: 1; max: 30)
//topics - Public topic ID(‘s) to filter selection. If multiple, comma-separated
const count = 10;
const apiKey = 'iO7SEah7t2HgBtjQePvtHrfmVM9lMOC8SiOmem1Cx8k';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//setAttribute helper function
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links and photos
function displayPhotos() {
    
    photos_array.forEach((photo) => {
        //create <a> to link to source (unsplash)
        const link = document.createElement('a');
        setAttributes(link, {
            href: photo.links.html,
            target: '_blank'
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        })
        //put <img> inside <a>, then both in imageContainer
        link.appendChild(img);
        imageContainer.appendChild(link);
    });
}

//get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photos_array = await response.json();
        console.log(photos_array);
        displayPhotos();
        
    } catch(error) {
        console.log('error:', error);
    }
}

//check if scrolling near bottom of page
window.addEventListener('scroll', (event) => {
    //window.innerHeight - total height of window
    //window.scrollY - position of vertical scroll
    //body.offsetHeight - total height of document
    if(window.innerHeight + window.scrollY 
        >= document.body.offsetHeight - 1000) {
        console.log();
        getPhotos();
    }
});

//on load
getPhotos();
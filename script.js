//unsplash API
//count - The number of photos to return. (Default: 1; max: 30)
//topics - Public topic ID(‘s) to filter selection. If multiple, comma-separated
const count = 10;
const apiKey = 'iO7SEah7t2HgBtjQePvtHrfmVM9lMOC8SiOmem1Cx8k';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log('error:', error);
    }
}

//on load
getPhotos();
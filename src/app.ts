//main types
class PhotoItem {
    constructor(public source: string, public link: string, public description: string){}
}

interface AttributeList {
    [name: string]: string
}

//global parameters
const imageContainer = document.getElementById('image-container')! as HTMLDivElement;
const loader = document.getElementById('loader')! as HTMLDivElement;
let ready: boolean = false;
let imagesLoaded: number = 0;
let totalImages: number = 0;
let photos_array: PhotoItem[] = [];

//unsplash API
//count - The number of photos to return. (Default: 1; max: 30)
//topics - Public topic ID(‘s) to filter selection. If multiple, comma-separated
let count: number = 5;
const apiKey: string = 'iO7SEah7t2HgBtjQePvtHrfmVM9lMOC8SiOmem1Cx8k';
const apiUrl: string = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//image loaded listener
function imageLoaded(): void {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        imagesLoaded = 0;        
        loader.hidden = true;
        count = 30; //increase count after initial load
    }
}

//setAttribute helper function
function setAttributes(element: HTMLElement, attributes: AttributeList): void {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links and photos
function displayPhotos(): void {
    totalImages = photos_array.length;
    photos_array.forEach((photo) => {
        //create <a> to link to source (unsplash)
        const link = document.createElement('a');
        setAttributes(link, {
            href: photo.link,
            target: '_blank'
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.source,
            alt: photo.description,
            title: photo.description
        })
        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a>, then both in imageContainer
        link.appendChild(img);
        imageContainer.appendChild(link);
    });
}

//get photos from unsplash API
async function getPhotos(): Promise<void> {
    try {
        const response = await fetch(apiUrl);
        const photos_raw = await response.json();
        //populate photos array
        photos_array = [];
        for(let i=0; i<photos_raw.length; i++)
        {
            photos_array.push(new PhotoItem(
                photos_raw[i].urls.regular,
                photos_raw[i].links.html,
                photos_raw[i].description
            ));
        }
        //display photos
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
        >= document.body.offsetHeight - 800
        && ready) {
        ready = false;
        getPhotos();
    }
});

//on load
getPhotos();
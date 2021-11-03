"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PhotoItem = (function () {
    function PhotoItem(source, link, description) {
        this.source = source;
        this.link = link;
        this.description = description;
    }
    return PhotoItem;
}());
var imageContainer = document.getElementById('image-container');
var loader = document.getElementById('loader');
var ready = false;
var imagesLoaded = 0;
var totalImages = 0;
var photos_array = [];
var count = 5;
var apiKey = 'iO7SEah7t2HgBtjQePvtHrfmVM9lMOC8SiOmem1Cx8k';
var apiUrl = "https://api.unsplash.com/photos/random/?client_id=" + apiKey + "&count=" + count;
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0;
        loader.hidden = true;
        count = 30;
    }
}
function setAttributes(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
function displayPhotos() {
    totalImages = photos_array.length;
    photos_array.forEach(function (photo) {
        var link = document.createElement('a');
        setAttributes(link, {
            href: photo.link,
            target: '_blank'
        });
        var img = document.createElement('img');
        setAttributes(img, {
            src: photo.source,
            alt: photo.description,
            title: photo.description
        });
        img.addEventListener('load', imageLoaded);
        link.appendChild(img);
        imageContainer.appendChild(link);
    });
}
function getPhotos() {
    return __awaiter(this, void 0, void 0, function () {
        var response, photos_raw, i, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    photos_raw = _a.sent();
                    photos_array = [];
                    for (i = 0; i < photos_raw.length; i++) {
                        photos_array.push(new PhotoItem(photos_raw[i].urls.regular, photos_raw[i].links.html, photos_raw[i].description));
                    }
                    displayPhotos();
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('error:', error_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
window.addEventListener('scroll', function (event) {
    if (window.innerHeight + window.scrollY
        >= document.body.offsetHeight - 800
        && ready) {
        ready = false;
        getPhotos();
    }
});
getPhotos();

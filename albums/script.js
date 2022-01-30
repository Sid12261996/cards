let albumData;
const container = document.querySelector('[data-album-container]');
const template = document.querySelector('[data-album-template]')

async function loadImages(imageCount = 5) {
    showLoading()
    const imagePromises = [];
    for (let i = 0; i < imageCount; i++) {
        imagePromises.push(fetch(`https://picsum.photos/200/300`))
    }
    const imageUrls = (await Promise.all(imagePromises)).map(x => x.url);
    console.log('imageUrls: ', imageUrls);
    albumData = imageUrls.map((x, i) => {
        return { id: i + 1, title: `album no ${i + 1}`, url: x }
    })
    loadAlbumDom();
}
function loadAlbumData(albums) {
    albumData = albums;
}

function loadAlbumDom() {
    removeLoader();
    if (albumData.length !== 0) {
        albumData.forEach(a => {
            const album = template.content.cloneNode(true);
            const imageTag = album.querySelector('[data-album-image]');
            const title = album.querySelector('[data-album-title]');
            title.textContent = a.title;
            imageTag.src = a.url;
            container.append(album)
        });
    }
}

function showLoading() {
    const div = document.createElement('div');
    const text = document.createElement('h3');
    text.textContent = `Loading ...`;
    div.className = 'loader-wrapper';
    div.append(text);
    container.append(div);
}

function removeLoader() {
    const loader = container.querySelector('.loader-wrapper');
    container.removeChild(loader);
}

loadImages(10)
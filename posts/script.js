fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(r => r.json())
    .then(posts => setPosts(posts))

function setPosts(posts) {
    const template = document.querySelector('[data-post-template]');
    const container = document.querySelector('[data-posts-wrapper]');

    posts.forEach(p => {

        const post = template.content.cloneNode(true).children[0];
        const title = post.querySelector('[data-post-title]');
        const body = post.querySelector('[data-post-body]');
        title.textContent = p.title
        body.textContent = p.body
        container.append(post);
    });


    // console.log('template: ', post, 'posts: ', posts);
}
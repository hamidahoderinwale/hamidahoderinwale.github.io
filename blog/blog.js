// to add blog posts to the blog page

const newBlogPosts = [
    { date: "February 23, 2025", title: "New Blog Post", url: "newpost.html" },
    // Add more new blog posts here
];

function addNewBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    const converter = new showdown.Converter();

    newBlogPosts.forEach(post => {
        const markdownContent = `${post.date} | [${post.title}](${post.url})`;
        const htmlContent = converter.makeHtml(markdownContent);

        const newPostElement = document.createElement('p');
        newPostElement.innerHTML = htmlContent;

        // Insert the new post after the first paragraph (which contains "The deeper ends")
        container.insertBefore(newPostElement, container.children[1]);
    });
}

document.addEventListener('DOMContentLoaded', addNewBlogPosts);

// to add new posts to RSS

function updateRSSFeed($newPost) {
    $rssFile = 'rss.xml';
    $xml = simplexml_load_file($rssFile);

    $item = $xml - > channel - > addChild('item');
    $item - > addChild('title', $newPost['title']);
    $item - > addChild('link', $newPost['link']);
    $item - > addChild('pubDate', date(DATE_RSS, strtotime($newPost['date'])));
    $item - > addChild('description', $newPost['description']);

    $xml - > asXML($rssFile);
}

// Usage example
$newPost = [
    'title' => 'Your New Blog Post Title',
    'link' => 'https://hamidah.me/blog/new-post.html',
    'date' => 'Sat, 22 Feb 2025',
    'description' => 'A brief description of your new blog post.'
];

updateRSSFeed($newPost);
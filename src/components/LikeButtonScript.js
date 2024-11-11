export default function setupLikeButton(postSlug) {
  const buttonById = document.getElementById(`like-button-${postSlug}`);
  const buttonByClass = document.querySelector('.like-button');
  const button = buttonById || buttonByClass;

  async function likeArticle(slug) {
    const response = await fetch('/api/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    });

    if (!response.ok) {
      throw new Error('Failed to like article');
    }

    const data = await response.json();
    return data.likes;
  }

  if (button) {
    console.log('Found button, adding click listener');
    button.addEventListener('click', async () => {
      console.log('Button clicked');
      const slug = button.dataset.slug;
      console.log('Slug:', slug);
      try {
        console.log('Calling likeArticle...');
        const newLikeCount = await likeArticle(slug);
        console.log('Received new like count:', newLikeCount);
        
        const likeCount = button.querySelector('.like-count');
        if (likeCount) {
          likeCount.textContent = newLikeCount;
        }
        button.classList.add('liked');
      } catch (error) {
        console.error('Error details:', error);
      }
    });
  } else {
    console.error('Could not find like button');
  }
} 
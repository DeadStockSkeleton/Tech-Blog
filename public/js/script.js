$('#post').on('click', async () => {
    const title = $('#title').val();
    const content = $('#content').val();
    console.log(title)
    if (title && content){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {
                'Content-Type': 'application/json',
              },
        })

        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to create post');
          }
    }
})
$( document ).ready(function() {
    $("#post").on("click", async () => {
        const title = $("#title").val().trim();
        const content = $("#content").val().trim();
        console.log(content);
        if (title && content) {
          const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (response.ok) {
            document.location.replace("/dashboard");
          } else {
            alert("Failed to create post");
          }
        }
      });
      
      $(document).on("click","button.delete", async (event) => {
        if (event.target.hasAttribute("data-id")) {
          const id = event.target.getAttribute("data-id");
      
          const response = await fetch(`api/posts/${id}`, {
            method: "DELETE",
          });
      
          if (response.ok) {
            document.location.replace("/dashboard");
          } else {
            alert("Failed to delete post");
          }
        }
      });
      $('#commentBtn').on('click', async (event) => {
          const content = $('#comment').val();
          const id = event.target.getAttribute("data-id");
          if (content) {
              const url = window.location.origin;
          console.log(url);
            const response = await fetch(`${url}/api/posts/${id}`, {
                method: "POST",
                body:  JSON.stringify({content: content, post_id:id}),
                headers: {
                  "Content-Type": "application/json",
                },
              });
          console.log(id);
              if (response.ok) {
                  
               document.location.replace(`/post/${id}`);
              } else {
                alert("Failed to post comment");
              }
            }
          
      })
      $("#edit").on("click", async (event) => {
        if (event.target.hasAttribute("data-id")) {
          const id = event.target.getAttribute("data-id");
      
          const response = await fetch(`api/posts/${id}`, {
            method: "GET",
          });
      
          if (response.ok) {
            document.location.replace(`/posts/${id}`);
          } else {
            alert("Fail");
          }
        }
      });
      
      $("#editPost").on("click", async (event) => {
        const title = $("#title").val().trim();
        const content = $("#content").val().trim();
        if (title && content) {
          if (event.target.hasAttribute("data-id")) {
            const id = event.target.getAttribute("data-id");
          const url = window.location.origin;
          console.log(url)
            const response = await fetch(`${url}/api/posts/${id}`, {
              method: "PUT",
              body: JSON.stringify({ title, content }),
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            console.log(response);
            if (response.ok) {
              document.location.replace(`/dashboard`);
            } else {
              alert("Fail");
            }
          }
        }
      });
      
});


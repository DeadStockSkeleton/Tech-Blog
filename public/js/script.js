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

$("#delete").on("click", async (event) => {
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

$(document).ready(function() {
  $("#postLogin").click(function(e) {
    e.preventDefault();

    const data = {
      username: document.getElementById("inputUsername").value,
      password: document.getElementById("inputPassword").value
    };

    $.ajax({
      url: "/api/users/login",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    }).done(function(data) {
      if (data.status == "ok") {
        console.log("OK");
        setTimeout(function() {
          window.location.href = `/api/users/auth?token=${data.token}`; // Load dashboard page
        }, 2000);
      } else {
        console.log("Request Failed.", res);
        setTimeout(function() {
          location.reload(); // Refresh page
        }, 2000);
      }
    });
  });
});

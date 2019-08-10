$(document).ready(function() {
  $("#postRegister").click(function(e) {
    e.preventDefault();

    const data = {
      email: document.getElementById("inputEmail").value,
      username: document.getElementById("inputUsername").value,
      name: document.getElementById("inputFullName").value,
      password: document.getElementById("inputPassword").value
    };

    $.ajax({
      url: "/api/users/register",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(res) {
        setTimeout(function() {
          console.log(res);
          window.location.href = "/"; //Load login page
        }, 2000);
      },
      error: function(res) {
        //this will be triggered when the request fails
        console.log("Request Failed.", res);
        setTimeout(function() {
          location.reload(); //Refresh page
        }, 200000);
      }
    });
  });
});

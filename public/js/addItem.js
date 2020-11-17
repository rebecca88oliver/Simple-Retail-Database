let categories;
// When the page loads, grab all of our categories
$.get("/api/cat", data => {
  console.log(data);
  categories = data;
  if (data.length !== 0) {
    for (let i = 1; i < data.length - 2; i++) {
      const row = $("<div class='form-group'>");
      row.append(
        "<label>" +
          data[i] +
          "</label> <input type='text' class='form-control form-control-lg category" +
          i +
          "'> </div>"
      );

      $("#createInventoryFrame").append(row);
    }
  }
});

$("#addItem").on("click", event => {
  event.preventDefault();
  const newItem = {};
  // Make an array of the input values
  for (let i = 1; i < categories.length - 2; i++) {
    const key = categories[i];
    const value = $(".category" + i)
      .val()
      .trim();
    newItem[key] = value;
  }
  console.log(newItem);
  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newItem)
    // On success, run the following code
    .then(() => {
      //close window
      $("input").val("");
    });
});
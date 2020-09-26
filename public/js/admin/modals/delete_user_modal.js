var user_id;

$(() => {
  $('#deleteUserModal').on('show.bs.modal', (event) => {
    var btn = $(event.relatedTarget);
    user_id = btn.data('user_id');
  });

  $("#confirm_Delete_Btn").click(() =>{
    $.ajax({
      url: "user_manager/delete/" + user_id,
      type: "POST",
      success: () => {
        window.location = "user_manager";
      }
    });
  });
});
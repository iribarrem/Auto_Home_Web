$(() => {
  $('#editUserModal').on('show.bs.modal', (event) => {
    var btn = $(event.relatedTarget);
    var user_id = btn.data('user_id');
    $("#edit_user_form").attr("action", "user_manager/" + user_id);

    $.ajax({
      url: "user_manager/" + user_id,
      type: "GET",
      success: (res) => {
        $("#edit_email").val(res.user.email);
        $("#edit_phone").val(res.user.phone);
        $("#edit_role").val(res.role);
      }
    });
  });
});
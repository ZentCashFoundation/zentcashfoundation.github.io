$(document).ready(function () {
  $('.tab-link').click(function (e) {
    e.preventDefault();
    $('.tab-link').removeClass('active');
    $(this).addClass('active');
    $('.tab-parent').css('display', 'none');
    $($(this).attr('sec')).fadeIn();
  });
});
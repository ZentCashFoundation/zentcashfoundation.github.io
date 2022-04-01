  /* FAQ Section Accordion */ 
  var acc = document.getElementsByClassName('accordion');
  var i;

  for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function () {
          this.classList.toggle('active');
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
          } else {
              panel.style.maxHeight = panel.scrollHeight + 'px';
          }
      };
  }
  
  $(document).ready(function () {
    $('.tab-link').click(function (e) {
      e.preventDefault();
      $('.tab-link').removeClass('active');
      $(this).addClass('active');
      $('.tab-parent').css('display', 'none');
      $($(this).attr('sec')).fadeIn();
    });
  });
/* FAQ Section Accordion End */ 

 /* Sticky Menu */
 var navbar = document.getElementsByClassName("midNavbar")[0];
 var topPosNavbar = navbar.offsetTop;
  
 $(window).scroll(function() {
  
	if ($(document).scrollTop() > topPosNavbar) {
		$('.midNavbar').addClass('sticky-top');
    document.getElementsByClassName("sticky-top")[0].style.background="#FFFFFF";
    
	} else {
		$('.midNavbar').removeClass('sticky-top');
    document.getElementsByClassName("midNavbar")[0].style.background="";
	}
});
/* Sticky Menu End */

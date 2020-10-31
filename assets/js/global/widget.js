(function ($) {
    "use strict";

  var $carousel = $(".dt-card-carousel .owl-carousel").owlCarousel({
        items: 1,
        onChanged: function (property) {            
            var current = property.item.index;
            if (current == 0 || current > 0) {
                var currentSlide = $(property.target).find(".owl-item").eq(current).find("[data-thumb]");
                var slideThumbURL = currentSlide.data('thumb');
                var targetImg = $('.carousel-thumb img');

                if (targetImg.length > 0 && currentSlide.length > 0 && slideThumbURL) {
                    targetImg.fadeOut('fast', function () {
                        targetImg.attr('src', slideThumbURL).fadeIn();
                    });
                }
            }
        }
    });

  $.each(['loader-hide', 'layout-changed', 'sidebar-folded', 'sidebar-unfolded'], function (index, value) {
    $(document).on(value, function () {
      setTimeout(function () {
        $carousel.trigger('refresh.owl.carousel');
      }, 300);
    });
  });

})(jQuery);
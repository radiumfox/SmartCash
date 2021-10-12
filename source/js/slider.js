document.addEventListener( 'DOMContentLoaded', function() {
  if(document.querySelector('.features-carousel')) {
    const featuresCarousel = new Splide( '.features-carousel', {
      perMove: 1,
      fixedWidth: '50%',
      type: 'loop',
      pagination: false,
      arrows: false,
      autoplay: true,
      pauseOnHover: true,
      direction: 'ltr',

    });

    featuresCarousel.mount();
  }
});

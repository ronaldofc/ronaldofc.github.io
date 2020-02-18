let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

imagesToLoad.forEach((img) => {
  loadImages(img);
});


/*
//grab all sorces with atribute data-src
let imagesToLoad = document.querySelectorAll('source[data-src]');

const loadImages = (image) => {
        //make the image load before displayed
        image.setAttribute('srcset', image.getAttribute('data-src'));
        //after it displays
        image.parentElement.lastElementChild.onload = () => {
            image.removeAttribute('data-src');
            image.parentElement.lastElementChild.className = 'clear';
        };
};

//call load images for each image
if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    imagesToLoad.forEach((source) => {
      observer.observe(source);
    });
  } else {
    imagesToLoad.forEach((source) => {
      loadImages(source);
    });
  }

  */
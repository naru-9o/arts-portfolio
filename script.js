function loco() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

}

loco()



function navScroll() {

    gsap.to("#nav-right #nav-icons, #nav #nav-left h2 ", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: ".page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true
        }
    })
}

navScroll()



// Function to open sidebar
function openNav() {
    document.getElementById("sidebar").style.width = "400px";
}

// Function to close sidebar
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}



const images = document.querySelectorAll('.page2 .down img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const img = entry.target;

    if (entry.isIntersecting) {
      // Remove class if already present to restart animation
      img.classList.remove('visible');

      // Trigger reflow to force restart
      void img.offsetWidth;

      // Add class back to trigger animation
      img.classList.add('visible');
    } else {
      img.classList.remove('visible'); // Remove when out of view
    }
  });
}, {
  threshold: 0.4
});

images.forEach(img => observer.observe(img));



// slider1

let slider = document.querySelector('.slider');
let nxtBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

nxtBtn.onclick = () => {
    slider.append(slider.querySelector('img:first-child'));
}

prevBtn.onclick = () => {
    slider.prepend(slider.querySelector('img:last-child'))
}


// slider2

let slider1 = document.querySelector('.slider1');
let nxtBtn1 = document.getElementById('next1');
let prevBtn1 = document.getElementById('prev1');

nxtBtn1.onclick = () => {
    slider1.append(slider1.querySelector('img:first-child'));
}

prevBtn1.onclick = () => {
    slider1.prepend(slider1.querySelector('img:last-child'))
}



// slider3

let slider2 = document.querySelector('.slider2');
let nxtBtn2 = document.getElementById('next2');
let prevBtn2 = document.getElementById('prev2');

nxtBtn2.onclick = () => {
    slider2.append(slider2.querySelector('img:first-child'));
}

prevBtn2.onclick = () => {
    slider2.prepend(slider2.querySelector('img:last-child'))
}




// sldier 3 

  const pics = document.querySelector('.pic');

  setInterval(() => {
    pics.appendChild(pics.querySelector('img'));
  }, 4000);




function fixing() {
  // Define base dimensions for each image-div in the three line1 divs
  const baseDimensions = [
      // First line1 div
      [
          { width: 470, height: 600 },
          { width: 470, height: 595 },
          { width: 470, height: 585 },
          { width: 470, height: 520 },
          { width: 470, height: 360 }
      ],
      // Second line1 div
      [
          { width: 470, height: 360 },
          { width: 470, height: 460 },
          { width: 470, height: 588 },
          { width: 470, height: 585 },
          { width: 470, height: 593 }
      ],
      // Third line1 div
      [
          { width: 470, height: 590 },
          { width: 470, height: 511 },
          { width: 470, height: 585 },
          { width: 470, height: 595 },
          { width: 470, height: 592 }
      ]
  ];

  // Select all line1 divs
  const lineDivs = document.querySelectorAll('.line1');

  // Get screen width
  const screenWidth = window.innerWidth;

  // Determine scale factor based on screen size
    let scaleFactor;
    if (screenWidth <= 390) {
        scaleFactor = 0.7; // Very small screens
    } else if (screenWidth <= 480) {
        scaleFactor = 0.74; // Mobile screens
    } else if (screenWidth <=800) {
        scaleFactor = 1.4; // Tablets
    } else if (screenWidth <= 850) {
        scaleFactor = 1.5; // Tablets
    } else if (screenWidth <= 920) {
        scaleFactor = 1.6; // Tablets
    } else if (screenWidth <= 1024) {
        scaleFactor = 1.9; // Tablets
    } else {
        scaleFactor = 1; // Larger screens
    }


  // Loop through each line1 div
  lineDivs.forEach((line, lineIndex) => {
      // Select all image-div inside the current line1 div
      const imageDivs = line.querySelectorAll('.image-div');

      // Loop through each image-div in the current line1 div and assign width/height
      imageDivs.forEach((div, divIndex) => {
          const { width, height } = baseDimensions[lineIndex][divIndex];

          // Apply the scaling factor for responsiveness
          div.style.width = `${width * scaleFactor}px`;
          div.style.height = `${height * scaleFactor}px`;
      });
  });
}

// Run the function on load and on window resize
window.addEventListener('load', fixing);
window.addEventListener('resize', fixing);

fixing();

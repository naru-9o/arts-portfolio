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

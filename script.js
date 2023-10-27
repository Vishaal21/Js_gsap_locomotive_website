//locomotive and scroll trigger cannot work together as locomotive js hijacks the scroll trigger.

function init(){
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

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
init()


let crsr = document.querySelector("#cursor")
let main = document.querySelector("#main")
main.addEventListener("mousemove" , function(e){
  crsr.style.left = e.x + 20 + "px"
  crsr.style.top = e.y +20 +  "px"
})


gsap.from("#nav img, #nav-part2 h4 , #nav-part3" , {
  y : -100,
  opacity : 0,
  duration : 0.2,
  delay : 0.5,
  stagger : 1
})

let tl = gsap.timeline({
    scrollTrigger : {
        trigger : "#page1 h1",
        scroller : "#main",
        markers : false ,
        start : "top 20%",
        end : "top 0%",
        scrub : 3
    }
})

tl.to("#page1 h1",{
    x: -220,
    duration :0.7, 
} , "anim")

tl.to("#page1 h2", {
    x : 135,
    duration : 0.7,
} , "anim")
tl.to("#page1 video" , {
    width : "80vh"
} , "anim")


let tl2 = gsap.timeline({
  scrollTrigger : {
      trigger : "#page1 h1",
      scroller : "#main",
      markers : false,
      start : "top -50%",
      end : "top -120%",
      scrub : 3
  }
})

tl2.to("#main",{
  backgroundColor : "#fff"
})    

let tl3 = gsap.timeline({
  scrollTrigger : {
      trigger : "#page1 h1",
      scroller : "#main",
      markers : false,
      start : "top -300%",
      end : "top -330%",
      scrub : 3
  }
})

tl3.to("#main" , {
  backgroundColor : "#000"
})

var boxes = document.querySelectorAll("#page5 #box")
boxes.forEach(function(elem){
  elem.addEventListener("mouseenter" , function(){
    var att = elem.getAttribute("data-image")
    crsr.style.width = "300px"
    crsr.style.height = "250px"
    crsr.style.borderRadius = "0px"
    crsr.style.backgroundImage = `url(${att})`
  })
  elem.addEventListener("mouseleave" , function(){
    crsr.style.backgroundColor= "transparent"
    crsr.style.width = "10px"
    crsr.style.height = "10px"
    crsr.style.borderRadius = "50%"
    crsr.style.backgroundColor = "pink"
    crsr.style.backgroundImage = `none`
  })
})
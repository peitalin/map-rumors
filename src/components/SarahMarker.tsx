

import * as React from 'react'
import { TweenMax, TimelineMax } from 'gsap'
import 'styles/MapMarker.scss'



interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<A>
}
interface StateProps {
}
interface ReactProps {
  data?: any
}

class SarahMarker extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  componentDidMount() {
    let tp = document.querySelectorAll("#target path");
    let marker = document.querySelectorAll("#marker");
    let corner = document.querySelectorAll("#corner");
    let close = document.querySelectorAll("#close path");
    let divide = document.querySelectorAll("#divider");
    let box = document.querySelectorAll("#box");
    let boxes = document.querySelectorAll(".boxes");
    let sent = document.querySelectorAll(".sent");
    let check = document.querySelectorAll(".check");
    let coEl = document.querySelectorAll(".co-element");
    let cont = document.querySelectorAll(".dialog-text span");
    let button = document.querySelectorAll(".contact");

    TweenMax.set(coEl, {
      opacity: 0,
      visibility: "visible"
    });

    TweenMax.set(close, {
      drawSVG: "50% 50%",
      opacity: 0
    });

    TweenMax.set(check, {
      scale: 0,
      visibiality: "visible"
    });

    //animation that's repeated for all of the sections
    function revolve() {
      var tl = new TimelineMax({
        repeat: -1
      });

      tl.add("begin");
      tl.staggerFromTo(tp, 2.5, {
        scale: 1,
        opacity: 0.7
      }, {
        scale: 1.2,
        opacity: 0,
        transformOrigin: "50% 50%",
        ease: Expo.easeInOut
      }, 0.2, "begin");
      tl.staggerTo(tp, 0.75, {
        scale: 1,
        opacity: 0.7
      }, 0.25);

      tl.timeScale(1.7);

      return tl;
    }
    var repeat = revolve();

    TweenMax.set(box, {
      visibility: "visible",
      scaleX: .19,
      scaleY: 0,
      transformOrigin: "50% 90%"
    });

    TweenMax.set(corner, {
      visibility: "visible",
      perspective: 600,
      y: -3
    });

    TweenMax.set(cont, {
      opacity: 0,
      y: -7,
      visibility: "visible"
    });

    TweenMax.set("#closeback, .boxes, .sent, .message", {
      opacity: 0,
      visibility: "visible",
    });

    TweenMax.set([button, divide, close], {
      visibility: "visible"
    });

    TweenMax.set(marker, {
      scaleX: 1
    });

    function sceneOne() {
      var tl = new TimelineMax({
        paused: true
      });

      tl.add("start");
      tl.staggerFromTo(tp, 0.75, {
        scale: 1,
        opacity: 0.8
      }, {
        scale: 1.6,
        opacity: 0,
        transformOrigin: "50% 50%",
        ease: Circ.easeInOut
      }, 0.08, "start");
      tl.to(".map", 3, {
        scale: 1.008,
        transformOrigin: "50% 50%",
        ease: Linear.easeNone
      }, 0.2, "start");
      tl.fromTo(marker, 0.7, {
        scaleX: 1
      }, {
        scaleX: 0.62,
        transformOrigin: "50% 50%",
        ease: Sine.easeIn
      }, "start+=0.05");
      tl.to(box, 0.7, {
        scaleY: 0.7,
        transformOrigin: "50% 120%",
        ease: Expo.easeIn
      }, "start+=0.05");
      tl.to(marker, 0.5, {
        scaleX: 0.62,
        transformOrigin: "50% 50%",
        ease: Sine.easeIn
      }, "start+=1.2");
      tl.to(box, 0.5, {
        scale: 1,
        y: 90,
        transformOrigin: "50% 130%",
        ease: Expo.easeOut
      }, "start+=1");
      tl.fromTo(close, 0.1, {
        opacity: 0
      }, {
        opacity: 1
      }, "start");
      tl.fromTo(corner, 0.4, {
        opacity: 0,
        scale: 1
      }, {
        opacity: 1,
        scale: 1,
        ease: Sine.easeOut
      }, "start+=1.4");
      tl.staggerTo(cont, 1, {
        y: 0,
        opacity: 1,
        ease: Sine.easeOut
      }, 0.11, "start+=1.25");
      tl.fromTo(button, 0.8, {
        opacity: 0,
        y: -2
      }, {
        opacity: 1,
        y: 0,
        ease: Sine.easeOut
      }, "start+=1.9");
      tl.fromTo(divide, 1, {
        scaleX: 0
      }, {
        scaleX: 1,
        ease: Expo.easeOut
      }, "start+=2");
      tl.fromTo(close, 1.1, {
        drawSVG: "50% 50%"
      }, {
        drawSVG: true,
        ease: Expo.easeOut,
      }, "start+=2");

      tl.timeScale(1.1);

      return tl;
    }
    var master = sceneOne();

    //contact in
    function contact() {
      var tl = new TimelineMax({
        paused: true
      });

      tl.add("over");
      tl.to(boxes, 0.1, {
        opacity: 1
      }, "over");
      tl.to(button, 0.5, {
        y: -62,
        x: 78,
        lineHeight: "0.5em",
        ease: Expo.easeOut
      }, "over");
      tl.staggerTo(cont, 0.5, {
        opacity: 0,
        ease: Expo.easeOut
      }, 0.1, "over");
      tl.fromTo(coEl, 0.5, {
        opacity: 0
      }, {
        opacity: 1,
        ease: Circ.easeOut
      }, "over");
      tl.to(divide, 1, {
        scaleX: 0,
        ease: Expo.easeOut
      }, "over");

      //tl.timeScale(1.5);

      return tl;
    }
    var contactbox = contact();

    function submitted() {
      var eB = document.querySelectorAll(".inCo")
      var subM = document.querySelectorAll(".submit")

      var tl = new TimelineMax({
        paused: true
      });

      tl.add("done");
      tl.to("label", 0.5, {
        opacity: 0,
        ease: Sine.easeIn
      }, "done");
      tl.to(".sub", 0.5, {
        opacity: 0,
        ease: Sine.easeIn
      }, "done");
      tl.to(button, 0.5, {
        opacity: 0,
        ease: Sine.easeIn
      }, "done");
      tl.fromTo(eB, 0.05, {
        width: "125px",
        height: "auto",
        padding: "8px 5px 8px 55px",
        opacity: 1,
        x: 0,
        borderRadius: "0"
      }, {
        width: 20,
        height: 20,
        padding: 0,
        opacity: 0.15,
        x: 60,
        borderRadius: "1000px",
        ease: Circ.easeInOut
      }, "done+=1");
      tl.to(subM, 0.05, {
        width: 20,
        height: 20,
        padding: 0,
        opacity: 0.15,
        x: 60,
        borderRadius: "1000px",
        ease: Circ.easeInOut
      }, "done+=1");
      tl.to(subM, 0.5, {
        opacity: 0.8,
        y: "-=30",
        ease: Circ.easeInOut
      }, "done+=1.5");
      tl.to(eB, 0.5, {
        opacity: 0.8,
        y: "+=30",
        ease: Circ.easeInOut
      }, "done+=1.5");
      tl.to(subM, 0.5, {
        opacity: 0.2,
        y: "+=30",
        ease: Circ.easeInOut
      }, "done+=2.5");
      tl.to(eB, 0.5, {
        opacity: 0.2,
        y: "-=30",
        ease: Circ.easeInOut
      }, "done+=2.5");
      tl.to(subM, 0.5, {
        opacity: 0.8,
        y: "-=30",
        ease: Circ.easeInOut
      }, "done+=3.5");
      tl.to(eB, 0.5, {
        opacity: 0.8,
        y: "+=30",
        ease: Circ.easeInOut
      }, "done+=3.5");
      tl.to(subM, 0.25, {
        opacity: 0.8,
        y: "+=15",
        ease: Circ.easeInOut
      }, "done+=4.5");
      tl.to(eB, 0.25, {
        opacity: 0.8,
        y: "-=15",
        ease: Circ.easeInOut
      }, "done+=4.5");
      tl.to(subM, 0.5, {
        backgroundColor: "#09CA51",
        transformOrigin: "50% 50%",
        scale: 1.75,
        y: "-=70",
        x: "-=23",
        ease: Power3.easeIn
      }, "done+=5.5");
      tl.to(corner, 0.5, {
        opacity: 0,
        scale: 0.9,
        ease: Circ.easeIn
      }, "done+=5.5");
      tl.to(".email-box", 0.02, {
        opacity: 0,
        ease: Circ.easeIn
      }, "done+=5.2");
      tl.to(eB, 0.02, { //makes it prepped for reopening
        opacity: 1
      }, "done+=5.5");
      tl.fromTo(check, 0.2, {
        scale: 0,
        rotation: -30
      }, {
        scale: 1,
        rotation: 0,
        transformOrigin: "50% 50%",
        ease: Back.easeOut
      }, "done+=7.1");
      tl.to(subM, 0.05, {
        scale: 1.25,
        transformOrigin: "50% 50%",
        ease: Back.easeOut
      }, "done+=6.65");
      tl.fromTo(".sent", 0.1, {
        opacity: 0
      }, {
        opacity: 1,
        ease: Sine.easeOut
      }, "done+=5");
      tl.fromTo(".sent-main", 0.75, {
        opacity: 0
      }, {
        opacity: 1,
        ease: Sine.easeOut
      }, "done+=7");
      tl.fromTo(".message", 0.75, {
        opacity: 0
      }, {
        opacity: 1,
        ease: Sine.easeOut
      }, "done+=7.1");

      //tl.timeScale(1.1);

      return tl;
    }
    var complete = submitted();

    //contact out
    function conOut() {
      var tl = new TimelineMax({
        paused: true
      });

      tl.add("cOut");
      tl.to(boxes, 0.1, {
        opacity: 0,
        ease: Expo.easeIn
      }, "cOut");
      tl.to(button, 0.3, {
        opacity: 0,
        ease: Expo.easeIn
      }, "cOut");
      tl.fromTo(close, 1.1, {
        drawSVG: true
      }, {
        drawSVG: "50% 50%",
        ease: Expo.easeOut,
      }, "cOut");
      tl.to(corner, 0.4, {
        opacity: 0,
        scale: 1,
        ease: Sine.easeOut
      }, "cOut");
      tl.to(".sent", 0.3, {
        opacity: 0,
        ease: Sine.easeOut
      }, "cOut");
      tl.to(close, 0.4, {
        drawSVG: "50% 50%"
      }, "cOut");
      tl.to(check, 0.4, {
        scale: 0,
        transformOrigin: "50% 50%",
        ease: Sine.easeOut
      }, "cOut");
      tl.to("label", 0.4, {
        scale: 1,
        x: 0,
        opacity: 1
      }, "cOut");
      tl.to(".map", 3, {
        scale: 1,
        transformOrigin: "50% 50%",
        ease: Linear.easeNone
      }, "cOut");
      tl.to(button, 0.1, {
        x: 0,
        lineHeight: "1"
      }, "cOut+=1");
      tl.to(box, 1, {
        scaleY: 0.8,
        scaleX: .19,
        transformOrigin: "50% 0%",
        ease: Expo.easeInOut
      }, "cOut");
      tl.to("label", 0.5, {
        opacity: 1,
        ease: Sine.easeIn
      }, "cOut+=1");
      tl.to(".sub", 0.5, {
        opacity: 1,
        ease: Sine.easeIn
      }, "cOut+=1");
      tl.to(".inCo", 0.1, {
        width: "125px",
        height: "auto",
        padding: "8px 5px 8px 55px",
        opacity: 1,
        x: 0,
        y: 0,
        borderRadius: "0"
      }, "cOut+=1");
      tl.to(".submit", 0.1, {
        width: "175px",
        height: "auto",
        padding: "8px 5px",
        backgroundColor: "#0083b2",
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        borderRadius: "0"
      }, "cOut+=1");
      tl.to(box, 0.75, {
        scaleX: .19,
        scaleY: 0,
        transformOrigin: "50% 90%",
        ease: Expo.easeIn
      }, "cOut+=1");
      tl.to(marker, 0.5, {
        scaleX: 1,
        transformOrigin: "50% 50%",
        ease: Sine.easeIn
      }, "cOut+=1.5");

      tl.timeScale(2);

      return tl;
    }
    var contactOut = conOut();

    var mt = document.querySelectorAll(".marker-touch");
    var md = document.querySelectorAll(".marker-dialog");
    var coBut = document.querySelectorAll(".button");

    // let close = document.getElementById('close');
    close[0].addEventListener('click', () => {
      e.preventDefault();
      mt[0].classList.remove('hide')

      if (md[0].classList.contains('contactOpen')) {
        button[0].classList.remove('hide')
        coBut[0].classList.remove('main')
        coBut[0].classList.add('button')
        contactOut.restart();
      } else {
        master.reverse();
        master.timeScale(1.8);
      }

      repeat.progress(0);
      TweenMax.set(tp, {
        opacity: 0,
      });
      TweenMax.delayedCall(1.6, function() {
        repeat.restart()
      });
      mt[0].classList.remove('contactOpen')
      document.querySelectorAll('input[type=email]')
      // $("input[type=email]").val("");
    });


    $(mt).on("click", function(e) {
      e.preventDefault();
      master.restart();
      repeat.pause();
      $(this).addClass("hide");
    });

    $(button).on("click", function(e) {
      e.preventDefault();
      contactbox.restart();
      $(md).addClass("contactOpen");
      $(this).addClass("hide");
      $(this).find(".button").addClass("main");
      $(this).find(".button").removeClass("button");
    });

    $('.email-box input').on("mousenter focus",
      function(e) {
        e.preventDefault();
        TweenMax.to("label", 0.2, {
          scale: 0.75,
          x: -65,
          opacity: 0.75,
          ease: Sine.easeOut
        });
      });

    $('label').on("click",
      function(e) {
        e.preventDefault();
        TweenMax.to("label", 0.2, {
          scale: 0.75,
          x: -65,
          opacity: 0.75,
          ease: Sine.easeOut
        });
      });

    $(".submit").on("click", function(e) {
      e.preventDefault();
      $("input[type=email]").val("");
      complete.restart();
    });


  }

  render() {
    return (
      <div>
        {/* <div className="dialog-text"> */}
        {/*   <p className="main"><span>Cleveland Offices</span></p> */}
        {/*   <p className="details"> */}
        {/*     <span>240 MAIN STREET</span><br> */}
        {/*     <span className="gr">(210) 555 ~ 4598</span> */}
        {/*   </p> */}
        {/*   <p className="details"> */}
        {/*     <span>MONDAY - FRIDAY</span><br> */}
        {/*     <span className="gr">8:00AM ~ 5:00PM</span> */}
        {/*   </p> */}
        {/* </div><!--dialog-text--> */}
        {/*  */}
        {/* <div className="contact"><a className="button contact-stay">Contact</a></div> */}
        {/* <div className="boxes"> */}
        {/*   <div className="email-box co-element"> */}
        {/*     <input type="email" className="inCo"/> */}
        {/*     <label for="email" className="email">Email</label> */}
        {/*     <div className="bar"></div> */}
        {/*   </div> */}
        {/*   <div className="submit co-element"><span className="sub">Submit</span></div> */}
        {/*   <svg className="check" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" */}
        {/*     viewBox="0 0 50 50"> */}
        {/*     <title>check</title> */}
        {/*     <line x1="4.4" y1="28.3" x2="22" y2="45"/> */}
        {/*     <line x1="22" y1="45" x2="45.9" y2="2.3"/> */}
        {/*   </svg> */}
        {/* </div><!--boxes--> */}

        {/* <div className="sent"> */}
        {/*     <div className="sent-main">Sent Successfully<br></div> */}
        {/*     <span className="message">We will be in touch with you shortly.</span> */}
        {/* </div> */}

        <svg className="marker-dialog" viewBox="0 0 420 310">
          <path id="marker" d="M254.8 179.8c-11.5-11.6-27.3-18.7-44.9-18.7-35 0-63.4 28.5-63.4 63.8 0 26 20.3 48.1 38.2 62.7 16.4 13.4 24 20.4 25.1 21.4.2.1.2.1.9-.6 2.3-2.1 10-9 24.5-20.8 17.8-14.6 38.2-36.7 38.2-62.7 0-17.6-7.1-33.6-18.6-45.1z" />
          <path id="box" d="M2 2h416v283H2z" />
          <g id="target">
            <path className="lg-circ" d="M241.3 211.9c-1.8-4.2-4.2-7.8-7.2-10.8s-6.6-5.5-10.8-7.2c-4.2-1.8-8.6-2.7-13.2-2.7s-9 .9-13.2 2.7c-4.2 1.8-7.8 4.2-10.8 7.2s-5.5 6.6-7.2 10.8c-1.8 4.2-2.7 8.6-2.7 13.2s.9 9 2.7 13.2c1.8 4.2 4.2 7.8 7.2 10.8s6.6 5.5 10.8 7.2c4.2 1.8 8.6 2.7 13.2 2.7s9-.9 13.2-2.7c4.2-1.8 7.8-4.2 10.8-7.2s5.5-6.6 7.2-10.8c1.8-4.2 2.7-8.6 2.7-13.2s-.9-9-2.7-13.2zm-5.7 24.1c-1.5 3.4-3.4 6.4-5.9 8.9-2.5 2.5-5.4 4.5-8.9 5.9-3.4 1.5-7 2.2-10.8 2.2s-7.4-.7-10.8-2.2c-3.4-1.5-6.4-3.4-8.9-5.9-2.5-2.5-4.5-5.4-5.9-8.9-1.5-3.4-2.2-7-2.2-10.8s.7-7.4 2.2-10.8c1.5-3.4 3.4-6.4 5.9-8.9 2.5-2.5 5.4-4.5 8.9-5.9 3.4-1.5 7-2.2 10.8-2.2 3.8 0 7.4.7 10.8 2.2 3.4 1.5 6.4 3.4 8.9 5.9 2.5 2.5 4.5 5.4 5.9 8.9 1.5 3.4 2.2 7 2.2 10.8s-.7 7.3-2.2 10.8z"
            />
            <path className="md-circ" d="M225.3 209.9c-1.9-1.9-4.2-3.5-6.9-4.6-2.7-1.1-5.5-1.7-8.4-1.7s-5.7.6-8.4 1.7-5 2.7-6.9 4.6-3.5 4.2-4.6 6.9c-1.1 2.7-1.7 5.5-1.7 8.4 0 2.9.6 5.7 1.7 8.4s2.7 5 4.6 6.9 4.2 3.5 6.9 4.6c2.7 1.1 5.5 1.7 8.4 1.7s5.7-.6 8.4-1.7 5-2.7 6.9-4.6 3.5-4.2 4.6-6.9c1.1-2.7 1.7-5.5 1.7-8.4 0-2.9-.6-5.7-1.7-8.4s-2.7-5-4.6-6.9zm-1.1 21.3c-.8 1.9-1.9 3.6-3.3 4.9-1.4 1.4-3 2.5-4.9 3.3s-3.9 1.2-6 1.2-4.1-.4-6-1.2-3.6-1.9-4.9-3.3c-1.4-1.4-2.5-3-3.3-4.9-.8-1.9-1.2-3.9-1.2-6s.4-4.1 1.2-6 1.9-3.6 3.3-4.9c1.4-1.4 3-2.5 4.9-3.3 1.9-.8 3.9-1.2 6-1.2s4.1.4 6 1.2 3.5 1.9 4.9 3.3c1.4 1.4 2.5 3 3.3 4.9s1.2 3.9 1.2 6c.1 2.1-.4 4.1-1.2 6z"
            />
            <path className="sm-circ" d="M210 215.9c-2.6 0-4.7.9-6.6 2.7-1.8 1.8-2.7 4-2.7 6.6s.9 4.7 2.7 6.6c1.8 1.8 4 2.7 6.6 2.7s4.7-.9 6.6-2.7c1.8-1.8 2.7-4 2.7-6.6s-.9-4.7-2.7-6.6c-1.9-1.8-4-2.7-6.6-2.7zm2.2 11.4c-.6.6-1.3.9-2.2.9s-1.6-.3-2.2-.9c-.6-.6-.9-1.3-.9-2.2s.3-1.6.9-2.2c.6-.6 1.3-.9 2.2-.9s1.6.3 2.2.9c.6.6.9 1.3.9 2.2s-.3 1.6-.9 2.2z"
            />
          </g>
          <g id="close" strokeMiterlimit="10">
            <rect id="closeback" fill="black" x="370.8" y="20.7" width="24.8" height="24.8"/>
            <path fill="none" stroke="#777" d="M370.8 20.7l24.8 24.8" />
            <path fill="none" stroke="#777" d="M395.6 20.7l-24.8 24.8" />
          </g>
          <g id="corner">
            <defs>
              <path id="SVGID_1_" d="M2 2h227.8L2 231.3z" />
            </defs>
            <clipPath id="SVGID_2_">
              <use href="#SVGID_1_" overflow="visible" />
            </clipPath>
            <g clipPath="url(#SVGID_2_)">
              <image overflow="visible" width="3210" height="2448" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/bridge-opt.jpg" transform="matrix(.098 0 0 .098 -84.265 -32.095)" />
            </g>
            <g>
              <defs>
                <path id="SVGID_3_" d="M2 2h227.8L2 231.3z" />
              </defs>
              <clipPath id="SVGID_4_">
                <use href="#SVGID_3_" overflow="visible" />
              </clipPath>
            </g>
          </g>
          <path id="divider" fill="none" stroke="#333" strokeMiterlimit="10" d="M204 184h142" />
        </svg>

        <div className="marker-touch">
          <svg viewBox="0 0 420 310">
            <path fill="none" d="M254.8 179.8c-11.5-11.6-27.3-18.7-44.9-18.7-35 0-63.4 28.5-63.4 63.8 0 26 20.3 48.1 38.2 62.7 16.4 13.4 24 20.4 25.1 21.4.2.1.2.1.9-.6 2.3-2.1 10-9 24.5-20.8 17.8-14.6 38.2-36.7 38.2-62.7 0-17.6-7.1-33.6-18.6-45.1z" />
          </svg>
        </div>
      </div>
    )
  }
}

export default SarahMarker

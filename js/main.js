gsap.registerPlugin(ScrollTrigger, Flip);

Splitting();


/////////////////////////////////////////////////preload


function preload() {
  // preload
  let container7 = document.querySelector("#progress");
  let progressBar7 = document.querySelector(".progress-bar");
  let progressText7 = document.querySelector(".progress-text");
  let imgLoaded7 = 0;
  let imgTotal7 = 1100;
  let current7 = 0;
  let progressTimer7;
  let topValue7;

  progressTimer7 = setInterval(updateProgress7, 1000 / 60)

  function updateProgress7() {
    imgLoaded7++;
    console.log(imgLoaded7)
    let target7 = (imgLoaded7 / imgTotal7) * 100;
    current7 += (target7 - current7) * 0.01;
    progressBar7.style.width = current7 + "%";
    progressText7.innerHTML = Math.floor(current7) + "%"; //Math.floor 버림

    let sp;
    if (current7 > 99.9) {
      clearInterval(progressTimer7)
      container7.classList.add("progress-complete")
      progressBar7.style.width = "100%";
      gsap.to(container7, {
        duration: 0.5,
        yPercent: -100,
        ease: "none",
        onUpdate: function scrollPrevent() {
          showLoadingScreen();
          sp = requestAnimationFrame(scrollPrevent) //2번줄
          setTimeout(() => {
            cancelAnimationFrame(sp);
            hideLoadingScreen();
          }, 10);
        },

      })
    }

  }



  //proloading시 scroll 움직이는 못하게 막기
  function showLoadingScreen() {
    document.body.classList.add('loading');
    window.scrollTo(0, 0);
  }

  function hideLoadingScreen() {
    document.body.classList.remove('loading');
  }
  showLoadingScreen();
}
preload()



////////////////////////////////////////////////////////////////////////////


function page1_back() {
  VANTA.CLOUDS({
    el: ".page1_a",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    skyColor: 0x2d0f2d,
    cloudColor: 0x2d0f2d,
    cloudShadowColor: 0xc411e,
    sunColor: 0x461270,
    sunGlareColor: 0x14147f,
    sunlightColor: 0xffffff,
    speed: 1
  })

}
page1_back()



function page1_t() {

  const config = {
    text: "portfolio",
    widthToSpikeLengthRatio: 0.054
  };

  const colorConfig = {
    particleOpacity: 0.2,
    baseHue: 350,
    hueRange: 9,
    hueSpeed: 0.04,
    colorSaturation: 100,
  };

  class Planet {
    constructor(x, y, g) {
      this.pos = new Vector(x, y);
      this.g = g;
    }

    draw() {
      ctx.fillStyle = "#FF4191";
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // A line that is part of forming the text
  class Particle {
    constructor(x, y) {
      this.pos = new Vector(x, y);
      this.vel = new Vector(0, spikeLength);
    }

    move(force) {
      if (force) {
        this.vel.addTo(force);
      }
      if (this.vel.getLength() > spikeLength) {
        this.vel.setLength(spikeLength);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      let p2 = this.pos.add(this.vel);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }

  let canvas;
  let ctx;
  let w, h;
  let hue;
  let particles;
  let spikeLength;
  let planets;
  let A;
  let B;
  let a;
  let b;
  let tick;

  function setup() {
    tick = 0;
    planets = [];
    let len = Math.round(Math.random() * 3 + 3);
    for (let i = 0; i < len; i++) {
      let p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
      planets.push(p);
    }
    canvas = document.querySelector("#page1_canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("resize", reset);
    canvas.addEventListener("mousemove", mousemove);
    reset();
  }

  function reset() {
    hue = colorConfig.baseHue;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    spikeLength = w * config.widthToSpikeLengthRatio;
    A = w / 2.2;
    B = h / 2.2;
    a = Math.round(Math.random() + 2);
    b = Math.round(Math.random() + 2);
    drawText();
  }

  function mousemove(event) {
    let x = event.clientX;
    let y = event.clientY;
    planets[0].pos.x = x;
    planets[0].pos.y = y;
  }

  function draw(now) {
    clear();
    requestAnimationFrame(draw);
    updateParticles();
    updatePlanets();
    tick = now / 50;
  }

  function clear() {
    ctx.clearRect(0, 0, w, h);
  }

  function drawText() {
    ctx.save();
    let fontSize = w * 0.2;
    ctx.font = "bold " + fontSize + "px Arial, Helvetica, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.strokeText(config.text, w / 2, h / 2);
    ctx.restore();
    let imageData = ctx.getImageData(0, 0, w, h);

    particles = [];

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        let i = (x + w * y) * 4;
        let average = (imageData.data[i] +
          imageData.data[i + 1] +
          imageData.data[i + 2] +
          imageData.data[i + 3]) / 4;
        if (average > 200) {
          let particle = new Particle(x, y);
          particles.push(particle);
        }
      }
    }
    clear();
  }

  function updatePlanets() {
    let len = planets.length;
    for (let i = 1; i < len; i++) {
      let angle = Math.PI * 2 / (len - 1) * i;
      let x = A * Math.sin(a * tick / 100 + angle) + w / 2;
      let y = B * Math.sin(b * tick / 100 + angle) + h / 2;
      let p = planets[i];
      p.pos.x = x;
      p.pos.y = y;
      p.draw();
    }
  }

  function updateParticles() {
    hue += colorConfig.hueSpeed;
    let h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
    ctx.strokeStyle = `hsla(${h}, ${colorConfig.colorSaturation}%, 50%, ${colorConfig.particleOpacity})`;
    particles.forEach(p => {
      // Apply the force of each planet (repeller) to the current particle
      planets.forEach(planet => {
        let d = p.pos.sub(planet.pos);
        let length = d.getLength();
        let g = planet.g / length;
        if (g > 40) {
          g = 40;
        }
        // We keep the angle of the distance
        d.setLength(g);
        p.move(d);
      });
      p.draw();
    });
  }

  setup();
  draw(1);

}
page1_t()


function page1_pin() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#page1",
        start: "top top",
        end: "bottom top",
        scrub: 2,
        pin: true,
      }
    })
    .to(
      ".page1_a", {
        scale: 3,
        opacity: 0,
        duration: 8,
        webkitfilter: "brightness(" + 100 + "%)",
      },
      // 5
    );
}
page1_pin()

//////////////////////////////////////////////////end page1


function page2() {
  const init = () => {
    const introCards = document.querySelectorAll('.intro .card');
    introCards.forEach(introCard => {
      gsap.to(introCard, {
        ease: 'power1.in',
        startAt: {
          transformOrigin: '100% 50%',
          // filter: 'brightness(100%)'
        },
        rotationX: () => -60,
        yPercent: () => gsap.utils.random(-100, 0),
        z: () => gsap.utils.random(-100, 0),
        // filter: 'brightness(100%)',
        scrollTrigger: {
          trigger: introCard,
          start: 'clamp(top bottom)',
          end: 'clamp(bottom top)',
          scrub: true,
        }
      });
    });





    document.querySelectorAll('[data-stack-1]').forEach((stackEl) => {

      let winsize = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      class StackMotionEffect {
        constructor(stackEl) {

          this.wrapElement = stackEl;
          this.contentElement = this.wrapElement.querySelector('.content');
          this.imageElements = [this.contentElement.querySelectorAll('.card')];
          this.imagesTotal = this.imageElements.length;

          this.initializeEffect(stackEl);
        }

        initializeEffect(element) {
          this.scroll();

          const throttledResize = () => {
            winsize = {
              width: window.innerWidth,
              height: window.innerHeight
            };
            this.scroll();
          }
          window.addEventListener('resize', throttledResize);
        }

        scroll() {
          this.contentElement.style.transform = 'rotate3d(1, 0, 0, -25deg) rotate3d(0, 1, 0, 50deg) rotate3d(0, 0, 1, 25deg)';
          this.contentElement.style.opacity = 0;

          if (this.tl) {
            this.tl.kill();
          }

          this.tl = gsap.timeline({
              defaults: {
                ease: 'power1',
              },
              scrollTrigger: {
                trigger: this.wrapElement,
                start: 'top center',
                end: '+=150%',
                scrub: true,
                onEnter: () => gsap.set(this.contentElement, {
                  opacity: 1
                }),
                onEnterBack: () => gsap.set(this.contentElement, {
                  opacity: 1
                }),
                onLeave: () => gsap.set(this.contentElement, {
                  opacity: 0
                }),
                onLeaveBack: () => gsap.set(this.contentElement, {
                  opacity: 0
                })
              },
            })
            .fromTo(this.imageElements, {
              z: (pos) => -2.65 * winsize.width - pos * 0.03 * winsize.width,
            }, {
              z: (pos) => 1.4 * winsize.width + (this.imagesTotal - pos - 1) * 0.03 * winsize.width,
            }, 0)
            .fromTo(this.imageElements, {
              rotationZ: -220,
            }, {
              rotationY: -30,
              rotationZ: 120,
              stagger: 0.005,
            }, 0)
        }
      }

      new StackMotionEffect(stackEl);

    });


    document.querySelectorAll('[data-stack-2]').forEach((stackEl) => {
      let winsize = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      class StackMotionEffect {
        constructor(stackEl) {
          // Check if the provided element is valid.
          if (!stackEl || !(stackEl instanceof HTMLElement)) {
            throw new Error('Invalid element provided.');
          }

          this.wrapElement = stackEl;
          this.contentElement = this.wrapElement.querySelector('.content');
          this.imageElements = [this.contentElement.querySelectorAll('.card')];
          this.imagesTotal = this.imageElements.length;

          // Set up the effect for the provided element.
          this.initializeEffect(stackEl);
        }

        // Sets up the initial effect on the provided element.
        initializeEffect(element) {
          // Scroll effect.
          this.scroll();

          const throttledResize = () => {
            winsize = {
              width: window.innerWidth,
              height: window.innerHeight
            };
            this.scroll();
          };
          window.addEventListener('resize', throttledResize);
        }

        scroll() {
          // Let's set the initial rotation for the content element
          this.contentElement.style.transform = 'rotate3d(1, 0, 0, 55deg) rotate3d(0, 1, 0, 30deg)';
          this.contentElement.style.opacity = 0;

          if (this.tl) {
            this.tl.kill();
          }

          this.tl = gsap.timeline({
              defaults: {
                ease: 'sine.inOut',
              },
              scrollTrigger: {
                trigger: this.wrapElement,
                start: 'top center',
                end: '+=150%',
                scrub: true,
                onEnter: () => gsap.set(this.contentElement, {
                  opacity: 1
                }),
                onEnterBack: () => gsap.set(this.contentElement, {
                  opacity: 1
                }),
                onLeave: () => gsap.set(this.contentElement, {
                  opacity: 0
                }),
                onLeaveBack: () => gsap.set(this.contentElement, {
                  opacity: 0
                }),
              },
            })
            .fromTo(this.imageElements, {
              z: (pos) => -1.2 * winsize.height - pos * 0.08 * winsize.height,
            }, {
              z: (pos) => 3 * winsize.height + (this.imagesTotal - pos - 1) * 0.08 * winsize.height,
            }, 0)
            .fromTo(this.imageElements, {
              rotationZ: -130,
            }, {
              rotationZ: 360,
              stagger: 0.006,
            }, 0)
          /*.fromTo(this.imageElements, {
            filter: 'brightness(10%)',
          }, {
            filter: 'brightness(400%)',
            stagger: 0.005,
          }, 0);*/
        }
      }


      new StackMotionEffect(stackEl);
    });


    document.querySelectorAll('[data-stack-3]').forEach((stackEl) => {
      let winsize = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      class StackMotionEffect {
        constructor(stackEl) {
          // Check if the provided element is valid.
          if (!stackEl || !(stackEl instanceof HTMLElement)) {
            throw new Error('Invalid element provided.');
          }

          this.wrapElement = stackEl;
          this.contentElement = this.wrapElement.querySelector('.content');
          this.imageElements = [this.contentElement.querySelectorAll('.card')];
          this.imagesTotal = this.imageElements.length;

          // Set up the effect for the provided element.
          this.initializeEffect(stackEl);
        }

        // Sets up the initial effect on the provided element.
        initializeEffect(element) {
          // Scroll effect.
          this.scroll();

          const throttledResize = () => {
            winsize = {
              width: window.innerWidth,
              height: window.innerHeight
            };
            this.scroll();
          };
          window.addEventListener('resize', throttledResize);
        }

        scroll() {
          // Let's set the initial rotation for the content element
          this.contentElement.style.transform = 'rotate3d(1, 0, 0, 25deg) rotate3d(0, 1, 0, -50deg) rotate3d(0, 0, 1, 25deg)';
          this.contentElement.style.opacity = 0;

          if (this.tl) {
            this.tl.kill();
          }

          this.tl = gsap.timeline({
              defaults: {
                ease: 'power1',
              },
              scrollTrigger: {
                trigger: this.wrapElement,
                start: 'top center',
                end: '+=150%',
                scrub: true,
                onEnter: () => gsap.set(this.contentElement, {
                  opacity: 1
                }),
                onEnterBack: () => gsap.set(this.contentElement, {
                  opacity: 1
                }),
                onLeave: () => gsap.set(this.contentElement, {
                  opacity: 0
                }),
                onLeaveBack: () => gsap.set(this.contentElement, {
                  opacity: 0
                }),
              },
            })
            .fromTo(this.imageElements, {
              z: (pos) => -2.5 * winsize.width / 2 - pos * 0.07 * winsize.width,
            }, {
              z: (pos) => 2.5 * winsize.width + (this.imagesTotal - pos - 1) * 0.07 * winsize.width,
            }, 0)
            .fromTo(this.imageElements, {
              rotationZ: 10,
            }, {
              rotationX: 20,
              rotationZ: 280,
              yPercent: -100,
              stagger: 0.005,
            }, 0)
          /*.fromTo(this.imageElements, {
            filter: 'brightness(20%)',
          }, {
            filter: 'brightness(350%)',
            stagger: 0.005,
          }, 0);*/
        }
      }


      new StackMotionEffect(stackEl);
    });

  };






  window.addEventListener("load", () => {
    init();
  })
}
page2()

//////////////////////////////////////////////////end page2

function page3() {


  const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

  // Linear interpolation
  const lerp = (a, b, n) => (1 - n) * a + n * b;

  const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


  ////////////////////////////

  let Element = document.querySelector(".main");
  let offset = Element.getBoundingClientRect().top + window.scrollY;
  let offsetWidth = Element.getBoundingClientRect().width;
  //console.log(offsetWidth)

  let scroll = {
    cache: 0,
    current: 0
  };
  const allImgs = [...document.querySelectorAll('.gallery__item-img')];

  ///////////////////////////////

  let mouse = {
    x: 0,
    y: 0
  };

  class Cursor {
    constructor(el) {
      this.DOM = {
        el: el
      };
      this.DOM.el.style.opacity = 0;

      this.bounds = this.DOM.el.getBoundingClientRect();

      this.renderedStyles = {
        tx: {
          previous: 0,
          current: 0,
          amt: 0.2
        },
        ty: {
          previous: 0,
          current: 0,
          amt: 0.2
        },
        scale: {
          previous: 1,
          current: 1,
          amt: 0.15
        },
        //opacity: {previous: 1, current: 1, amt: 0.1}
      };

      this.onMouseMoveEv = () => {
        this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
        this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = mouse.y - this.bounds.height / 2;
        gsap.to(this.DOM.el, {
          duration: 0.9,
          ease: 'Power3.easeOut',
          opacity: 1
        });
        requestAnimationFrame(() => this.render());
        window.removeEventListener('mousemove', this.onMouseMoveEv);
      };
      window.addEventListener('mousemove', this.onMouseMoveEv);
    }
    enter() {
      this.renderedStyles['scale'].current = 2.5;
      //this.renderedStyles['opacity'].current = 0.5;
    }
    leave() {
      this.renderedStyles['scale'].current = 1;
      //this.renderedStyles['opacity'].current = 1;
    }
    render() {
      this.renderedStyles['tx'].current = mouse.x - this.bounds.width / 2;
      this.renderedStyles['ty'].current = mouse.y - this.bounds.height / 2;

      for (const key in this.renderedStyles) {
        this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
      }

      this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
      //this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

      requestAnimationFrame(() => this.render());
    }
  }

  gsap.registerPlugin(ScrollTrigger)





  class Example {
    constructor(options) {
      this.root = options.root;

      this.init();

      //setTimeout(this.showImages.bind(this), 1000);
    }

    init() {


      let list = document.querySelectorAll(".gallery .gallery__item");
      let imgBoxs = document.querySelectorAll("[data-scroll-speed]")
      let textBoxs = document.querySelectorAll(".gallery .gallery__text")

      //console.log(imgBoxs)

      const rotationsArr = Array.from({
        length: list.length
      }, () => randomNumber(-30, 30));
      const translationArr = Array.from({
        length: list.length
      }, () => randomNumber(-100, 100));
      // Array.from({ length: elems.length }):
      // elems.length 길이를 가진 배열을 생성합니다. 이 배열은 초기값으로 undefined를 가진 요소들을 가집니다.
      // () => randomNumber(-30, 30):
      // 배열의 각 요소를 채우기 위한 함수입니다. 이 함수는 -30에서 30 사이의 임의의 숫자를 생성합니다. randomNumber 함수는 사용자 정의 함수로, 해당 범위의 난수를 반환합니다.
      // 결과적으로 rotationsArr 배열은 elems 배열의 길이만큼의 요소를 가지며, 각 요소는 -30에서 30 사이의 난수입니다.


      let scrollTween = gsap.to(".gallery>*", { //img영역 
        xPercent: -100 * (list.length * 1.55),
        ease: "none",
        scrollTrigger: {
          trigger: ".main",
          start: "center center",
          scrub: 1,
          end: "+=300%",
          pin: true,

        }
      })


      list.forEach(function (item, idx) {


        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "center right",
            end: 'center left',
            containerAnimation: scrollTween,
            scrub: true,
            onUpdate: (self) => {
              let progress = self.progress
              //map(value, in_min, in_max, out_min, out_max)// 입력 범위 (in_min에서 in_max)의 값을 출력 범위 (out_min에서 out_max)로 변환
              // map(progress, 0.6, 1, 0, rotationsArr[idx])
              // progress: 변환할 값입니다.
              // 0.6: 입력 범위의 최소값입니다.
              // 1: 입력 범위의 최대값입니다.
              // 0: 출력 범위의 최소값입니다.
              // rotationsArr[idx]: 출력 범위의 최대값입니다.rotationsArr는 앞서 정의된 배열이며, idx는 현재 요소의 인덱스입니다.
              const rotationVal = progress > 0.6 ? clamp(map(progress, 0.6, 1, 0, rotationsArr[idx]), Math.min(0, rotationsArr[idx]), Math.max(0, rotationsArr[idx])) : 0;

              const translationVal = progress > 0.6 ? clamp(map(progress, 0.6, 1, 0, translationArr[idx]), Math.min(0, translationArr[idx]), Math.max(0, translationArr[idx])) : 0;

              gsap.to([item, textBoxs], {
                yPercent: translationVal,
                rotate: rotationVal
              })

            }
          }
        })



      })

      // this.images = this.root.querySelectorAll('.image');

    }

  }


  window.addEventListener("load", () => {

    const example = new Example({
      root: document.querySelector('.scroll-animations-example')
    });

    const cursor = new Cursor(document.querySelector('.cursor'));

    [...document.querySelectorAll('a')].forEach(link => {
      link.addEventListener('mouseenter', () => cursor.enter());
      link.addEventListener('mouseleave', () => cursor.leave());
    });
  });
}
page3()

//////////////////////////////////////////////////end page3

function page7() {
  const fx16Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect16]')];
  const fx17Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect17]')];
  const fx18Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect18]')];
  const fx19Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect19]')];
  const fx20Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect20]')];
  const fx21Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect21]')];
  const fx22Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect22]')];
  const fx23Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect23]')];
  const fx24Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect24]')];
  const fx25Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect25]')];
  const fx26Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect26]')];
  const fx27Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect27]')];
  const fx28Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect28]')];
  const fx29Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect29]')];


  // GSAP Scroll Triggers
  const scroll = () => {

    fx16Titles.forEach(title => {

      gsap.fromTo(title, {
        transformOrigin: '0% 50%',
        rotate: 3
      }, {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        }
      });

      gsap.fromTo(title.querySelectorAll('.word'), {
        'will-change': 'opacity',
        opacity: 0.1
      }, {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: title,
          start: 'top bottom-=20%',
          end: 'center top+=20%',
          scrub: true,
        }
      });

    });

    fx17Titles.forEach(title => {

      const chars = title.querySelectorAll('.char');

      chars.forEach(char => gsap.set(char.parentNode, {
        perspective: 1000
      }));

      gsap.fromTo(chars, {
        'will-change': 'opacity, transform',
        opacity: 0,
        rotateX: () => gsap.utils.random(-120, 120),
        z: () => gsap.utils.random(-200, 200),
      }, {
        ease: 'none',
        opacity: 1,
        rotateX: 0,
        z: 0,
        stagger: 0.02,
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    });

    fx18Titles.forEach(title => {

      const chars = title.querySelectorAll('.char');

      chars.forEach(char => gsap.set(char.parentNode, {
        perspective: 1000
      }));

      gsap.fromTo(chars, {
        'will-change': 'opacity, transform',
        opacity: 0.2,
        z: -800
      }, {
        ease: 'back.out(1.2)',
        opacity: 1,
        z: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    });

    fx19Titles.forEach(title => {

      const chars = title.querySelectorAll('.char');

      chars.forEach(char => gsap.set(char.parentNode, {
        perspective: 1000
      }));

      gsap.fromTo(chars, {
        'will-change': 'opacity, transform',
        transformOrigin: '50% 0%',
        opacity: 0,
        rotationX: -90,
        z: -200
      }, {
        ease: 'power1',
        opacity: 1,
        stagger: 0.05,
        rotationX: 0,
        z: 0,
        scrollTrigger: {
          trigger: title,
          start: 'center bottom',
          end: 'bottom top+=20%',
          scrub: true,
        }
      });

    });

    fx20Titles.forEach(title => {

      const chars = title.querySelectorAll('.char');

      chars.forEach(char => gsap.set(char.parentNode, {
        perspective: 1000
      }));

      gsap.fromTo(chars, {
        'will-change': 'opacity, transform',
        transformOrigin: '50% 100%',
        opacity: 0,
        rotationX: 90
      }, {
        ease: 'power4',
        opacity: 1,
        stagger: {
          each: 0.03,
          from: 'random'
        },
        rotationX: 0,
        scrollTrigger: {
          trigger: title,
          start: 'center bottom',
          end: 'bottom top+=20%',
          scrub: true,
        }
      });

    });

    fx21Titles.forEach(title => {

      const words = [...title.querySelectorAll('.word')];

      for (const word of words) {

        const chars = word.querySelectorAll('.char');

        chars.forEach(char => gsap.set(char.parentNode, {
          perspective: 2000
        }));

        gsap.fromTo(chars, {
          'will-change': 'opacity, transform',
          opacity: 0,
          y: (position, _, arr) => -40 * Math.abs(position - arr.length / 2),
          z: () => gsap.utils.random(-1500, -600),
          rotationX: () => gsap.utils.random(-500, -200)
        }, {
          ease: 'power1.inOut',
          opacity: 1,
          y: 0,
          z: 0,
          rotationX: 0,
          stagger: {
            each: 0.06,
            from: 'center'
          },
          scrollTrigger: {
            trigger: word,
            start: 'top bottom',
            end: 'top top+=15%',
            scrub: true,
          }
        });

      }

    });

    fx22Titles.forEach(title => {

      const words = [...title.querySelectorAll('.word')];

      for (const word of words) {
        const chars = word.querySelectorAll('.char');
        const charsTotal = chars.length;

        chars.forEach(char => gsap.set(char.parentNode, {
          perspective: 1000
        }));

        gsap.fromTo(chars, {
          'will-change': 'transform',
          x: position => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return (charsTotal % 2 ? Math.abs(Math.ceil(charsTotal / 2) - 1 - factor) : Math.abs(Math.ceil(charsTotal / 2) - factor)) * 200 * (position < charsTotal / 2 ? -1 : 1);
          },
          y: position => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return factor * 60;
          },
          rotationY: -270,
          rotationZ: position => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return position < charsTotal / 2 ? Math.abs(factor - charsTotal / 2) * 8 : -1 * Math.abs(factor - charsTotal / 2) * 8;
          }
        }, {
          ease: 'power2.inOut',
          x: 0,
          y: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          scrollTrigger: {
            trigger: word,
            start: 'top bottom+=40%',
            end: 'top top+=15%',
            scrub: true,
          }
        });

      }

    });

    fx23Titles.forEach(title => {

      const words = [...title.querySelectorAll('.word')];

      for (const [wordPosition, word] of words.entries()) {

        gsap.fromTo(word.querySelectorAll('.char'), {
          'will-change': 'transform',
          scale: 0.01,
          x: (pos, _, arr) => {
            return wordPosition % 2 ? pos * 50 : (arr.length - pos - 1) * -50
          }
        }, {
          ease: 'power4',
          scale: 1,
          x: 0,
          scrollTrigger: {
            trigger: word,
            start: 'center bottom',
            end: 'bottom top-=40%',
            scrub: true,
          }
        });

      }

    });

    fx24Titles.forEach(title => {

      const chars = title.querySelectorAll('.char');
      const charsTotal = chars.length;

      gsap.fromTo(chars, {
        'will-change': 'transform',
        y: position => {
          const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
          return (charsTotal / 2 - factor + 6) * 130;
        }
      }, {
        ease: 'elastic.out(.4)',
        y: 0,
        stagger: {
          amount: 0.1,
          from: 'center'
        },
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top-=50%',
          scrub: true,
        }
      });

    });

    fx25Titles.forEach(title => {

      gsap.fromTo(title.querySelectorAll('.char'), {
        'will-change': 'transform',
        transformOrigin: '50% 100%',
        scaleY: 0
      }, {
        ease: 'power3.in',
        opacity: 1,
        scaleY: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: title,
          start: 'center center',
          end: '+=500%',
          scrub: true,
          pin: title.parentNode,
        }
      });

    });

    fx26Titles.forEach(title => {

      const words = [...title.querySelectorAll('.word')];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: 'center center',
          end: '+=100%',
          scrub: true,
          pin: title.parentNode,
        }
      });
      for (const [wordPosition, word] of words.entries()) {
        tl.fromTo(word.querySelectorAll('.char'), {
          'will-change': 'transform',
          transformOrigin: () => !wordPosition % 2 ? '50% 0%' : '50% 100%',
          scaleY: 0
        }, {
          ease: 'power1.inOut',
          scaleY: 1,
          stagger: {
            amount: 0.3,
            from: 'center'
          }
        }, 0);

      }

    });

    fx27Titles.forEach(title => {

      const words = [...title.querySelectorAll('.word')];

      words.forEach(word => gsap.set(word.parentNode, {
        perspective: 1000
      }));

      gsap.fromTo(words, {
        'will-change': 'opacity, transform',
        z: () => gsap.utils.random(500, 950),
        opacity: 0,
        xPercent: (pos) => gsap.utils.random(-100, 100),
        yPercent: (pos) => gsap.utils.random(-10, 10),
        rotationX: () => gsap.utils.random(-90, 90)
      }, {
        ease: 'expo',
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        xPercent: 0,
        yPercent: 0,
        z: 0,
        scrollTrigger: {
          trigger: title,
          start: 'center center',
          end: '+=300%',
          scrub: true,
          pin: title.parentNode,
        },
        stagger: {
          each: 0.006,
          from: 'random'
        }
      });

    });

    fx28Titles.forEach(title => {

      const words = [...title.querySelectorAll('.word')];

      for (const word of words) {

        const chars = word.querySelectorAll('.char');
        const charsTotal = chars.length;

        gsap.fromTo(chars, {
          'will-change': 'transform, filter',
          transformOrigin: '50% 100%',
          scale: position => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0.5, 2.1, factor);
          },
          y: position => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 60, factor);
          },
          rotation: position => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return position < charsTotal / 2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 4, factor);
          },
          filter: 'blur(12px) opacity(0)',
        }, {
          ease: 'power2.inOut',
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'blur(0px) opacity(1)',
          scrollTrigger: {
            trigger: word,
            start: 'top bottom+=40%',
            end: 'top top+=15%',
            scrub: true,
          },
          stagger: {
            amount: 0.15,
            from: 'center'
          }
        });

      }

    });

    fx29Titles.forEach(title => {

      const words = [...title.querySelectorAll('.word')];

      for (const [pos, word] of words.entries()) {

        const chars = word.querySelectorAll('.char');

        gsap.fromTo(chars, {
          'will-change': 'transform',
          transformOrigin: `${pos%2 ? 0 : 100}% ${pos%2 ? 100 : 0}%`,
          scale: 0
        }, {
          ease: 'power4',
          scale: 1,
          stagger: {
            each: 0.03,
            from: pos % 2 ? 'end' : 'start'
          },
          scrollTrigger: {
            trigger: word,
            start: 'top bottom-=10%',
            end: 'top top',
            scrub: true,
          }
        });
      }

    });
  };

  window.addEventListener("load", () => {
    scroll();
  });
}
page7()

/////////////////////////////////////////////////////end page7

function page8() {
  gsap.to("[data-direct]", {
    //속성 중에 data-direct이 있는 것들 모두 다 호출 된다.
    x: (i, el) => -(el.getAttribute("data-direct")) * 400,
    //el은 data-direct 속성을 가지고 있는 요소들을 하나씩 받아옴//i 인덱스 번호
    ease: "none",
    scrollTrigger: {
      trigger: ".text_wrap",
      start: "top 60%",
      end: "top top",
      duration: 2,
      scrub: 2

    }

  })
}
page8()


/////////////////////////////////////////////////////end page8

function page9() {
  let innerSliderOne = document.querySelector(".slider-inner-one");
  let innerSliderTwo = document.querySelector(".slider-inner-two");
  let images = document.querySelectorAll("#page9 .img");
  let current = 0; //현재위치
  let target = 0; //스크롤탑값
  let ease = 0.075;
  let imageItems = [];
  let stop;

  images.forEach((image) => {
    imageItems.push(image);
  });

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function transformElement(el, transform) {
    el.style.transform = transform;
  }

  function animate() {
    target = window.scrollY;
    //console.log(target);
    current = lerp(current, target, ease); //lerp(100,150,0.075)
    //console.log(current);
    for (let i = 0; i < imageItems.length; i++) {
      if (current < target - 50 || current > target + 50) {
        transformElement(imageItems[i], `scale(0.8)`)
      } else {
        transformElement(imageItems[i], `scale(1)`)
      }
    }
  }

  //가로스크롤
  gsap.to(
    innerSliderOne, {
      xPercent: -50,
      ease: "none",
      delay: 1,
      scrollTrigger: {
        trigger: "#page9",
        start: "top top",
        scrub: 1,
        end: "+=200%",
        pin: true,
        onUpdate: (self) => {
          // self.progress는 ScrollTrigger의 현재 진행 상태입니다.
          gsap.to(innerSliderTwo, {
            xPercent: -67 * self.progress,
            ease: "none",
          });
        },
        onEnter: function ani() {
          animate();
          stop = requestAnimationFrame(ani);
        },
        onLeaveBack: () => {
          cancelAnimationFrame(stop)
        }
      },
    },
    0
  );



}
page9()

/////////////////////////////////////////////////////end page9

function page10() {
  function about() {
    gsap.from(".about__img", {
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        scrub: 1.9
      },
      yPercent: 80

    })

    gsap.from(".about__img img", {
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        scrub: 1.9
      },
      scale: 1.6

    })

    gsap.to(".about__txt", {
      scrollTrigger: {
        trigger: ".about__wrapp",
        start: "top bottom",
        scrub: 1.9
      },
      yPercent: 50

    })

    //각영역의 제목부분의 사각도형
    let gsapSq = document.querySelectorAll(".section-title__square")
    gsapSq.forEach(function (gSq, i) {
      let rotate = gsap.from(gSq, {
        duration: 3,
        rotation: 720
      })
      ScrollTrigger.create({
        trigger: gSq,
        start: "top bottom",
        scrub: 1.9,
        animation: rotate
      })
    })



  }
  about();
}
page10()

/////////////////////////////////////////////////////end page10

function page11() {
  let cardWrapper = document.querySelectorAll(".cards_item");
  let cardsEl = document.querySelectorAll(".cards_item .cards_el");

  cardWrapper.forEach(function (e, i) { // e: 아이템 , i: 아이템의 인덱스 번호
    let card = cardsEl[i]
    let img = e.querySelector(".cards_img img");
    let scale = 1;
    let rotate = 0;

    if (i !== cardsEl.length - 1) {
      scale = 0.9 + 0.025 * 1;
      rotate = -10;
    }

    gsap.to(card, {
      scale: scale,
      rotateX: rotate,
      transfromOrigin: "center top",
      ease: "none",
      scrollTrigger: {
        trigger: e,
        start: "top " + (100 + 40 * i), //아이템의 각각마다 다름
        pin: e,
        scrub: 1,
        pinSpacing: false,
        end: "bottom +=650px", //아이템의 바닥이 end-anim의 650px에 도착하면
        endTrigger: ".end-anim" //pin이 안잡힐때 다른 것을 기준으로  
      }
    })
  })
}
page11()

/////////////////////////////////////////////////////end page11


function page16() {
  gsap.timeline({
      scrollTrigger: {
        trigger: '.sec02',
        start: "top 50%",
        end: "30% top",
        scrub: 2,
      }
    })
    .fromTo(".sec02 .circle_16", {
      width: 0,
      height: 0,
      top: '10%'
    }, {
      width: 2500,
      height: 2500,
      top: '20%'
    })


  //textBox
  gsap.timeline({
      scrollTrigger: {
        trigger: '.sec02 .textBox',
        start: "top 80%",
        end: "100% 80%",
        scrub: 2,
      }
    })
    .fromTo(".textBox", {
      top: "80%",
      opacity: 0
    }, {
      top: "50%",
      opacity: 1
    })
}
page16()

/////////////////////////////////////////////////////end page16


function page17() {
  // use a script tag or an external JS file
  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
    // gsap code here!



    //이미지 애니
    let items = document.querySelectorAll(".anime-list li");
    items.forEach(function (el) {
      gsap.set(".hover-img", {
        xPercent: -50,
        yPercent: -50
      })
      let image = el.querySelector(".hover-img")
      let innerImage = el.querySelector(".hover-img img")
      let pos = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
      let mouse = {
        x: pos.x
      }
      let speed = 0.1;
      let xSet = gsap.quickSetter(image, "x", "px") // 

      window.addEventListener("mousemove", function (e) {
        // console.log(e.x)
        mouse.x = e.x;
      })
      gsap.ticker.add(function () { //requestAnimationFrame()
        // console.log(gsap.ticker.deltaRatio())
        let dt = 1.0 - Math.pow((1.0 - speed), gsap.ticker.deltaRatio())
        // 인터넷이 어떤 환경이라도 부드럽게 이용 가능하게 만드는 것.
        pos.x += (mouse.x - pos.x) * dt
        xSet(pos.x)
      })

      let direction = "",
        oldx = 0,
        lastCursorX = null,
        cursorThreshold = 150;

      let mousemovemethod = function (e) {
        if (e.pageX < oldx && e.clientX <= lastCursorX - cursorThreshold) {
          direction = "left"
          lastCursorX = e.clientX;
          innerImage.style.transform = "rotate(-15deg)"
        } else if (e.pageX > oldx && e.clientX >= lastCursorX + cursorThreshold) {
          direction = "right"
          lastCursorX = e.clientX;
          innerImage.style.transform = "rotate(15deg)"
        }
        oldx = e.pageX
      }

      let mouseMoveTimer; // 마우스가 멈출때를 감시하는 변수

      document.addEventListener("mousemove", function () {
        // setTimeout(할일, 시간) 시간 뒤에 함수 실행
        // setTimeout을 멈추고 싶을 떄  -> 변수에 할당
        // 변수=setTimeout(할일(함수),시간)
        // clearTimeout(변수) -> 멈추는 명령

        clearTimeout(mouseMoveTimer) // 기존 타이머를 지움
        mouseMoveTimer = setTimeout(function () {
          innerImage.style.transform = "translateX(0%) rotate(0deg)"
        }, 100)
      })

      document.addEventListener("mousemove", mousemovemethod)

    })




    // gsap.quickSetter 호출: gsap.quickSetter 메서드를 호출하여 특정 DOM 요소의 특정 CSS 속성을 신속하게 설정할 수 있는 함수를 만듭니다.

    // quickSetter(image,"x","px")image 변수의 x값을 (단위는 px) 신속하게 설정
    // xSet(100)을 호출하면 image 요소의 수평 위치가 100 픽셀로 설정됩니다

    // function ani(){
    //     console.log("애니메이션")
    //     requestAnimationFrame(ani)  //setInterval의 진화된 버전
    // }
    // ani()

    //  gsap.ticker.add()


    // 애니메이션 프레임마다 특정 요소의 속성을 업데이트하거나, 사용자 인터랙션을 실시간으로 처리하는 등의 다양한 활용이 가능합니다.


    // 🍇🍇🍇  gsap.ticker.deltaRatio()에 대해
    //GSAP (GreenSock Animation Platform)는 자바스크립트를 사용하여 웹 애니메이션을 만들기 위한 도구입니다. GSAP의 ticker는 애니메이션의 프레임 업데이트를 관리하는 메커니즘입니다. gsap.ticker.deltaRatio()는 프레임 간의 시간 변화를 비율로 반환하는 함수입니다. 이를 통해 애니메이션이 프레임 속도에 관계없이 일정하게 작동하도록 할 수 있습니다.

    // 쉽게 말해, deltaRatio()는 이전 프레임과 현재 프레임 사이의 시간 차이를 기준으로 값을 반환합니다. 이 값은 보통 1에 가까운데, 이것은 정상적인 프레임 속도(예: 60fps)에서의 값입니다. 만약 프레임 속도가 떨어지거나 증가하면, 이 값은 1보다 크거나 작아집니다. 이를 활용하여 애니메이션 속도를 프레임 속도에 맞춰 자동으로 조절할 수 있습니다.

    // 예를 들어, 애니메이션을 실행하는 동안 컴퓨터가 느려져서 프레임 속도가 떨어지면, deltaRatio()는 1보다 큰 값을 반환합니다. 이를 이용해 애니메이션의 움직임을 조정하여 일관된 시각적 효과를 유지할 수 있습니다.





    // 글자 애니
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26
    let interval = null;
    let list = document.querySelectorAll(".anime-list li")

    // console.log(list)
    list.forEach(function (el) {
      // el.onmouseenter=function(){} = el.addEventListener("mouseenter",function(){})   
      el.addEventListener("mouseenter", function (event) {
        let target_element = event.target.querySelector("h2")
        //이벤트를 받는 요소중에 가장 하위 요소

        let iteration = 0;

        // setInterval(할일,시간) //시간마다 할 일
        // setInterval을 멈추고 싶다면 setInterval를 변수에 할당
        // let interval=setInterval(할일,시간)
        // 멈출때 clearInterval(변수) // clearInterval(interval)

        // console.log(target_element.innerText)
        // target_element.innerText="메롱"
        // console.log(target_element.dataset.value[0])
        // .map(function(it){
        //     return          -> map 함수는 배열안에 요소를 하나씩 불러서 할일 //새로운 배열을 만든다. //item은 그 요소의 index 번호
        // })

        // console.log(Math.random())// 0 이상 1미만 사이의 부동 소수의 숫자를 뽑아줌.

        let interval = setInterval(function () {
          target_element.innerText = target_element.innerText
            .split("") //배열이 만들어짐
            .map(function (letter, index) { // 위의 배열의 각각의 item의 할 일
              if (index < iteration) {
                return target_element.dataset.value[index]
              }
              return letters[Math.floor(Math.random() * 26)] // 랜덤 
            })
            .join("") //글자화 시키는 것

          if (iteration >= target_element.dataset.value.length) {
            clearInterval(interval)
          }

          iteration += 0.3; // iteration = iteration + 0.3
        }, 20)

      })
    })
  });


}
page17()

/////////////////////////////////////////////////////end page17

function page18() {
  const getHeight = el => {
    const computedStyle = getComputedStyle(el);

    let elementHeight = el.clientHeight; // height with padding
    elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    return elementHeight;
  }
  class RepeatTextScrollFx {
    DOM = {
      el: null,
      words: null,
    }
    totalWords = 9;
    tyIncrement = 14;
    delayIncrement = 0.08;
    scrollTimeline;
    observer;


    constructor(Dom_el) {
      this.DOM.el = Dom_el;
      this.layout();
      this.setBoundaries();
      this.createScrollTimeline();
      this.createObserver();

      window.addEventListener('resize', () => this.setBoundaries());
    }

    layout() {
      const halfWordsCount = Math.floor(this.totalWords / 2);
      let innerHTML = '';

      for (let i = 0; i < this.totalWords; ++i) {

        let ty;
        let delay;

        if (i === this.totalWords - 1) {
          ty = 0;
          delay = 0;
        } else if (i < halfWordsCount) {
          ty = halfWordsCount * this.tyIncrement - this.tyIncrement * i;
          delay = this.delayIncrement * (halfWordsCount - i) - this.delayIncrement

        } else {
          ty = -1 * (halfWordsCount * this.tyIncrement - (i - halfWordsCount) * this.tyIncrement);
          delay = this.delayIncrement * (halfWordsCount - (i - halfWordsCount)) - this.delayIncrement
        }

        innerHTML += `<span data-delay="${delay}" data-ty="${ty}">${this.DOM.el.innerHTML}</span>`;
      }

      this.DOM.el.innerHTML = innerHTML;
      this.DOM.el.classList.add('text-rep');

      this.DOM.words = [...this.DOM.el.querySelectorAll('span')].slice(0, -1);
    }

    setBoundaries() {
      // Set up the margin top and padding bottom values
      const paddingBottomMarginTop = getHeight(this.DOM.el) * Math.floor(this.totalWords / 2) * this.tyIncrement / 100;
      gsap.set(this.DOM.el, {
        marginTop: paddingBottomMarginTop,
        paddingBottom: paddingBottomMarginTop
      });
    }

    createScrollTimeline() {
      this.scrollTimeline = gsap.timeline({
          paused: true
        })

        .to(this.DOM.words, {
          duration: 1,
          ease: 'none',
          startAt: {
            opacity: 0
          },
          opacity: 1,
          yPercent: (_, target) => target.dataset.ty,
          delay: (_, target) => target.dataset.delay
        }, 0)
        .to(this.DOM.words, {
          duration: 1,
          ease: 'none',
          opacity: 0,
          yPercent: 0,
          delay: (_, target) => target.dataset.delay
        });
    }

    createObserver() {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0
      };


      this.observer = new IntersectionObserver(entry => {
        if (entry[0].intersectionRatio > 0) {

          if (!this.isLoaded) {
            this.isLoaded = true;
          }
          gsap.ticker.add(this.progressTween);

        } else {

          if (this.isLoaded) {
            gsap.ticker.remove(this.progressTween);
          } else {
            this.isLoaded = true;
            // add and remove immediately
            gsap.ticker.add(this.progressTween, true);
          }

        }
      }, observerOptions);

      this.progressTween = () => {
        // Get scroll distance to bottom of viewport.
        const scrollPosition = (window.scrollY + window.innerHeight);
        // Get element's position relative to bottom of viewport.
        const elPosition = (scrollPosition - this.DOM.el.offsetTop);
        // Set desired duration.
        const durationDistance = (window.innerHeight + this.DOM.el.offsetHeight);
        // Calculate tween progresss.
        const currentProgress = (elPosition / durationDistance);
        // Set progress of gsap timeline.
        this.scrollTimeline.progress(currentProgress);
      }

      this.observer.observe(this.DOM.el);
    }
  }

  window.addEventListener("load", () => {

    // Apply the effect on these elements
    document.querySelectorAll('[data-text-rep]').forEach(textEl => {
      new RepeatTextScrollFx(textEl);
    });


  });
}
page18()

/////////////////////////////////////////////////////end page18

function page19() {
  function LandingPageScrollTrigger() {

    gsap.to('#page19', { // LoadingAnimation---------------------
      opacity: 1,
      duration: 1.3,
    }) // /LoadingAnimation---------------------



    let LandingPageScrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: "#ImgWrapper",
        start: "0% 0%",
        end: "100% 0%",
        pin: "#ImgWrapper",
        scrub: 2.2,
      }
    })
    LandingPageScrollTrigger
      .to('#ImgWrapper #img7', {
        transform: 'translateZ(4500px)',
      }, 0)
      .to('#ImgWrapper #img6', {
        transform: 'translateZ(3700px)',
      }, 0)
      .to('#ImgWrapper #img5', {
        transform: 'translateZ(3100px)',
      }, 0)
      .to('#ImgWrapper #img4', {
        transform: 'translateZ(2800px)',
      }, 0)
      .to('#ImgWrapper #img3', {
        transform: 'translateZ(2600px)',
      }, 0)
      .to('#ImgWrapper #img2', {
        transform: 'translateZ(2400px)',
      }, 0)
      .to('#ImgWrapper #img1', {
        transform: 'translateZ(2200px)',
      }, 0)
      .from('#codeby', {
        y: 130,
        opacity: 0
      }, 0.31)
  }
  //---------------------/Landing Page ScrollTrigger---------------------

  window.onload = () => {
    LandingPageScrollTrigger()
  }
}
page19()


function page19_B() {

  /**
   * @constructor
   */
  var Clock = function () {
    /**
     * @type {Clock}
     */
    var me = this;

    var config = {
      starCount: 500,
      showFps: true,
      drawDigital: true,
      star: {
        minOpacity: 0.1,
        fade: true,
        fadeSpeed: 0.02,
        color: '#0a0'
      },
      hour: {
        foreground: '#aaa',
        background: '#111',
        width: 3,
      },
      minute: {
        foreground: '#aaa',
        background: '#111',
        width: 3,
      },
      second: {
        foreground: '#aaa',
        background: '#111',
        width: 3,
      },
      milli: {
        foreground: 'rgba(0,0,0,0.1)',
        background: '#111',
        width: 3,
      }
    }

    /**
     * @type {Element}
     */
    var canvas = document.createElement('canvas');

    /**
     * @type {CanvasRenderingContext2D}
     */
    var engine = canvas.getContext('2d');

    /**
     * requestor
     * @type {*|Function}
     */
    var frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (cb) {
      return setTimeout(cb, 30)
    };

    /**
     * @type {{}}
     */
    var star = [];

    /**
     *
     * @type {number}
     */
    var size = 0.9;

    /**
     * @type {number}
     */
    var radius = size / 2;

    /**
     * @type {Date}
     */
    var current = null;

    /**
     * @type {{refresh: number, tick: number, start: Date}}
     */
    var fps = {
      val: 0,
      refresh: 50,
      tick: 0,
      start: new Date()
    };

    /**
     * @type {{width: number, height: number, size: number, radius: number, middle: number}}
     */
    var meta = {
      width: 0,
      height: 0,
      size: 0,
      radius: 0,
      middle: 0
    };

    /**
     * init
     */
    this.run = function () {
      generateStar();
      document.querySelector("#codeby").appendChild(canvas);

      canvas.setAttribute('width', window.innerWidth);
      canvas.setAttribute('height', window.innerHeight);

      frame(tick);
    };

    /**
     * render frame
     */
    var tick = function () {
      current = new Date();
      solveMeta();

      engine.fillStyle = 'transparent';
      engine.clearRect(0, 0, meta.width, meta.height);
      engine.fillRect(0, 0, meta.width, meta.height);

      //draw part
      drawFps();
      drawStar();

      drawBackgroundTime();
      drawPattern();
      drawForegroundTime();

      drawDigital();

      frame(tick);
    };

    /**
     * draw digital watch
     */
    var drawDigital = function () {
      if (config.drawDigital) {
        var time = [
          n(current.getHours()),
          current.getSeconds() % 2 ? ':' : ' ',
          n(current.getMinutes())
        ].join('');

        var size = 30;
        var padding = 10;
        engine.font = size + 'px Arial';
        var m = engine.measureText(time);

        //engine.fillStyle = 'rgba(0,0,0,0.5)';
        //engine.fillRect(
        //    meta.middle.x - m.width / 2 - padding,
        //    meta.middle.y - size / 2 - padding,
        //    m.width + padding * 2,
        //    size + padding * 2
        //);

        engine.fillStyle = '#fff';
        engine.fillText(
          time,
          meta.middle.x - m.width / 2,
          meta.middle.y + size / 2
        );
      }
    };

    /**
     * @param ne
     * @returns {*}
     */
    var n = function (ne) {
      if (ne < 10) {
        return '0' + ne;
      }

      return ne;
    };

    /**
     * draw lines for evers hour and minute
     */
    var drawPattern = function () {
      //#1
      engine.strokeStyle = 'rgba(255,255,255,0.2)';
      engine.lineWidth = 2;

      engine.beginPath();
      engine.arc(meta.middle.x, meta.middle.y, meta.radius * 0.8 - meta.radius / 12, 0, Math.PI * 2);
      engine.stroke();
      engine.closePath();

      //#1.5
      engine.strokeStyle = 'rgba(255,255,255,0.2)';
      engine.beginPath();
      engine.arc(meta.middle.x, meta.middle.y, meta.radius * 0.8 + meta.radius / 12, 0, Math.PI * 2);
      engine.stroke();
      engine.closePath();

      //#2
      engine.strokeStyle = 'rgba(0,0,0,0.5)';
      engine.lineWidth = meta.radius / 6;

      engine.beginPath();
      engine.arc(meta.middle.x, meta.middle.y, meta.radius * 0.8, 0, Math.PI * 2);
      engine.stroke();
      engine.closePath();


      var angleWidth = Math.PI * 2 / 60;
      var seconds = current.getSeconds() + current.getMilliseconds() / 1000;

      for (var i = 0; i < 60; i++) {
        var angleMid = i * angleWidth - 0.5 * Math.PI;
        var startAngle = angleMid - Math.PI / 500;
        var endAngle = angleMid + Math.PI / 500;

        //var opa = (60 - seconds + i - 1) % 60;
        //
        //engine.strokeStyle = 'rgba(' + [255, 255, 255, opa / 60].join(',') + ')';

        if (i === parseInt(seconds)) {
          engine.strokeStyle = '#0a0';
        } else {
          var opa = 1 - Math.min(
            Math.abs(i - 60 - seconds),
            Math.abs(i - seconds),
            Math.abs(i + 60 - seconds)
          ) / 15;

          engine.strokeStyle = 'rgba(' + [255, 255, 255, opa].join(',') + ')';
        }


        engine.lineWidth = meta.radius / 20;

        engine.beginPath();
        engine.arc(meta.middle.x, meta.middle.y, meta.radius * 0.8, startAngle, endAngle);
        engine.stroke();
        engine.closePath();
      }

      angleWidth = Math.PI * 2 / 12;

      for (var i = 0; i < 12; i++) {
        var angleMid = i * angleWidth - 0.5 * Math.PI;
        var startAngle = angleMid - Math.PI / 200;
        var endAngle = angleMid + Math.PI / 200;

        engine.strokeStyle = 'rgba(255,255,255,0.6)';
        engine.lineWidth = meta.radius / 7;

        engine.beginPath();
        engine.arc(meta.middle.x, meta.middle.y, meta.radius * 0.75, startAngle, endAngle);
        engine.stroke();
        engine.closePath();
      }
    }

    /**
     * draw background clock
     */
    var drawBackgroundTime = function () {
      drawBackgroundTimePart(meta.radius / 3 + 20, current.getHours() + current.getMinutes() / 60, 12, config.hour);
      drawBackgroundTimePart(meta.radius * 0.65 + 20, current.getMinutes() + current.getSeconds() / 60, 60, config.minute);
      drawBackgroundTimePart(meta.radius + 20, current.getSeconds() + current.getMilliseconds() / 1000, 60, config.second);
    };

    /**
     * draw foreground clock
     */
    var drawForegroundTime = function () {
      drawTimePart(meta.radius / 3, current.getHours() + current.getMinutes() / 60, 12, config.hour);
      drawTimePart(meta.radius * 0.65, current.getMinutes() + current.getSeconds() / 60, 60, config.minute);
      drawTimePart(meta.radius, current.getSeconds() + current.getMilliseconds() / 1000, 60, config.second);

      drawTimePart(meta.radius / 15, current.getMilliseconds(), 1000, config.milli, true);
      drawTimePart(meta.radius / 15, current.getMilliseconds() + 250, 1000, config.milli, true);
      drawTimePart(meta.radius / 15, current.getMilliseconds() + 500, 1000, config.milli, true);
      drawTimePart(meta.radius / 15, current.getMilliseconds() + 750, 1000, config.milli, true);
    };

    /**
     * draw bg time part
     *
     * @param {number} radius
     * @param {number} time
     * @param {number} maxTime
     * @param {{}} config
     */
    var drawBackgroundTimePart = function (radius, time, maxTime, config) {
      engine.globalAlpha = 0.5;

      var angleWidth = Math.PI * 2 / maxTime;
      var angleMid = time * angleWidth - 0.5 * Math.PI;
      var startAngle = angleMid - Math.PI / 1.5;
      var endAngle = angleMid + Math.PI / 1.5;

      engine.fillStyle = config.background;

      //### 1
      var grd = engine.createRadialGradient(meta.middle.x, meta.middle.y, radius / 2, meta.middle.x, meta.middle.y, radius);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, config.background);
      engine.fillStyle = grd;

      engine.beginPath();
      engine.moveTo(meta.middle.x, meta.middle.y);
      engine.arc(meta.middle.x, meta.middle.y, radius, startAngle, endAngle);
      engine.fill();
      engine.closePath();

      //### 2
      grd = engine.createRadialGradient(meta.middle.x, meta.middle.y, radius / 2, meta.middle.x, meta.middle.y, radius);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,200,0,0.5)');
      engine.fillStyle = grd;

      engine.beginPath();
      engine.moveTo(meta.middle.x, meta.middle.y);
      engine.arc(meta.middle.x, meta.middle.y, radius, startAngle + Math.PI / 2, endAngle - Math.PI / 2);
      engine.fill();
      engine.closePath();

      engine.globalAlpha = 1;
    }

    /**
     * draw time part
     *
     * @param {number} radius
     * @param {number} time
     * @param {number} maxTime
     * @param {{}} config
     */
    var drawTimePart = function (radius, time, maxTime, config, anti) {
      var angleWidth = Math.PI * 2 / maxTime;
      var angleMid = time * angleWidth - 0.5 * Math.PI;
      var length = 8;

      if (anti) {
        angleMid = 0 - angleMid;
        length = 8;
      }

      var startAngle = angleMid - Math.PI / length;
      var endAngle = angleMid + Math.PI / length;

      engine.strokeStyle = config.foreground;
      engine.lineWidth = config.width;

      engine.beginPath();
      engine.arc(meta.middle.x, meta.middle.y, radius - config.width, startAngle, endAngle);
      engine.stroke();
      engine.closePath();


      if (!anti) {
        engine.strokeStyle = '#fff';
        engine.lineWidth = 20;

        engine.beginPath();
        engine.arc(meta.middle.x, meta.middle.y, radius, angleMid - 0.01, angleMid + 0.01);
        engine.stroke();
        engine.closePath();
      }
    }

    /**
     * solve and render fps
     */
    var drawFps = function () {
      if (config.showFps) {
        fps.tick--;

        if (fps.tick <= 0) {
          var diffTime = (new Date() - fps.start) / 1000;
          fps.val = parseInt(fps.refresh / diffTime * 10) / 10;
          fps.start = new Date();
          fps.tick = fps.refresh;
        }

        engine.font = '10px Arial';
        engine.fillStyle = '#fff';
        engine.fillText(fps.val + ' fps | ' + [
          n(current.getHours()),
          current.getSeconds() % 2 ? ':' : ' ',
          n(current.getMinutes()),
          current.getSeconds() % 2 ? ':' : ' ',
          n(current.getSeconds())
        ].join(''), 5, meta.height - 5);
      }
    }

    /**
     * generate Star line setup
     */
    var generateStar = function () {
      for (var i = 0; i < config.starCount; i++) {
        star.push({
          width: Math.random(),
          deg: Math.random() * 360,
          color: Math.random(),
          colorDir: Math.random() < 0.5 ? config.star.fadeSpeed : -config.star.fadeSpeed
        });
      }
    }

    /**
     * height of canvas
     * @returns {string}
     */
    var width = function () {
      return canvas.getAttribute('width');
    }

    /**
     * height of canvas
     * @returns {string}
     */
    var height = function () {
      return canvas.getAttribute('height');
    }

    /**
     * get mid coords from the clock
     * @returns {{x: number, y: number}}
     */
    var middle = function () {
      return {
        x: width() / 2,
        y: height() / 2
      };
    }

    /**
     * cache size properties
     */
    var solveMeta = function () {
      meta.width = width();
      meta.height = height();
      meta.radius = Math.min(meta.width, meta.height) * radius;
      meta.size = Math.min(meta.width, meta.height);
      meta.middle = middle();
    }

    /**
     * draw clock star lines
     */
    var drawStar = function () {
      engine.strokeStyle = config.star.color;

      for (var i = 0; i < star.length; i++) {
        var starLine = star[i];
        var relX = Math.sin(starLine.deg / 360 * Math.PI * 2);
        var relY = Math.cos(starLine.deg / 360 * Math.PI * 2);

        engine.beginPath();

        engine.moveTo(
          meta.middle.x,
          meta.middle.y
        );

        engine.lineTo(
          meta.middle.x + relX * starLine.width * meta.radius,
          meta.middle.y + relY * starLine.width * meta.radius
        );

        engine.lineWidth = parseInt((1 - starLine.width) * 5);

        if (config.star.fade) {
          engine.globalAlpha = config.star.minOpacity + (1 - config.star.minOpacity) * starLine.color;
          starLine.color += starLine.colorDir;

          if (starLine.color >= 1 || starLine.color <= 0) {
            starLine.color = starLine.color | 0;
            starLine.colorDir = -starLine.colorDir;
          }
        }

        engine.stroke();
        engine.closePath();
      }

      engine.globalAlpha = 1;
    }
  };

  var c = new Clock();
  c.run();


}
page19_B()

/////////////////////////////////////////////////////end page19

function page20() {
  VANTA.TRUNK({
    el: "#your-element-selector",
    mouseControls: false,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 2.00,
    scaleMobile: 1.00,
    spacing: 7.0,
    chaos: 13.00,
    color: 0x458b96,
    backgroundColor: "transparent"
  })
}
page20()

function page20_a() {
  gsap.to(".header__marq-wrapp", {
    scrollTrigger: {
      trigger: "#page20",
      start: "top bottom",
      scrub: 1.9
    },
    xPercent: -50

  })
  gsap.to(".header__marq-star", {
    scrollTrigger: {
      trigger: "#page20",
      start: "top bottom",
      scrub: 1.9
    },
    //rotation:-720
    rotate: -720

  })
}
page20_a()

/////////////////////////////////////////////////////end page20

function page21(){
  const svg = document.querySelector('.svg_21 svg')
const paths = document.querySelectorAll('defs path')
const shapes = []

for (let i = 0; i < 20; i++) {
    const shape = paths[gsap.utils.random(0, 2, 1)].cloneNode()
    shapes.push(shape)
    svg.append(shape)
}

function draw() {
    shapes.forEach((shape, i) => {
        gsap.timeline({
                defaults: {
                    overwrite: 'auto'
                }
            })
            .fromTo(shape, {
                attr: {
                    'vector-effect': 'non-scaling-stroke'
                },
                drawSVG: 0
            }, {
                duration: 3,
                ease: 'sine.inOut',
                drawSVG: '0 100%'
            }, i / 10)
            .fromTo(shape, {
                transformOrigin: '50%',
                scale: 'random(0.2,0.6)',
                rotate: 'random(0,360)',
                x: () => (innerWidth + 300) * Math.random() - 300,
                y: () => innerHeight * Math.random() - 300
            }, {
                duration: 'random(5,10)',
                ease: 'bounce',
                y: '+=' + 'random(250,500)',
                rotate: 'random(-180,180)'
            }, i / 10)
            .fromTo(shape, {
                attr: {
                    fill: 'rgba(0,0,0,0)'
                }
            }, {
                duration: 1,
                ease: 'power1.inOut',
                attr: {
                    fill: 'rgba(0,0,0,1)'
                }
            }, i / 10 + 1)
    })

    gsap.delayedCall(9, draw)
}

// window.onclick = window.onresize = draw
draw()
}
page21()

gsap.to(".page2_f .card",{
  scrollTrigger:{
    trigger:"#page20",
    start:"center center",
    toggleClass:'active'
    
  }
})


/////////////////////////////////////////////////////end page21
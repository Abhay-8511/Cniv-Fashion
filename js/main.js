const cards = document.querySelectorAll(".floating");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;

    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    cards.forEach((card, index) => {

        card.style.transform = `translate(${x * (index + 1)}px, ${y * (index + 1)}px)`;

    });

});

/* Bento Tilt Effect */

document.querySelectorAll(".card").forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

const featureCards=document.querySelectorAll(".feature-card");

featureCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

featureCards.forEach(c=>c.classList.remove("active"));

card.classList.add("active");

});

});

/* Product Hover Glow */

document.querySelectorAll(".product-image").forEach((image)=>{

image.addEventListener("mousemove",(e)=>{

const rect=image.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

image.style.background=`
radial-gradient(circle at ${x}px ${y}px,
rgba(59,130,246,.18),
rgba(255,255,255,.05) 55%)
`;

});

image.addEventListener("mouseleave",()=>{

image.style.background="rgba(255,255,255,.05)";

});

});

/* Factory Tilt */

document.querySelectorAll(".factory-item").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.transform=`
perspective(900px)
rotateX(${-(y-rect.height/2)/35}deg)
rotateY(${(x-rect.width/2)/35}deg)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(900px) rotateX(0) rotateY(0)";

});

});
/* Portfolio Filter */

const filterButtons = document.querySelectorAll(".portfolio-filter button");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});

/* Portfolio Tilt */

document.querySelectorAll(".portfolio-item").forEach(item=>{

item.addEventListener("mousemove",(e)=>{

const rect=item.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=-(y-rect.height/2)/30;

const rotateY=(x-rect.width/2)/30;

item.style.transform=`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

item.addEventListener("mouseleave",()=>{

item.style.transform="perspective(900px) rotateX(0) rotateY(0)";

});

});

/*================================*/
/* Testimonial Slider */
/*================================*/

const slides=document.querySelectorAll(".testimonial-card");

let current=0;

function showSlide(index){

slides.forEach((slide,i)=>{

slide.style.display=i===index?"block":"none";

});

}

showSlide(current);

document.querySelector(".next").onclick=()=>{

current=(current+1)%slides.length;

showSlide(current);

};

document.querySelector(".prev").onclick=()=>{

current=(current-1+slides.length)%slides.length;

showSlide(current);

};

/*================================*/
/* Counter Animation */
/*================================*/

const counters=document.querySelectorAll(".counter");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

let count=0;

const speed=target/120;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count).toLocaleString();

requestAnimationFrame(update);

}else{

counter.innerText=target.toLocaleString()+"+";

}

};

update();

observer.unobserve(counter);

}

});

});

counters.forEach(counter=>observer.observe(counter));

/*================================*/
/* FAQ */
/*================================*/

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

const question=item.querySelector(".faq-question");

question.onclick=()=>{

faqItems.forEach(f=>{

if(f!==item){

f.classList.remove("active");

}

});

item.classList.toggle("active");

};

});
/*===============================*/
/* Back To Top */
/*===============================*/

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.className="top-btn";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

topButton.style.opacity=window.scrollY>600?1:0;

});

topButton.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/*================================*/
/* Mobile navigation */
/*================================*/
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

if(navToggle){
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navbar.classList.toggle('active');
    });
}

const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.18 });

sections.forEach(section => sectionObserver.observe(section));

/*===============================*/
/* Scroll Progress */
/*===============================*/

const progress=document.createElement("div");

progress.className="progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const percent=window.scrollY/total;

progress.style.width=percent*100+"%";

});
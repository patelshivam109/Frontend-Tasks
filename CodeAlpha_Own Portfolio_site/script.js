

const text="Full Stack Developer & AI Enthusiast Building Real-World Solutions";
let i=0;
function typeEffect(){
    if(i<text.length){
        document.getElementById("typing").innerHTML+=text.charAt(i);
        i++;
        setTimeout(typeEffect,60);
    }
}
typeEffect();

function scrollToSection(id){
    document.getElementById(id).scrollIntoView({behavior:"smooth"});
}


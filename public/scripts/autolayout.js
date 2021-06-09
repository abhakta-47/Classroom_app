// Area:
function Area(Increment, Count, Width, Height, Margin = 10) {
    let i = w = 0;
    let h = Increment * 0.75 + (Margin * 2);
    while (i < (Count)) {
        if ((w + Increment) > Width) {
            w = 0;
            h = h + (Increment * 0.75) + (Margin * 2);
        }
        w = w + Increment + (Margin * 2);
        i++;
    }
    if (h > Height) return false;
    else return Increment;
}
// Dish:
function Dish() {

    // variables:
        let Margin = 2;
        let Scenary = document.getElementById('Dish');
        let Width = Scenary.offsetWidth - (Margin * 2);
        let Height = Scenary.offsetHeight - (Margin * 2);
        let Cameras = document.getElementsByClassName('Camera');
        let max = 0;
    
    // loop (i recommend you optimize this)
        let i = 1;
        while (i < 5000) {
            let w = Area(i, Cameras.length, Width, Height, Margin);
            if (w === false) {
                max =  i - 1;
                break;
            }
            i++;
        }
    
    // set styles
        max = max - (Margin * 2);
        setWidth(max, Margin);
}

// Set Width and Margin 
function setWidth(width, margin) {
    let Cameras = document.getElementsByClassName('Camera');
    for (var s = 0; s < Cameras.length; s++) {
        Cameras[s].style.width = width + "px";
        Cameras[s].style.margin = margin + "px";
        Cameras[s].style.height = (width * 0.75) + "px";
    }
}

// Load and Resize Event
window.addEventListener("load", function (event) {
    Dish();
    window.onresize = Dish;
    let Body = document.body;
    let Add = document.createElement('div');
    Add.className='more';
    Add.addEventListener("click",function(event) {
        add();
    });

    let Less = document.createElement('div');
    Less.className='less';
    Less.addEventListener("click",function(event) {
        less();
    });
    // Body.appendChild(Add);
    // Body.appendChild(Less);
}, false);

// Function to delete Camera
function less(video) {
    let Cameras = document.getElementsByClassName('Camera');
    // if (Cameras.length > 1) {
    //     let Camera = Cameras[Cameras.length - 1];
    //     Camera.parentNode.removeChild(Camera);
    // }
    video.remove();
    console.log("auto layout video removed layout called")
    Dish();
    console.log("layutout returned")
}

// Function to add Camera
function add(Camera) {
    let Scenary = document.getElementById('Dish');
    // let Camera = document.createElement('div');
    Camera.className = 'Camera';
    Scenary.appendChild(Camera);
    // console.log("autolayout video added")
    Dish();
}


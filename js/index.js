let click_time = 0;
let get_bowl = false;
let get_food = false;
let get_key = false;

let water_running = false;
let bowl_fill = false;

function drawers(id, itemId) {
    toggle(id, "drawers")
    if (itemId != "none") {
        toggle(itemId, "item")
    }
}

function toggle(id, className) {
    var element = document.getElementById(id);
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

function pick(imageId,id,image,click) {
    var descendents = document.querySelectorAll('#box > div');
    document.getElementById(imageId).style.visibility = "hidden";
    var image_html = "<img id=" + id + " src=" + image + " onclick=" + click + " width='70px' height='70px'>";
    var i, element, number;
    for (i = 0; i < descendents.length; i++) {
        element = descendents[i];
        if (element.innerHTML === "") {
           number = i;
           break;
        }
        number = -1;
    }
    if (number != -1) {
        var item = descendents[number];
        item.innerHTML = image_html;
    } else {
        var div = document.createElement("div");
        div.classList.add("boxex");
        div.innerHTML = image_html;
        document.getElementById("box").appendChild(div);
    }
}

// function pick(imageId,id,image,click) {
//     var descendents = document.querySelectorAll('#box > div');
//     document.getElementById(imageId).style.visibility = "hidden";
//     var image_html = "<img id=" + id + " src=" + image + " onclick=" + click + " width='70px' height='70px'>";
//     var i = getElement();
//     var element = descendents[i];
//     element.innerHTML = image_html;
// }

function show_detail(id) {
    document.getElementById(id).style.visibility="visible";
}

function hide_detail(id) {
    document.getElementById(id).style.visibility="hidden";
}

function show_big(id, hideId) {
    document.getElementById(hideId).style.visibility="hidden";
    document.getElementById("detail").style.visibility="visible";
    document.getElementById(id).style.visibility="visible";
}

function hide_big(id) {
    document.getElementById("background1").style.visibility="visible";
    document.getElementById("detail").style.visibility="hidden";
    document.getElementById(id).style.visibility="hidden";
}

const scores = [];

function display(element) {
    const glass = document.getElementById(element);
    glass.classList.remove("hidden");
    setTimeout(function() {glass.classList.add("hidden")}, 1000);

    scores.push(element);
    console.log(scores);
    const answer = ["score1", "score2", "score1", "score2", "score1", "score3", "score2"];
    const check = [];

    if (scores.includes("score1")){
        const index = scores.indexOf("score1");
        if (index+7 <= scores.length) {
            var i;
            for (i = index; i < index + 7; i++) {
                check.push(scores[i]);
            }
            if (isArraySame(check,answer)) {
                document.getElementById("key").classList.remove("hidden");
            } else {
                for (let i = 0; i <= index; i++) {
                    scores.shift();
                }
                for (let i = 0; i <= 5; i++) {
                    check.pop();
                }
            }
        }
    }
}

function isArraySame(arr1, arr2) {
    if (arr1.length !== arr2.length){
        return false;
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
}



function clock_run() {
    if (click_time == 12) {
        click_time = 0;
    }
    click_time++;
    document.getElementById("pin").style.transform = "rotate(" + click_time*30 + "deg)";
    if (click_time == 2) {
        document.getElementById("bird").style.visibility="visible";
    } else {
        document.getElementById("bird").style.visibility="hidden";
    }
}

function open_door() {
    const text = document.getElementById("lock");
    text.classList.remove("hidden");
    setTimeout(function() {text.classList.add("hidden")}, 1000);
}

function change_view(hideId,showId) {
    document.getElementById(hideId).style.display="none"
    document.getElementById(showId).style.display="block";
}

function clear_border() {
    var descendents = document.querySelectorAll('#box > div');
    var i
    for (i = 0; i < descendents.length; i++) {
        descendents[i].style.border="0px";
    }
    get_food = false;
    get_key = false;
    get_bowl = false;
    get_score1 = false;
    get_score2 = false;
    get_score3 = false;
}


function bowl() {
    clear_border();
    get_bowl = true;
    document.getElementById("bowl_box").parentElement.style.border = "1px salmon solid";
}

function food() {
    clear_border();
    get_food = true;
    document.getElementById("food_box").parentElement.style.border = "1px salmon solid";

}

function key() {
    clear_border();
    get_key = !get_key;
    document.getElementById("key_box").parentElement.style.border = "1px salmon solid";
}

let bowl_under_water = false;
function show_bowl() {
    if (get_bowl == true) {
        document.getElementById("bowl_water").style.visibility="visible";
        var parent = document.getElementById("bowl_box").parentElement;
        parent.innerHTML = "";
        clear_border();
        get_bowl = false;
        bowl_under_water = true;
    }
    if (water_running == true) {
        bowl_fill = true;
        document.getElementById("bowl_water").src="image/dog_bowl_fill.png";
    }
}


function get_water() {
    toggle("water", "not_running");
    if (!document.getElementById("water").classList.contains("not_running")) {
        water_running = true;
    }
    if (bowl_under_water = true) {
        bowl_fill = true;
        document.getElementById("bowl_water").src="image/dog_bowl_fill.png";
    }
    
}

function get_bowl_back() {
    if (bowl_fill == true) {
        pick("bowl_water", "bowl_box", "image/dog_bowl_fill.png", "bowl()");
    } else {
        pick("bowl_water",'bowl_box','image/dog_bowl.png', 'bowl()');
    }
}

function place_bowl() {
    if (bowl_fill == true && get_bowl == true) {
        document.getElementById("dog_bowl_fill").style.visibility="visible";
        bowl();
        document.getElementById("bowl_box").parentElement.innerHTML="";
        clear_border();
        document.getElementById("dog").style.right = "-40%";
        document.getElementById("dog").classList.remove("thirsty");
    } else if (get_bowl == true) {
        document.getElementById("bowl").style.visibility="visible";
        bowl();
        document.getElementById("bowl_box").parentElement.innerHTML="";
        clear_border();
        
    }
}

function feed() {
    if (get_food == true) {
        document.getElementById("scroll_bird").style.visibility = "visible";
        document.getElementById("food_box").parentElement.innerHTML = "";
        clear_border();
    }
}

let get_score1 = false;
let get_score2 = false;
let get_score3 = false;

function score_bottom() {
    clear_border();
    get_score1 = true;
    document.getElementById("scroll_box").parentElement.style.border = "1px salmon solid";
    // document.getElementById("scores").style.visibility = "visible";
    // document.getElementById("bottom").style.visibility = "visible";
}

function score_left() {
    clear_border();
    get_score2 = true;
    document.getElementById("left_box").parentElement.style.border = "1px salmon solid";
    // document.getElementById("scores").style.visibility = "visible";
    // document.getElementById("left").style.visibility = "visible";
}

function score_right() {
    clear_border();
    get_score3 = true;
    document.getElementById("right_box").parentElement.style.border = "1px salmon solid";
    // document.getElementById("scores").style.visibility = "visible";
    // document.getElementById("right").style.visibility = "visible";
}

function hide_score(id) {
    document.getElementById(id).style.visibility = "hidden";
    document.getElementById("scores").style.visibility = "hidden";
}

function show_pieces() {
    if (get_score1 == true) {
        document.getElementById("bottom_big").classList.remove("not_shown");
        document.getElementById("small_bottom").style.visibility = "visible";
        clear_border();
        document.getElementById("scroll_box").parentElement.innerHTML = "";
    }
    if (get_score2 == true) {
        document.getElementById("left_big").classList.remove("not_shown");
        document.getElementById("small_left").style.visibility = "visible";
        clear_border();
        document.getElementById("left_box").parentElement.innerHTML = "";
    }
    if (get_score3 == true) {
        document.getElementById("right_big").classList.remove("not_shown");
        document.getElementById("small_right").style.visibility = "visible";
        clear_border();
        document.getElementById("right_box").parentElement.innerHTML = "";
    }
}

function open_door() {
    if (get_key == true) {
        document.getElementById("open_door").style.visibility = "visible";
        document.getElementById("key_box").parentElement.innerHTML = "";
        clear_border();
    }
}

function dog() {
    if (document.getElementById("dog").classList.contains("thirsty")) {
        document.getElementById("thirsty").style.visibility="visible";
        setTimeout(function() {document.getElementById("thirsty").style.visibility="hidden";}, 1000);
    }
}




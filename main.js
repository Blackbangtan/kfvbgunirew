canvas="";
objects = [];

function preload(){
video=createVideo("video.mp4");

}

function setup(){
  canvas=createCanvas(300 , 400);
  canvas.center();
  video.size(300,400);
  video.hide();

}

function start(){
objector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML = "status : detecting objects";

}

function modelLoaded(){
console.log("modelLoaded");
status ="true";
video.loop();
video.speed(1);
video.volume(0);

}

function gotResult(error , results){
  if(error){
    console.log(error);
  }
console.log(results);
objects = results;

}

function draw(){
image(video , 0 , 0 , 300 , 400);
  if(status != ""){
    objector.detect(video,gotResult);
    for(i = 0; i < objects.length ; i++){
    document.getElementById ("status").innerHTML = "status :objects detected";
    document.getElementById ("numoob").innerHTML = "Number of objects detected are:" + objects.length;

    fill(175, 129, 219);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke(0 , 0 , 0);
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
  }
}

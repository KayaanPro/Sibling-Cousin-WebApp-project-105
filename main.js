Webcam.set({
    width: 315,
    height: 315,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_uri+'">'
    });
}

console.log("ml5.js version:" ,ml5.version)

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/L4UWFhpIL/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model is loaded! :)")
}

function check(){
    img = document.getElementById("capture_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        acc = results[0].confidence.toFixed(3);
        document.getElementById("result_object_accuracy").innerHTML = acc*100 + "%";
    }
    
}
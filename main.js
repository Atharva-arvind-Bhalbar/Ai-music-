song = "";

scorerightwrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rigthwristX = 0;
rigthwristY = 0;

function preload() 
{ 
    song = loadSound("music.mp3"); 
}

function setup() 
{ 
    canvas = createCanvas(600, 500); 
    canvas.center(); 
    
    video = createCapture(VIDEO); 
    video.hide(); 
    
    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses);
    
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPose(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = "+ scorerightwrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWristX;
        leftWristY = results[0].pose.leftWristY;
        console.log("leftWristX = " + rigthwristX + "leftWristY = " + leftWristY );

        rigthwristX = results[0].pose.rigthwristX;
        rigthwristY = results[0].pose.rigthwristY;
        console.log("rightWristX = " + rigthwristX + "rightWristY = " + rigthwristY);
    }
}


function draw()
{
    image(video, 0, 0, 600, 500);
    fill('#000000')
    stroke('#fcfeff')

if(scorerightwrist > 0.2)
{

    circle(rigthwristX,rigthwristY,20);

    if(rigthwristY >0  &&  rigthwristY <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rigthwristY >100  &&  rigthwristY <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rigthwristY >200  &&  rigthwristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rigthwristY >300  &&  rigthwristY <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rigthwristY >400 &&  rigthwristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}
    if (scoreLeftWrist > 0.2)
    {

        circle(leftWristX,leftWristY,20);
        InNumberleftwirstY = Number(leftWristY);
        remove_decimals = floor(InNumberleftwirstY);
        leftWristY_divide_1000 = remove_decimals/1000;
        volume = leftWristY_divide_1000*2;
        document.getElementById("volume").innerHTML = "volume = " +  volume;
        song.setVolume(volume);

    }
    
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
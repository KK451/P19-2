/* 
-------------------------------------------------------------------------------------------------------

Make it so that if the car touches cones, game ends - ESSENTIAL

-------------------------------------------------------------------------------------------------------

if car touches fuel, fuelcount increases - ESSENTIAL

-------------------------------------------------------------------------------------------------------

make the game mobile compatible
- if tapped on the upper half of the screen, car moves up vice versa

- NON ESSENTIAL

-------------------------------------------------------------------------------------------------------

Add sound
- pop_ sound for picking up fuel
- acceleration sound needs to be looped and change to a different sound
- crash sound when crashed with cone
might need some sound editing

- NON ESSENTIAL

-------------------------------------------------------------------------------------------------------
*/

var PLAY = 1;
var END = 0;
var car, carImg
var road
var fuel, fuelImg
var cone, coneImg
var gameState = PLAY;
var fuelCount = 1000
var coneGroup, fuelGroup, roadMarkingGroup;
var gameOver, gameOverImg
var acceleration, pop_, crash


function preload()
{
    carImg = loadImage("car.png")
    fuelImg = loadImage("fuel.png")
    coneImg = loadImage("cone.png")
    acceleration = loadSound("acceleration.wav")
    pop_ = loadSound("pop_.wav")
    crash = loadSound("crash.wav")
}

function setup()
{
    createCanvas(windowWidth, windowHeight)

    car = createSprite(windowWidth / 10, windowHeight / 2)
    car.addImage(carImg);
    car.scale = 0.2
    car.rotation = 180

    road = createSprite(windowWidth + 100, windowHeight / 2, 100, 10)
    road.velocityX = -5

    road.shapeColor = "white"
    road.depth = car.depth - 1;

    fuelGroup = new Group();
    coneGroup = new Group();
    roadMarkingGroup = new Group();
}

function draw()
{


    //acceleration.play()

    background(50)

 
    textSize(30)
    text("Fuel = " + fuelCount, windowWidth / 0.59 / 2, windowHeight / 10);

    if (gameState == PLAY)
    {
        
        if (keyDown("UP_ARROW"))
        {
            car.y = car.y - 6
        }
        if (keyDown("DOWN_ARROW"))
        {
            car.y = car.y + 6
        }
        if (road.x < 0)
        {
            road.x = road.width / 2;
        }
        if (frameCount % 1 == 0)
        {
            fuelCount = fuelCount - 1
        }
        if (fuelCount == 0)
        {
            gameState = END
        }
        if (car.y > windowHeight)
        {
            car.y = windowHeight
        }
        if (car.y < windowHeight - windowHeight)
        {
            car.y = windowHeight - windowHeight
        }
        
        if(car.isTouching(fuel))
        {
            fuel.visible = false;
            fuel.destroy
        }

        


        spawnFuel();
        spawnCones();
        spawnRoadMarking();


        drawSprites()


    }



    else if (gameState == END)
    {
        road.velocityX = 0;
        fuelGroup.setVelocityXEach(0);
        coneGroup.setVelocityXEach(0);
        roadMarkingGroup.setVelocityXEach(0)
        //set lifetime of the game objects so that they are never destroyed
        fuelGroup.setLifetimeEach(-1);
        coneGroup.setLifetimeEach(-1);
        roadMarkingGroup.setLifetimeEach(-1)

        gameOverImg = loadImage("gameOver.png")
        gameOver = createSprite(windowWidth / 2, windowHeight / 2)
        gameOver.addImage(gameOverImg);
        gameOver.scale = 0.4
        crash.play()


    }







}

function spawnRoadMarking()
{
    if (frameCount % 50 == 0)
    {
        road = createSprite(windowWidth + 100, windowHeight / 2, 100, 10)
        road.velocityX = -5
        road.shapeColor = "white"
        road.depth = car.depth - 1;
        roadMarkingGroup.add(road)
    }
}

function spawnFuel()
{
    if (frameCount % 200 == 0)
    {
        fuel = createSprite(windowWidth, Math.round(random((0, windowHeight / 2))))
        fuel.velocityX = -5
        fuel.addImage(fuelImg)
        fuel.scale = 0.15

        fuel.lifetime = 600;

        //adjust the depth
        fuel.depth = car.depth;
        car.depth = car.depth + 1;

        fuelGroup.add(fuel);
    }
}

function spawnCones()
{
    if (frameCount % 200 == 0)
    {
        cone = createSprite(windowWidth, Math.round(random((0, windowHeight))))
        cone.velocityX = -5
        cone.addImage(coneImg)
        cone.scale = 0.175
        cone.lifetime = 600;
        cone.depth = car.depth;
        car.depth += 1;
        //add each obstacle to the group
        coneGroup.add(cone);
    }
}

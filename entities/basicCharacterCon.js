var basicCharacter = {
    x: 0,
    y: 10,
    z: 0,
    height: 10,
    width: 10,
    xVel: 0,
    yVel: 0,
    movingR: false,
    movingL: false,
    jumping: false,
    model: createBasicCharacterMesh(0, 0, 0),
    hitBox: createBasicCharacterBounding(0, 0, 0),
    hitBoxEnabled: false,
    canJump: true,
    jumpCt: 0,
    maxJumpCt: 3,
    jumpSpeed: 1.8,
    walkSpeed: 1,
    onGround: true,
    minDown: -100,
    minLeft: -100,
    minRight: 100,
    minUp: 100,
    update: function(){
        // checks and sets the lowsest current point
        if(boxBelow != undefined){
            this.minDown = boxBelow.position.y + 10/2 + player1.height/2;
        }
        else{
            this.minDown = -1000;
        }

        if(boxLeft != undefined){
            this.minLeft = boxLeft.position.x + 10/2 + player1.width/2;
        }
        else{
            this.minLeft = -1000;
        }

        if(boxRight != undefined){
            this.minRight = boxRight.position.x-10/2 - player1.width/2;
        }
        else{
            this.minRight = 1000;
        }

        if(gameMode != "bounce"){
            if(boxAbove != undefined){
              this.minUp = boxAbove.position.y - 10/2 - player1.height/2;
            }
            else{
              this.minUp = 100000;
            }
        }




        //maximum gravity acceleration
        if(this.yVel - 0.075 < -2.5){
            this.yVel = -2.5;
        }
        this.yVel -= 0.075;


        //changes box position
        this.x += this.xVel;
        this.y += this.yVel;



        //dampen left and right movement on floor
        if(!this.movingR && !this.movingL && this.onGround){
          this.xVel = this.xVel*0.8;
        }
        if(!this.movingR && !this.movingL && !this.onGround){
          this.xVel = this.xVel*0.98;
        }
        // decrease airspeed
        // if(!this.jumping){
        //   // this.yVel = this.yVel*0.9;
        // }


        //doesn't let user pass below boxes
        if(this.y < this.minDown-0.2){
            if(gameMode == "bounce"){
                this.yVel = 4;

            }
          this.y = this.minDown;
          this.canJump = true;
          if(gameMode == "normal"){
              this.jumpCt = 0;

          }
          this.onGround = true;
        }
        if(gameMode != "bounce"){
            if(this.y > this.minUp){
              this.y = this.minUp;
              this.yVel = 0;
            }
        }

        if(this.x < this.minLeft){
          this.x = this.minLeft;
        }
        if(this.x > this.minRight){
          this.x = this.minRight;
        }

        if(this.y < -40){
          // alert("you died");
          this.y = 10;
          this.x = 0;
          this.xVel = 0;
          this.yVel = 0;
        }


        //updates models position and hitbox
        this.model.position.set(this.x, this.y, 0);
        this.hitBox.position.set(this.x, this.y, 0);
        document.getElementById("counter").innerHTML = "Current Floor: " + Math.floor(this.y/10);

        if(gameMode == "normal"){
            if(this.model.position.y > 999){
              alert("You Won!");
              this.y = 10;
              this.x = 0;
              this.model.position.set(this.x, this.y, 0);
              this.hitBox.position.set(this.x, this.y, 0);
            }
        }
        else if(gameMode == "bounce"){
            if( Math.floor(this.model.position.y/10) > 405){
              alert("You Won!");
              this.y = 10;
              this.x = 0;
              this.model.position.set(this.x, this.y, 0);
              this.hitBox.position.set(this.x, this.y, 0);
            }
        }




    }
}

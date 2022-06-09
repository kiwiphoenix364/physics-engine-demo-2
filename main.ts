namespace SpriteKind {
    export const movingplatform = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.after(500, function () {
        hittingwall = false
    })
    canJump = false
    mySprite.vy = -200
    mySprite.ay = 400
    if (hittingwall) {
    	
    }
})
function GenerateCollision () {
    timer.background(function () {
        TileCollisionArrayY = []
        TileCollisionArrayX = []
        for (let index6 = 0; index6 <= 2; index6++) {
            // put the tilemap locations that correspond to the order of your index of regular platform images and collisions
            if (index6 == 0) {
                collisionImages = img`
                    ..............................cc
                    ............................cc..
                    ..........................cc....
                    ........................cc......
                    ......................cc........
                    ....................cc..........
                    ..................cc............
                    ................cc..............
                    ..............cc................
                    ............cc..................
                    ..........cc....................
                    ........cc......................
                    ......cc........................
                    ....cc..........................
                    ..cc............................
                    cc..............................
                    `
            } else if (index6 == 1) {
                collisionImages = img`
                    c . . . . . . . . . . . . . . . 
                    . c . . . . . . . . . . . . . . 
                    . . c . . . . . . . . . . . . . 
                    . . . c . . . . . . . . . . . . 
                    . . . . c . . . . . . . . . . . 
                    . . . . . c . . . . . . . . . . 
                    . . . . . . c . . . . . . . . . 
                    . . . . . . . c . . . . . . . . 
                    . . . . . . . . c . . . . . . . 
                    . . . . . . . . . c . . . . . . 
                    . . . . . . . . . . c . . . . . 
                    . . . . . . . . . . . c . . . . 
                    . . . . . . . . . . . . c . . . 
                    . . . . . . . . . . . . . c . . 
                    . . . . . . . . . . . . . . c . 
                    . . . . . . . . . . . . . . . c 
                    `
            } else if (index6 == 2) {
            	
            } else {
            	
            }
            // put the tilemap locations that correspond to the order of your index of regular platform images and collisions
            if (index6 == 0) {
                item = tiles.getTilesByType(assets.tile`myTile13`)
            } else if (index6 == 1) {
                item = tiles.getTilesByType(assets.tile`myTile`)
            } else if (index6 == 2) {
            	
            } else {
            	
            }
            for (let value2 of item) {
                TileCollisionArrayX.push(value2.column * 16 - 1)
                TileCollisionArrayY.push(value2.row * 16 + collisionImages.height + 1)
                for (let index32 = 0; index32 <= collisionImages.width; index32++) {
                    for (let index222 = 0; index222 <= collisionImages.height; index222++) {
                        if (0 != collisionImages.getPixel(index32, index222)) {
                            TileCollisionArrayX.push(value2.column * 16 + index32)
                            TileCollisionArrayY.push(value2.row * 16 + index222 + 1)
                        }
                    }
                }
                TileCollisionArrayX.push(value2.column * 16 + 1 + collisionImages.width)
                TileCollisionArrayY.push(value2.row * 16 + collisionImages.height + 1)
            }
        }
    })
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    stats.turnStats(true)
})
let prevy = 0
let prevx = 0
let repeat = 0
let cury = 0
let curx = 0
let item: tiles.Location[] = []
let canJump = false
let hittingwall = false
let mySprite: Sprite = null
let TileCollisionArrayX: number[] = []
let TileCollisionArrayY: number[] = []
let collisionImages: Image = null
TileCollisionArrayY = [0]
TileCollisionArrayX = [0]
tiles.setCurrentTilemap(tilemap`level2`)
mySprite = sprites.create(img`
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    22222222222222222222222222222222
    `, SpriteKind.Player)
mySprite.vy = 100
scene.cameraFollowSprite(mySprite)
let mySprite3 = sprites.create(img`
    c 
    `, SpriteKind.Player)
mySprite3.setFlag(SpriteFlag.Invisible, true)
GenerateCollision()
game.onUpdate(function () {
    curx = mySprite.x
    cury = mySprite.y
    repeat = Math.abs(curx - prevx) + Math.abs(cury - prevy) - Math.min(Math.abs(prevx - curx), Math.abs(prevy - cury))
    hittingwall = mySprite.isHittingTile(CollisionDirection.Bottom)
    canJump = mySprite.isHittingTile(CollisionDirection.Bottom)
    for (let index = 0; index <= repeat; index++) {
        if (0 < repeat) {
            mySprite.setPosition(prevx + (curx - prevx) / repeat * index, prevy + (cury - prevy) / repeat * index)
            controller.moveSprite(mySprite, 100, 0)
            mySprite.setFlag(SpriteFlag.GhostThroughWalls, false)
            for (let index4 = 0; index4 <= TileCollisionArrayX.length; index4++) {
                if (mySprite.top + 2 <= TileCollisionArrayY[index4] && mySprite.y - 3 >= TileCollisionArrayY[index4]) {
                    if (mySprite.right - 6 <= TileCollisionArrayX[index4] && mySprite.right >= TileCollisionArrayX[index4]) {
                        if (controller.right.isPressed() || mySprite.ay > 0) {
                            controller.moveSprite(mySprite, 0, 0)
                            mySprite.right = TileCollisionArrayX[index4] + 1
                            break;
                        }
                    }
                    if (mySprite.left <= TileCollisionArrayX[index4] && mySprite.left + 6 >= TileCollisionArrayX[index4]) {
                        if (controller.left.isPressed() || mySprite.ay < 0) {
                            controller.moveSprite(mySprite, 0, 0)
                            mySprite.left = TileCollisionArrayX[index4] - 0
                            break;
                        }
                    }
                }
            }
            for (let index43 = 0; index43 <= TileCollisionArrayX.length; index43++) {
                if (mySprite.left <= TileCollisionArrayX[index43] && mySprite.right >= TileCollisionArrayX[index43]) {
                    if (mySprite.vy > 0 && (mySprite.top < TileCollisionArrayY[index43] && mySprite.bottom + 1 >= TileCollisionArrayY[index43])) {
                        mySprite3.setPosition(TileCollisionArrayX[index43], TileCollisionArrayY[index43] - 1)
                        if (mySprite.overlapsWith(mySprite3)) {
                            hittingwall = true
                            canJump = true
                            if (mySprite.overlapsWith(mySprite3)) {
                                mySprite.y += -1
                            }
                        }
                    }
                    if (mySprite.vy < 0 && (mySprite.top - 1 < TileCollisionArrayY[index43] && mySprite.bottom >= TileCollisionArrayY[index43])) {
                        mySprite3.setPosition(TileCollisionArrayX[index43], TileCollisionArrayY[index43] - 1)
                        if (mySprite.overlapsWith(mySprite3)) {
                            mySprite.vy = 0
                            mySprite.ay = 0
                            mySprite.y += 1
                        }
                    }
                }
            }
            if (hittingwall) {
                mySprite.vy = 0
                mySprite.ay = 0
            } else {
                if (mySprite.vy == 0) {
                    mySprite.ay = 300
                }
            }
        }
    }
    prevx = mySprite.x
    prevy = mySprite.y
})

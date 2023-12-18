let canvas=document.querySelector('canvas')
let pen=canvas.getContext('2d')
let cellsize=50
let snakeCell=[[0,0]]
let gameOver=false
let boardW=1000
let boardH=550
let count=0
let direction='right'
document.addEventListener('keydown',(e)=>{
    // console.log(e,"rr");
    if(e.key==='ArrowUp'){
        direction='up'
    }
    else if(e.key==='ArrowDown')
    {
        direction='down'
    }
    else if(e.key==='ArrowLeft'){
        direction='left'
    }
    else{
        direction='right'
    }

})

let generatefoodS= function(){
    return([
        Math.round(Math.random()*(boardW-cellsize)/50)*50,
        Math.round(Math.random()*(boardH-cellsize)/50)*50

    ])
}
let foodcell=generatefoodS()

function draw()
{
    if(gameOver)
    {
        pen.fillStyle='red'
        pen.fillText('Game Over ',120,120)
        clearInterval(id)
        return;
    }
    pen.clearRect(0,0,1200,550)
    for(let cell of snakeCell)
    {
        pen.fillStyle='red'
        pen.fillRect(cell[0],cell[1],cellsize,cellsize)
    }
    pen.fillStyle='green'
    pen.fillRect(foodcell[0],foodcell[1],cellsize,cellsize)

    pen.font='30px san-sarif'
    pen.fillStyle='White'
    pen.fillText(`Socre ${count}`,50,50)
}

// draw()


function update()
{
let headX=snakeCell[snakeCell.length-1][0]
let headY=snakeCell[snakeCell.length-1][1]
let newX
let newY
if(direction==='right'){
    newX=headX+cellsize
    newY=headY
    if(newX===boardW|| checkMate(newX,newY))
    {
        gameOver=true;
    }
}
else if(direction==='left'){
    newX=headX-cellsize
    newY=headY
    if(newX<0|| checkMate(newX,newY))
    {
        gameOver=true
    }
}
else if(direction==='up'){
    newX=headX
    newY=headY-cellsize
    if(newY<0 || checkMate(newX,newY))
    {
        gameOver=true
    }
}
else{
    newX=headX
    newY=headY+cellsize
    if(newY===boardH ||checkMate(newX,newY))
    {
        gameOver=true
    }
}

snakeCell.push([newX,newY])
if(newX===foodcell[0] && newY===foodcell[1])
{
    foodcell=generatefoodS()
    count++;
}
else{
snakeCell.shift()
}
}



let id=setInterval(()=>
{
draw()
update()
},200)

function checkMate(newX,newY){
    for(let item of snakeCell){
        if(item[0]===newX && item[1]===newY)
        {
            return true
        }
    }
    return false
}


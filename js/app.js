// const colors = ['red', 'dodgerblue', 'darkgoldenrod',
//     'rebeccapurple', 'orange', 'limegreen', 
//     'cyan', 'chartreuse', 'magenta'
// ]

// let count = 0

// const boxes = [
//     {
//         id: 1,
//         color: 'red'
//     },
//     {
//         id: 2,
//         color: 'dodgerblue'
//     },
//     {
//         id: 3,
//         color: 'darkgoldenrod'
//     },
//     {
//         id: 4,
//         color: 'rebeccapurple'
//     },
//     {
//         id: 5,
//         color: 'orange'
//     },
//     {
//         id: 6,
//         color: 'limegreen'
//     },
//     {
//         id: 7,
//         color: 'cyan'
//     },
//     {
//         id: 8,
//         color: 'chartreuse'
//     },
//     {
//         id: 9,
//         color: 'magenta'
//     }
// ]

// boxes.forEach(item => {

//     const box = document.createElement('div')
//     box.classList.add('box')
//     box.setAttribute('id', `box-${item.id}`)
//     box.style.backgroundColor = item.color
//     box.style.width = '200px'
//     box.style.height = '200px'

//     document.getElementById('gameBoard').appendChild(box)

//     box.addEventListener('click', ()=> {
//         count++
//         document.getElementById('countDisplay').innerText = count
//         const idx = Math.floor(Math.random() * colors.length)
    
//         box.style.backgroundColor = colors[idx]
//     })
// })


/**
 * Refactoring
 * 
 * using class based Object
 */

class Game {

    constructor() {
        this.count = 0
        this.gameBoard = document.getElementById('gameBoard')
        this.countDisplay = document.getElementById('countDisplay')
        this.bestScore = document.getElementById('bestScore')
        this.freezeColorDisplay = document.getElementById('freezeColorDisplay')
        this.message = document.getElementById('message')
        this.freezeColor = ''
        this.hasWon = false
        this.gamePlay = false;
        this.colors = [
            'red', 'dodgerblue', 'pink',
            'rebeccapurple', 'orange', 'cyan',
            'yellow', 'magenta', 'limegreen'
        ]
        this.matches = 0
        this.matchDisplay = document.getElementById('matchDisplay')

        this.boxes = [
            {
                id: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 4,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 7,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 9,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            }
        ]
        this.scores = {
            currScore: this.count,
            bestScore: 0
        }
    }

    init() {
        if(!this.gamePlay) return
        
        this.getFreezeColor()
        this.makeBoxes()
        this.getMatches()
    }

    makeBoxes() {
        this.boxes.forEach(el => {
            const box = document.createElement('div')

            box.classList.add('box')
            box.setAttribute('id', `box-${el.id}`)
            box.dataset.id = el.id
            box.style.width = '200px'
            box.style.height = '200px'
            box.style.backgroundColor = el.color

            // console.log(`Box ${el.id} made`)
            this.addToGameboard(this.gameBoard, box)
            this.showMatches()

            this.changeColor(box, this.boxes)

        })
    }

    getMatches() {
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.freezeColor == this.boxes[i].color) {
                this.matches++
                this.showMatches()
            }
        }
    }

    showMatches() {
        this.matchDisplay.innerText = this.matches
    }


    addToGameboard(parent, child) {
        return parent.appendChild(child)
    }

    getFreezeColor() {
        this.freezeColor = this.colors[Math.floor(Math.random() * this.colors.length)]

        this.freezeColorDisplay.innerText = this.freezeColor
    }

    changeColor(element, arr) {
        element.addEventListener('click', ()=> {
            for (let i = 0; i < arr.length; i++) {
                if  (arr[i].id == element.dataset.id) {
                
                    // test freezeColor here
                    if (this.freezeColor != arr[i].color) {
                        this.count++
                        this.scores.currScore = this.count
                        this.countDisplay.innerText = this.count

                        arr[i].color = this.colors[Math.floor(Math.random() * this.colors.length)]
                        element.style.backgroundColor = arr[i].color

                        if (arr[i].color == this.freezeColor) {
                            this.matches++
                            this.showMatches()
                        }
                    } 
                }
            }
            this.checkWin()
        })
    }

    checkWin() {
        if (this.matches == 9 && this.gamePlay == true) {
            this.hasWon = true
            this.message.innerText = `You win and it took ${this.count} clicks`
            this.gamePlay= false;
            this.gameBoard.innerHTML = ''
            this.setScores()

        }
    }

    resetGame() {
        this.resetBoxes()
        this.matches = 0;
        this.count = 0;
        this.countDisplay.innerText = this.count

        this.gameBoard.innerHTML = ''
        this.freezeColor = ''
        this.message.innerText = ''
        this.hasWon = false
        this.gamePlay = !this.gamePlay;
        this.init();
        
        
    }

    resetBoxes() {
        this.boxes = this.boxes = [
            {
                id: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 4,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 7,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 9,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            }
        ]
    }

    setScores() {

        let bestScore 

        if(this.count < this.scores.currScore && this.count != 0) {
            bestScore = this.count
            
        }else{
            bestScore = this.scores.currScore
            
        }

        this.scores.bestScore = bestScore
        
        this.bestScore.innerText = this.scores.bestScore
    }

}



const action = new Game() 

const startBtn = document.getElementById('startBtn')

startBtn.addEventListener('click', ()=>action.resetGame())

// document.getElementById('startBtn').addEventListener('click', ()=> new Game().resetGame())


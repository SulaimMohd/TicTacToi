import { useState } from 'react'
import Box from './Component/Box'


function App() {
  const [table, setTable ] = useState(Array(9).fill({
    currentText: '',
    isSelected: false
  }))
  const [playaer1Text, setPlayer1Text] = useState("X")
  const [playaer2Text, setPlayer2Text] = useState("O")
  const [player1Score, setPlayer1Score] = useState(0)
  const [player2Score, setPlayer2Score] = useState(0)

  const [win, setWin] = useState(false)
  const [winText, setWinText] = useState("Tic Tac Toi")
  const [draw, setDraw]= useState(false)
  const [currentText, setCurrentText] = useState("X")
  const [winCombination, setWinCombinations ] = useState(new Set())
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]
  const handleClick = (id)=>{
    if(!win){
      console.log(id)
    let updatedTable = table.map((item, index) => {
      return index === id ? ({currentText: currentText, isSelected:true}):(item)
    })
    
    for(let combination of winningCombinations){
      let [a, b, c] = combination

      if(updatedTable[a].currentText !== '' &&  updatedTable[a].currentText === currentText && updatedTable[b].currentText === currentText && updatedTable[c].currentText === currentText){
        setWin(true)
        setWinText(`${currentText} Won!!`)
        setTable(updatedTable)
        setWinCombinations(new Set(combination))
        if(playaer1Text === currentText){
          setPlayer1Score(pre => pre +1)
        }else{
          setPlayer2Score(pre => pre+1)
        }
        console.log("win")
      }
    }
    if(!win){
      const totalSecited = updatedTable.reduce((total,item)=>{
        if(item.isSelected){
          return total += 1
        }else{
          return total += 0
        }
      }, 0)
      if(totalSecited === 9){
        setDraw(true)
        setWinText('Draw!!')
      }
    }
    console.log(updatedTable)
    setTable(updatedTable)
    setCurrentText(preText =>  preText === "X"? "O":"X")
  }
  }
  const reStart = ()=>{
    const newTable = Array(9).fill({
      currentText: '',
      isSelected: false
      })
    setTable(newTable)
    setDraw(false)
    setWinText(`Tic Tac Toi`)
    setCurrentText("X")
    setPlayer1Text(preText => preText === "X" ? "O":"X")
    setPlayer2Text(preText => preText === "X" ? "O":"X")
    setWin(false)
    }
  console.log(winCombination)
  return (
    <>
      <div className="container">
        
        <div className='align'>
          {/* <div className='players'>
            <h3>Player 1 ({playaer1Text}) : {player1Score}</h3>
            <h3>Player 2 ({playaer2Text}) : {player2Score}</h3>
          </div> */}
        </div>
          <h1 className="js-winner">{winText}</h1>

          <div id="gameboard">
            {
              table.map((item, index) => <Box key={index} id={index} {...item} handleClick= {handleClick} isWin={win && winCombination.has(index) ? true:false}/>)
            }
          </div>

          <button className="restart-button" onClick={()=> reStart()}>
            {
              draw || win ? "Play Again":"Restart"
            }
          </button>
      

      
      </div>
      
    </>
  )
}

export default App

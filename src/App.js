import React, { useState, useEffect, useRef } from 'react'

function App() {
  const GAME_DURATION = 30
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION)
  let [isGameRunning, setIsGameRunning] = useState(false)
  const inputRef = useRef(null)

  function calculateWordCount(text) {
    const wordsArray = text.trim().split(' ')
    const filteredArray = wordsArray.filter((word) => word !== '')
    return filteredArray.length
  }

  useEffect(() => {
    if (isGameRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prevValue) => prevValue - 1)
      }, 1000)
    } 
  }, [isGameRunning, timeRemaining])

  useEffect(() => {
    function endGame() {
      setIsGameRunning(false)
      setWordCount(calculateWordCount(text))
    }
    if (timeRemaining <= 0) {
      endGame()
    }
  }, [timeRemaining, text])
  
  useEffect(() => {
    if (isGameRunning) {
      inputRef.current.focus();
    }
  },[isGameRunning])

  function startGame() {
    setIsGameRunning(true);
    setTimeRemaining(GAME_DURATION);
    setText('');
  }

  function handleClick() {
    startGame() 
  }

  function handleChange(event) {
    setText(event.target.value)
  }

  return (
    <div className="container">
      <h1>Speed Typing Game </h1>

      <h2>How fast do you type?</h2>
      <textarea
        onChange={handleChange}
        value={text}
        disabled={!isGameRunning}
        ref={inputRef}
      />
      <button onClick={handleClick} disabled={isGameRunning}>
        Start
      </button>
      <h2>Time remaining : {timeRemaining}</h2>
      <h2>Word Count : {wordCount} </h2>
    </div>
  )
}

export default App

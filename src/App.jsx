import { useState, useEffect } from "react"
import lottery from "./lottery"
import web3 from "./web3"

function App() {
  const [manager, setManager] = useState("")
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState("")
  const [formValue, setFormValue] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const getContractData = async () => {
      const managerData = await lottery.methods.manager().call()
      const playersData = await lottery.methods.getPlayers().call()
      const balanceData = await web3.eth.getBalance(lottery.options.address)
      setManager(managerData)
      setPlayers(playersData)
      setBalance(balanceData)
    }

    getContractData()
  }, [])

  const submitHandler = async (event) => {
    event.preventDefault()

    const accounts = await web3.eth.getAccounts()

    setMessage("Waiting on transaction success...")

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(formValue, "ether"),
    })

    setMessage("You have been entered!")
  }

  const pickWinnerHandler = async () => {
    const accounts = await web3.eth.getAccounts()

    setMessage("Waiting on transaction success...")

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    })

    setMessage("A winner has been picked!")
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>There are currently {players.length} people there</p>
      <p>Balance is {web3.utils.fromWei(balance, "ether")} ether!</p>

      <hr />

      <form onSubmit={submitHandler}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
        </div>
        <button type="submit">Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={pickWinnerHandler}>Pick a winner!</button>
      <hr />
      <h1>{message}</h1>
    </div>
  )
}

export default App

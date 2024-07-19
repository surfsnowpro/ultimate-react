import {useState} from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [curFriend, setCurFriend] = useState(null)
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleAddFriend(newFriend) {
    setFriends(f =>[...f, newFriend])
    setShowAddFriend(false)
  }

  function handleSplitBill(owed) {
    setFriends(friends => friends.map(f => curFriend.id === f.id ? {...curFriend, balance: owed} : f))
    setCurFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelect={setCurFriend} curFriend={curFriend}/>
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={() => setShowAddFriend(show => !show)}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <div className="sidebar">
        {curFriend && <FormSplitBill
          friend={curFriend}
          onSplitBill={handleSplitBill}
          key={curFriend.id}
        />}
      </div>
    </div>
  )
}

function FriendList({ friends, curFriend, onSelect }) {
  return (
    <>
      <ul>
        {friends.map(f =>
            <Friend friend={f} key={f.id} selected={curFriend?.id === f.id} onSelect={onSelect}/>
        )}
      </ul>
    </>
  )
}

function Friend({ friend, selected, onSelect }) {
  let css = "";
  let text = `You and ${friend.name} are even`;

  if (friend.balance > 0) {
    css = "green"
    text = `${friend.name} owes you $${friend.balance}`
  }
  else if (friend.balance < 0) {
    css = "red"
    text = `You owe ${friend.name} $${Math.abs(friend.balance)}`
  }

  return (
    <li className={selected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={css}>
        {text}
      </p>
      <Button  onClick={() => onSelect(selected ? null : friend)}>
        {selected ? "Close" : "Select"}
      </Button>
    </li>
  )
}

function FormAddFriend ({ onAddFriend }) {
  const [friend, setFriend] = useState(null)

  function handleAddFriend(event) {
    event.preventDefault()
    let id = crypto.randomUUID()
    let newFriend = {
      name: friend,
      image: `https://i.pravatar.cc/48?u=${id}`,
      id: id,
      balance: 0
    }
    onAddFriend(newFriend)
  }

  return (
    <form className="form-add-friend">
      <label>👭Friend name</label>
      <input
        type="text"
        onChange={(e) => setFriend(e.target.value)}
        value={friend}/>
      <label>🌄Image URL</label>
      <input
        type="text"
        value="https://i.pravatar.cc/48"
      />
      <Button onClick={e => handleAddFriend(e)}>Add</Button>
    </form>
  )
}

function FormSplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState("")
  const [yourExpense, setYourExpense] = useState("")
  const [whosPaying, setWhosPaying] = useState("You")

  const friendsExpense = bill > 0 ? bill - yourExpense : ""

  function handleSubmit(event) {
    event.preventDefault()
    const owed = whosPaying === "You" ? friendsExpense : -yourExpense
    onSplitBill(owed)
    // setBill("")
    // setYourExpense("")
    // setWhosPaying("You")
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label>💰Bill value</label>
      <input type="text" value={bill} onChange={e => setBill(Number(e.target.value))}/>

      <label>🧍Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={e => setYourExpense(Number(e.target.value))}
        disabled={bill === 0}
      />

      <label>👭{friend.name}'s expense</label>
      <input
        type="text"
        value={friendsExpense}
        disabled
      />

      <label>🤑Who's paying the bill?</label>
      <select onChange={e => setWhosPaying(e.target.value)}>
        <option value="You">You</option>
        <option value={friend.name}>{friend.name}</option>
      </select>
      <Button onClick={e => handleSubmit(e)}>Split bill</Button>
    </form>
  )
}

function Button({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>
}

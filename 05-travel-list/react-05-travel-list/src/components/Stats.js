export default function Stats({items}) {
  if (items.length === 0) return <footer className="stats">Start adding items to your packing list.</footer>

  const totalItems = items.length
  const packedCount = items.filter(item => item.packed).length
  const packedPercent = packedCount / totalItems * 100

  return (
    <footer className="stats">
      <em>
        {
          packedPercent === 100
            ? `You have everything! Ready to go ✈️`
            : `You have ${totalItems} items on your list, and you already packed ${packedCount} (${packedPercent}%)`
        }
      </em>
    </footer>
  )
}
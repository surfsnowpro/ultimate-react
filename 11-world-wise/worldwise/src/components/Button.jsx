import styles from "./Button.module.css"

function Button({ children, onClick, type}) {
  return (
    <button
      onClick={(e) => {onClick(e)}}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  )
}

export default Button
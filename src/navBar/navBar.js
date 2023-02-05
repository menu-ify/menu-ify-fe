import "./navBar.css"

export function NavBar() {
  return (
    <div className="navbar-background">
      <header>{restaurantName}</header>
      <span className="material-symbols-outlined">
        menu
      </span>
    </div>
  )
}
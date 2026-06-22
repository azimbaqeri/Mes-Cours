import logo from './assets/logo.png'

function Header() {
  return (
    <header>
        <a href='/'><img src={logo} alt="IMDB Logo" width="100" /></a>
    </header>
  )
}

export default Header
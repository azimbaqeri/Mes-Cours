function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <p>&copy; {currentYear} BINGE. Tous droits réservés.</p>
    </footer>
  )
}

export default Footer
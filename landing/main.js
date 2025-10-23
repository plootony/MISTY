import './main.scss'

const ctaButton = document.querySelector('.cta')

if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    window.alert('Thanks for checking out the landing page!')
  })
}

const appLink = document.querySelector('.app-link')

if (appLink) {
  const appDevPort = 5174
  const appHref = import.meta.env.DEV
    ? `http://localhost:${appDevPort}/`
    : '/app/'

  appLink.setAttribute('href', appHref)
}

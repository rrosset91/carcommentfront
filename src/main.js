import './app.css'
import App from './App.svelte'
import Navbar from './lib/Navbar.svelte'

const app = new App({
  target: document.getElementById('app'),
})

const navbar = new Navbar({
	  target: document.getElementById('navbar'),
})

export default app

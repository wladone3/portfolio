import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style.scss'
import gsap from 'gsap';
import {ScrollTrigger, SplitText, ScrollSmoother, Flip} from 'gsap/all';


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollSmoother)
gsap.registerPlugin(Flip)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

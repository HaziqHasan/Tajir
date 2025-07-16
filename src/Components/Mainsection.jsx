import React from "react"
import Products from './Products'
import About from './About'
import Home from './Home'

export default function Mainsection() {
  return (
    <div className="bg-white ">
   <Home/>  
  <div className=" shadow-lg">
  <Products/>
</div>
  <div className=" shadow-lg">
  <About/>
</div>
</div>
  )
}

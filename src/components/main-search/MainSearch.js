import React, { Component } from "react"
import Heading from "../common/Heading"
import "./mainsearch.css"
import sample from './pexels-c-technical-6133088.mp4';


function MainSearch (){


  return (
    <>
      <section className='MainSearch'>
        <video autoPlay="autoplay" loop="true" muted id="vid" className="video-bg">
            <source src={sample} type="video/mp4"></source>
          </video>
        <div className='container'>
          
          <div  className="overlay">
          <Heading  className="overlay-heading" title='Search for your Next Home ' subtitle='Find a great place to start your new life'/>
            <button className="overlay-button" type="submit">
              <i  className='fa fa-search'>
                  <a href="/Search">Tell us what you need!</a>
                  </i>
            </button>
        </div>
        </div>
      </section>
    </>
  )}


export default MainSearch

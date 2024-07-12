import React from "react"
import HomeSection from "../components/HomeSection"
import About from "../components/about"
import Teams from "../components/teams"
import { Navbar } from "../components/navbar"
import Ads from "../components/ads"
import { Journey } from "../components/Journey"
import Footer from "../components/footer"
import { AccordionFaqs } from "../components/faq"
import { Subscribe } from "../components/subscribe"

const Home = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1440px",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Navbar />
      <HomeSection />
      <About />
      <Ads />
      <Teams />
      <Journey />
      <AccordionFaqs />
      <Subscribe />
      <Footer />
    </div>
  )
}

export default Home

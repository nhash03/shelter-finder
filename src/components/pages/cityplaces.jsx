import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from "../common/footer/Footer"
import Heading from "../common/Heading"
import HouseCards from "./housecards"

function CityPlaces  ()  {
    return (
        <div>
            <Heading title="city" subtitle = "" />
            <HouseCards />
            <Footer />
        </div>
    )
}
export default CityPlaces
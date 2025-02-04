import React from "react"
import MainSearch from "../main-search/MainSearch"
import Nearby from "../nearby/Nearby"
import Locations from "../locations/Locations"
import TopHosts from "../tophosts/TopHosts"

const Pages = () =>{
  return (
    <>
        <MainSearch />
        <Nearby />
        <Locations />
        <TopHosts />
    </>
  )
}

export default Pages
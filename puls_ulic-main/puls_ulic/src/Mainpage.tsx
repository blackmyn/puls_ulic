import React, { useRef, useLayoutEffect } from "react";
import { Link, Element } from "react-scroll";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "../src/components/HeaderSecond/HeaderSecond";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import BookingForm from "./components/BookingForm/BookingForm";
import AboutUs from "./components/AboutUs/AboutUs";
import NumbersSpeak from "./components/NumbersSpeak/NumbersSpeak";
import CallToAction from "./components/CallToAction/CallToAction";
import ChooseTaxi from "./components/ChooseTaxi/ChooseTaxi";
import RouteMap from "./components/RouteMap/RouteMap";
import WarehouseManager from "./components/WarehouseManager/WarehouseManager";
import "./App.css";
import WarehouseWorker from "./components/WarehouseWorker/WarehouseWorker";
import MaintenanceWorker from "./components/MaintenanceWorker/MaintenanceWorker";
import GarageManager from "./components/GarageManager/GarageManager";
import RepairWorker from "./components/RepairWorker/RepairWorker";
import TaxiDriver from "./components/TaxiDriver/TaxiDriver";
function App() {
  const numbersSpeakRef = useRef<HTMLElement>(null);

  const scrollToNumbersSpeak = () => {
    if (numbersSpeakRef.current) {
      numbersSpeakRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <Navigation />
      <Hero onLearnMoreClick={scrollToNumbersSpeak} />
      <BookingForm />
      <ChooseTaxi />
      <RouteMap />
      <Element name="numbersSpeak">
        <CallToAction />
      </Element>
      <AboutUs />
      <NumbersSpeak ref={numbersSpeakRef} />
      <WarehouseManager></WarehouseManager>
      <WarehouseWorker></WarehouseWorker>
      <MaintenanceWorker></MaintenanceWorker>
      <RepairWorker></RepairWorker>
      <GarageManager></GarageManager>
<TaxiDriver></TaxiDriver>
    </div>
  );
}

export default App;

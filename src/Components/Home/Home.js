import React from "react";
import CarouselsSlide from "./CarouselsSlide/CarouselsSlide";
import Company from "./Company/Company";
import Feedbacks from "./Feedback/Feedbacks";
import FooterForm from "./FooterForm/FooterForm";
import "./Home.css";
import HomeInfo from "./HomeInfo/HomeInfo";
import Navigation from "./Navigation/Navigation";
import HideOnScroll from "./HideAppBar/HideAppBar";
import Services from "./Services/Services";

const Home = () => {
  document.title = "Home";
  return (
    <>
      <main className="bgImg">
        <HideOnScroll />
        {/* <Navigation></Navigation>   */}
        <HomeInfo></HomeInfo>
      </main>
      <Company></Company>
      <Services></Services>
      <CarouselsSlide></CarouselsSlide>
      <Feedbacks></Feedbacks>
      <FooterForm></FooterForm>
    </>
  );
};

export default Home;

import Hero from "../components/Hero";
import ServiceSection from "../components/RatesBlock";
import StanSection from "../components/WhatWeOfferSection";
import LatestBlogShowcase from "../components/AboutSection";
import Testimonial from "../components/Testimonial";
import ContactUs from "../components/ContactUs";


export default async function HomePage() {

  return (
    <>
      <Hero />

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "1100px" }}>
        {/* <ServiceSection /> */}
      </div>

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}>
        <LatestBlogShowcase />
      </div>

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}>
        <StanSection />
        <Testimonial />
        <ContactUs />
      </div>
    </>
  );
}

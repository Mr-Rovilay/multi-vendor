import BestDeals from "@/components/BestDeals/BestDeals";
import Categories from "@/components/categories/Categories";
import Events from "@/components/Events/Events";
import Footer from "@/components/footer/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import TestimonialPage from "./TestimonialPage";
import FeaturedProduct from "@/components/featuredProudct/FeaturedProduct";


const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <TestimonialPage/>
      <Footer/>
    </>
  );
};

export default HomePage;

import BestDeals from "@/components/BestDeals/BestDeals";
import Categories from "@/components/categories/Categories";
import Events from "@/components/Events/Events";
import FeaturedProduct from "@/components/featuredProuct/featuredProuct";
import Footer from "@/components/footer/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import SponsoredPage from "@/components/sponsored/Sponsored";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <SponsoredPage/>
      <Footer/>
    </>
  );
};

export default HomePage;

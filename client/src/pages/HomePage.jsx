import BestDeals from "@/components/BestDeals/BestDeals";
import Categories from "@/components/categories/Categories";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories/>
      <BestDeals/>
    </>
  );
};

export default HomePage;

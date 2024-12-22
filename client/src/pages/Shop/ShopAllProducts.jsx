import AllProducts from "@/components/shop/AllProducts"
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"


const ShopAllProducts = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex  justify-between w-full">
  <div className="w-[60px] md:w-[330px]">
    <DashboardSidebar active={3}/>
  </div>
  <div className="flex justify-center w-full">
    <AllProducts/>
  </div>
</div>
</div>
  )
}

export default ShopAllProducts
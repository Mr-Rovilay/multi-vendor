import AllEvents from "@/components/shop/AllEvents"
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"


const ShopAllEvents = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex justify-between w-full">
  <div className="w-[60px] md:w-[330px]">
    <DashboardSidebar active={5}/>
  </div>
  <div className="flex justify-center w-full">
    <AllEvents/>
  </div>
</div>
</div>
  )
}

export default ShopAllEvents
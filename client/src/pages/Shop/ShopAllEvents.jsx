import AllEvents from "@/components/Shop/AllEvents"
import DashboardSidebar from "@/components/Shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/Shop/layout/ShopDashBoardHeader"


const ShopAllEvents = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex">
    <div className="w-[60px] md:w-[330px] fixed top-16 bottom-0">
    <DashboardSidebar active={5}/>
  </div>
  <div className="flex-1 ml-[60px] md:ml-[330px] pt-4 overflow-y-auto">
    <AllEvents/>
  </div>
</div>
</div>
  )
}

export default ShopAllEvents
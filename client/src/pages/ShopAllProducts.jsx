import AllProducts from "@/components/AllProducts"
import DashboardSidebar from "@/components/Shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/Shop/layout/ShopDashBoardHeader"


const ShopAllProducts = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex">
    <div className="w-[60px] md:w-[330px] fixed top-16 bottom-0">
    <DashboardSidebar active={3}/>
  </div>
  <div className="flex-1 ml-[60px] md:ml-[330px] pt-4 overflow-y-auto">
    <AllProducts/>
  </div>
</div>
</div>
  )
}

export default ShopAllProducts
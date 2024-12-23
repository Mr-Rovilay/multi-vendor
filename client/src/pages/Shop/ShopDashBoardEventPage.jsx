import CreateEvent from "@/components/shop/CreateEvent"
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"

const ShopDashBoardEventPage = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex items-center justify-between w-full">
      <div className="w-[60px] md:w-[330px]">
        <DashboardSidebar active={6}/>
      </div>
      <div className="flex justify-center w-full">
        <CreateEvent />
      </div>
    </div>
    </div>

  )
}

export default ShopDashBoardEventPage
import DashBoardSideBar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"


const ShopDashBoardPage = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex items-center justify-between w-full">
      <div className="w-[60px] md:w-[330px]">
        <DashBoardSideBar active={1}/>
      </div>
    </div>
    </div>
  )
}

export default ShopDashBoardPage
import DashBoardSideBar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"


const ShopDashBoardPage = () => {

  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex">
    <div className="w-[60px] md:w-[330px] fixed top-16 bottom-0">
        <DashBoardSideBar active={1}/>
      </div>
    </div>
    </div>
  )
}

export default ShopDashBoardPage
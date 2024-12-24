import AllCoupons from "@/components/shop/AllCoupons"
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"


const ShopAllCoupons = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="flex justify-between w-full">
  <div className="w-[60px] md:w-[330px]">
    <DashboardSidebar active={9}/>
  </div>
  <div className="flex justify-center w-full">
  <AllCoupons />
  </div>
</div>
</div>
  )
}

export default ShopAllCoupons
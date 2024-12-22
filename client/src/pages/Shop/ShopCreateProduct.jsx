import CreateProduct from "@/components/shop/CreateProduct"
import DashboardSidebar from "@/components/shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/shop/layout/ShopDashBoardHeader"

const ShopCreateProduct = () => {
  return (
    <div>
        <ShopDashBoardHeader/>
        <div className="flex items-center justify-between w-full">
      <div className="w-[60px] md:w-[330px]">
        <DashboardSidebar active={4}/>
      </div>
      <div className="flex justify-center w-full">
        <CreateProduct/>
      </div>
    </div>
    </div>
  )
}

export default ShopCreateProduct
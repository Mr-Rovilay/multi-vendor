import CreateProduct from "@/components/Shop/CreateProduct"
import DashboardSidebar from "@/components/Shop/layout/DashBoardSideBar"
import ShopDashBoardHeader from "@/components/Shop/layout/ShopDashBoardHeader"

const ShopCreateProduct = () => {
  return (
    <div>
        <ShopDashBoardHeader/>
        <div className="flex">
        <div className="w-[60px] md:w-[330px] fixed top-16 bottom-0">
        <DashboardSidebar active={4}/>
      </div>
      <div className="flex-1 ml-[60px] md:ml-[330px] pt-4 overflow-y-auto">
        <CreateProduct/>
      </div>
    </div>
    </div>
  )
}

export default ShopCreateProduct
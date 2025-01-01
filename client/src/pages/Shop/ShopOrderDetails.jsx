import Footer from "@/components/footer/Footer"
import ShopDashBoardHeader from "@/components/Shop/layout/ShopDashBoardHeader"
import OrderDetails from "@/components/Shop/OrderDetails/OrderDetails"

const ShopOrderDetails = () => {
  return (
    <div>
    <ShopDashBoardHeader/>
    <div className="py-8 mx-auto">

    <OrderDetails/>
    </div>
    <Footer/>

</div>
  )
}

export default ShopOrderDetails
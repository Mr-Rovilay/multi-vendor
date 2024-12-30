import Footer from "@/components/footer/Footer"
import Header from "@/components/layout/Header"
import UserOrderDetails from "@/components/userOrders/UserOrderDetails"



const OrderDetailsPage = () => {
  return (
    <>
    <Header />
    <div className="py-8 mx-auto">
          <UserOrderDetails />
        </div>
    <Footer />
    
    </>
  )
}

export default OrderDetailsPage
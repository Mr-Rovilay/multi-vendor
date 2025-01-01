import DashboardSidebar from '@/components/Shop/layout/DashBoardSideBar'
import ShopDashBoardHeader from '@/components/Shop/layout/ShopDashBoardHeader'
import WithDrawMoney from '@/components/Shop/WithDrawMoney'

const DashBoardWithdrawPage = () => {
  return (
    <div>
          <ShopDashBoardHeader />
      <div className="flex">
        <div className="w-[60px] md:w-[300px] fixed top-16 bottom-0">
          <DashboardSidebar active={7} />
        </div>
        <div className="flex-1 ml-[60px] md:ml-[300px] pt-4 overflow-y-auto">
          <WithDrawMoney />
        </div>
      </div>
    </div>
  )
}

export default DashBoardWithdrawPage
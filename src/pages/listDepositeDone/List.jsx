import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableDepositeDone from "../../components/dataDepositeDone/Datatable"

const ListDepositeDone = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableDepositeDone/>
      </div>
    </div>
  )
}

export default ListDepositeDone
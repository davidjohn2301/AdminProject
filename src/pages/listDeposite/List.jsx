import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableDeposite from "../../components/dataDeposite/Datatable"

const ListDeposite = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableDeposite/>
      </div>
    </div>
  )
}

export default ListDeposite
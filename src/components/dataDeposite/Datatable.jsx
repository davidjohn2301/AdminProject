import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../dataDeposite/datatablesource";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AcceptDeposite, Rewards } from "../../store/auth";
import { toast } from "react-hot-toast";

const DatatableDeposite = () => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState();
  const [idRef, setIdRef] = useState()

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "deposite/"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const status = doc.data().status
          if(status === 'Pending'){
            list.push({ id: doc.id, ...doc.data() });
          }
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      },
    );
    return () => {
      unsub();
    };
  }, []);

  const handleAccept = async (id) => { 
    try {
      const depositeRef = doc(db, "deposite", id);
      await updateDoc(depositeRef, {
        status: "Success",
      });
     
      const unsub = onSnapshot(
        depositeRef,
        async (snapShot) => {
          const data = snapShot.data()
            const idWallet = data.userId
            const amount = data.amount
            setAmount(amount)
            setIdRef(idRef)
            await AcceptDeposite(amount, idWallet)
          }
          )
          setData(data.filter((item) => item.id !== id));
          
        } catch (err) {
          console.log(err);
        }
  };

  const handleCancel = async (id) => {
    try {
      const depositeRef = doc(db, "deposite", id);
      await updateDoc(depositeRef, {
        status: "Fail",
      });
      setData(data.filter((item) => item.id !== id));
      toast.success('Item cancel successfully')
      window.location.reload(false);
      
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={(params.row.status === "Pending") ? "cellAction" : "notActive"} id="action">
            <div className="acceptButton" id="accept" onClick={() => handleAccept(params.row.id)}>
              Accept
            </div>
            <div className="cancelButton" id="cancel" onClick={() => handleCancel(params.row.id)}>
              Cancel
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">User</div>
      <DataGrid className="datagrid" rows={data} columns={userColumns.concat(actionColumn)} pageSize={9} rowsPerPageOptions={[9]} />
    </div>
  );
};

export default DatatableDeposite;

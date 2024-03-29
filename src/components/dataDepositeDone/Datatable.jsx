import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../dataDeposite/datatablesource";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, onSnapshot, setDoc, where, updateDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { AcceptDeposite, Rewards } from "../../store/auth";

const DatatableDepositeDone = () => {
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "deposite"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();
    
    const unsub = onSnapshot(
      collection(db, "deposite/"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const status = doc.data().status
          if(status === 'Success' || status === 'Fail'){
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={(params.row.status === "Pending") ? "cellAction" : "notActive"} id="action">
            <div className="acceptButton" id="accept" >
              Accept
            </div>
            <div className="cancelButton" id="cancel" >
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

export default DatatableDepositeDone;

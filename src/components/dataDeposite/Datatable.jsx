import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../dataDeposite/datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,where
} from "firebase/firestore";
import { ref, set } from 'firebase/database'
import { db } from "../../firebase";

const DatatableDeposite = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "deposite"));
        querySnapshot.forEach((doc) => {
          // const userEmail = userData(doc.userId)
          // console.log(doc.data())
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        // console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    const unsub = onSnapshot(
      collection(db, "users/"),where("userId", "==",data.userId),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUser(list);
      },
      (error) => {
        console.log(error);
      }
    );

  }, []);

  // function userData(id){
  //   const userRef = ref(db, 'user/' + id + 'email')
  //   setUser(userRef)
  //   return user
  // }

  const handleAccept = async (id) => {
    try {
      await setDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
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
          <div className="cellAction">
            <div
              className="acceptButton"
              onClick={() => handleAccept(params.row.id)}
            >
              Accept
            </div>
            <div
              className="cancelButton"
              onClick={() => handleCancel(params.row.id)}
            >
              Cancel
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        User
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableDeposite;

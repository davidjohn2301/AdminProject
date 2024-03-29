export const userColumns = [
  { field: "createdAt", headerName: "Created At", width: 200 },
  {
    field: "email",
    headerName: "User",
    width: 250,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
  },
  {
    field: "txhash",
    headerName: "Tx Hash",
    width: 500,
    renderCell: (params) => {
      return (
        <div className={``}>
          {(params.row.txhash).slice(-66)}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

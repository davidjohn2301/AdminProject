export const userColumns = [
  { field: "createdAt", headerName: "createdAt", width: 200 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.profilePic} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },

  {
    field: "refId",
    headerName: "Referral By ID",
    width: 200,
  },
  {
    field: "availability",
    headerName: "Available for Withdrawal",
    width: 200,
  },
];

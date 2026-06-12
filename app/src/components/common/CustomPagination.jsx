"use client";
import React from 'react'
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <Pagination
        page={page}
        count={totalPages}
        onChange={handlePageChange}
        variant="outlined"
        sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",

            "& .MuiPagination-ul": {
                gap: "8px",
            },

            "& .MuiPaginationItem-root": {
                color: "#ff7700",
                borderColor: "#ff7700",
                transition: "all 0.3s ease-in-out"
            },

            "& .MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(255, 119, 0, 0.4) !important",
                color: "#000000",
                transform: "scale(1.1)",
            },

            "& .Mui-selected": {
                backgroundColor: "rgba(255, 119, 0, 0.2) !important",
                color: "#000000",
                borderColor: "#ff7700",
                boxShadow: "0 4px 12px rgba(255, 119, 0, 0.1)",
                transition: "all 0.3s ease-in-out"
            },
            "& .Mui-selected:hover": {
                backgroundColor: "rgba(255, 119, 0, 0.6) !important",
                // color: "#ffffff"
            },
        }}
    />
  )
}

export default React.memo(CustomPagination)
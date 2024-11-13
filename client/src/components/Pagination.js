"use client";

import { songSearchAction } from "@/store/slices/songSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Pagination = ({ setLoading }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      songSearchAction(null, { query: "arjit singh", page: page, limit: 20 })
    );
  }, [page]);

  return (
    <div className="join">
      <button
        onClick={() => {
          setLoading(true);
          setPage((prev) => {
            if (prev === 1) return prev;
            else return prev - 1;
          });
          window.setLoading = setLoading;
        }}
        className="join-item btn"
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        onClick={() => {
          setLoading(true);
          setPage((prev) => prev + 1);
          window.setLoading = setLoading;
        }}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;

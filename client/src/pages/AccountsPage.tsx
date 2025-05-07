import React, { useEffect, useState } from "react";
import { useAccounts } from "../contexts/accountContext";
import { useAuth } from "../contexts/authContext";
import AddAccountForm from "../components/AddAccountForm";

const AccountsPage = () => {
  const { user, token } = useAuth();
  const { accounts, fetchAccounts, deleteAccount, updateAccount } = useAccounts();

  const [showForm, setShowForm] = useState(false);
  const [sortKey, setSortKey] = useState<"accountType" | "balance">("balance");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  useEffect(() => {
    if (user && token) {
      fetchAccounts(sortKey, sortDirection, limit, page);
    }
  }, [user, token, sortKey, sortDirection, page, fetchAccounts]);

  const handleSort = (key: "accountType" | "balance") => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleEdit = (account: any) => {
    console.log("Edit", account);
  };

  const handleDelete = (id: number) => {
    console.log("Delete account with ID:", id);
    deleteAccount(id);
    fetchAccounts(sortKey, sortDirection, limit, page)
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Accounts</h1>
            <button
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
              onClick={() => setShowForm(true)}
            >
              + ADD NEW
            </button>
            {showForm && <AddAccountForm onClose={() => setShowForm(false)} />}
          </div>

          {/* Filters */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Table */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
            {!accounts || accounts.length === 0 ? (
              <p>No accounts found.</p>
            ) : (
              <>
                <table className="w-full text-center table-fixed mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="w-1/3 py-2">
                        <button onClick={() => handleSort("accountType")}>
                          Account Type{" "}
                          {sortKey === "accountType"
                            ? sortDirection === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </button>
                      </th>
                      <th className="w-1/3 py-2">
                        <button onClick={() => handleSort("balance")}>
                          Balance{" "}
                          {sortKey === "balance"
                            ? sortDirection === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </button>
                      </th>
                      <th className="w-1/3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((acc) => (
                      <tr key={acc.accountID} className="border-t">
                        <td className="py-2">{acc.accountType}</td>
                        <td className="py-2">₱{acc.balance}</td>
                        <td className="py-2 space-x-2">
                          <button
                            className="text-white bg-blue-700 px-4 py-1 rounded-xl hover:underline"
                            onClick={() => handleEdit(acc)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-white bg-red-700 px-4 py-1 rounded-xl hover:underline"
                            onClick={() => handleDelete(acc.accountID)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center space-x-4 mt-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-xl disabled:opacity-50"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span className="text-lg font-medium">Page {page}</span>
                  <button
                    className="bg-[#A64DFF] px-8 py-2 rounded-xl"
                    onClick={handleNextPage}
                    disabled={accounts.length < limit}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountsPage;

import React, { useEffect, useState, useCallback } from "react";
import { useAccounts } from "../contexts/accountContext";
import { useAuth } from "../contexts/authContext";
import AddAccountForm from "../components/AddAccountForm";
import EditAccountForm from "../components/EditAccountForm";
import { Account } from "@/interfaces/interfaces";
import { GetAccountsOptions } from "@/interfaces/QueryOptions";

const AccountsPage = () => {
  const { user, token } = useAuth();
  const { accounts, accountCount, fetchAccounts, deleteAccount, updateAccount } = useAccounts();

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [sortKey, setSortKey] = useState<keyof Account>("balance");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState<Account[] | undefined>(accounts);

  const fetchAccountsData = useCallback(
    (currentPage: number, currentSortKey: keyof Account, currentSortDirection: "asc" | "desc", currentSearchTerm: string = "") => {
      if (user && token) {
        setLoading(true);
        const options: GetAccountsOptions = {
          page: currentPage,
          limit: limit,
          sortField: currentSortKey,
          sortBy: currentSortDirection,
          search: currentSearchTerm,
        };
        fetchAccounts(options).finally(() => setLoading(false));
      }
    },
    [user, token, fetchAccounts, limit]
  );

  useEffect(() => {
    fetchAccountsData(page, sortKey, sortDirection, searchTerm);
  }, [fetchAccountsData, page, sortKey, sortDirection, searchTerm]);

  useEffect(() => {
    if (accounts) {
      setFilteredAccounts(
        accounts.filter((acc) =>
          acc.accountType.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredAccounts(undefined);
    }
  }, [accounts, searchTerm]);

  const handleSort = (key: keyof Account) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setPage(1);
  };

  const handleSave = async (
    accountID: number,
    balance: number,
    accountType: string
  ) => {
    if (editAccount) {
      await updateAccount(accountID, balance, accountType);
      setShowEditForm(false);
      fetchAccountsData(page, sortKey, sortDirection, searchTerm);
    }
  };

  const handleEdit = (account: Account) => {
    setEditAccount(account);
    setShowEditForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteAccount(id);
    fetchAccountsData(page, sortKey, sortDirection, searchTerm);
  };

  const handleNextPage = () => {
    if (page < Math.ceil((accountCount ?? 0) / limit)) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil((accountCount ?? 0) / limit);

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Accounts</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Add Account Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <AddAccountForm onClose={() => setShowForm(false)} />
            </div>
          )}

          {/* Edit Account Form Modal */}
          {showEditForm && editAccount && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <EditAccountForm
                account={editAccount}
                onClose={() => setShowEditForm(false)}
                onSave={handleSave}
              />
            </div>
          )}

          {/* Search Bar */}
          <div className="w-full bg-white border border-[#A64DFF] rounded-xl p-4 flex items-center gap-4">
            <label htmlFor="accountSearch" className="text-lg font-medium">
              Search by Type:
            </label>
            <input
              type="text"
              id="accountSearch"
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Enter account type"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Account Table */}
          <div className="mt-6 bg-white border border-[#A64DFF] rounded-lg shadow-md overflow-x-auto">
            {loading ? (
              <p>Loading accounts...</p>
            ) : !filteredAccounts || filteredAccounts.length === 0 ? (
              <p>No accounts found.</p>
            ) : (
              <>
                <table className="w-full text-left">
                  <thead className="bg-[#F4E1FF]">
                    <tr>
                      <th
                        className="py-3 px-6 cursor-pointer"
                        onClick={() => handleSort("accountType")}
                      >
                        Account Type{" "}
                        {sortKey === "accountType" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="py-3 px-6 cursor-pointer"
                        onClick={() => handleSort("balance")}
                      >
                        Balance{" "}
                        {sortKey === "balance" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="py-3 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.map((acc) => (
                      <tr key={acc.accountID} className="border-t">
                        <td className="py-3 px-6">{acc.accountType}</td>
                        <td className="py-3 px-6">₱{acc.balance}</td>
                        <td className="py-3 px-6 space-x-2">
                          <button
                            className="bg-blue-500 text-white px-4 py-1 rounded-2xl mr-2"
                            onClick={() => handleEdit(acc)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded-2xl"
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
                <div className="flex justify-between items-center w-full px-2">
                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <div className="flex gap-4">
                    <button
                      className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                      onClick={handlePrevPage}
                      disabled={page === 1}
                    >
                      Prev
                    </button>
                    <button
                      className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                      onClick={handleNextPage}
                      disabled={page >= totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showEditForm && editAccount && (
        <EditAccountForm
          account={editAccount}
          onClose={() => setShowEditForm(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
};

export default AccountsPage;  
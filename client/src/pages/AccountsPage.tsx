import React, { useContext, useEffect, useState } from "react";
import { useAcc } from "../contexts/accountContext";
import { useAuth } from "../contexts/authContext";
import AddAccountForm from "../components/AddAccountForm";

type Props = {};

const AccountsPage = (props: Props) => {
  const { user, token } = useAuth();
  const { accounts, getAccounts } = useAcc();
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    if (user && token) {
      getAccounts(user.userID, token);
    }
  }, [user, token]);


  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">

          {/* Top Row */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Accounts</h1>
            <button className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg " onClick={() => setShowForm(true)}>
              + ADD NEW
            </button>
            {showForm && <AddAccountForm onClose={() => setShowForm(false)} />}

          </div>

          {/* Summary / Filters Section */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Data Table / Entries */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4">
            {accounts?.length === 0 ? (
              <p>No accounts found.</p>
            ) : (
              <ul className="space-y-2">
                {accounts?.map((acc) => (
                  <li
                    key={acc.accountID}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>{acc.accountType}</span>
                    <span>₱{acc.balance}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end w-full">
            <div className="flex gap-4">
              <button className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF]">Prev</button>
              <button className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF]">Next</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AccountsPage;

import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAccounts } from "../contexts/accountContext";
import { useAuth } from "../contexts/authContext";
import AddAccountForm from "../components/AddAccountForm";

type Props = {};

const AccountsPage = (props: Props) => {
  const { user, token } = useAuth();
  const { accounts, fetchAccounts } = useAccounts();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchAccounts();
    }
  }, [user, token]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "accountType",
        header: "Account Type",
      },
      {
        accessorKey: "balance",
        header: "Balance",
        cell: (info) => `₱${info.getValue()}`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: accounts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    initialState: { pagination: { pageSize: 5 } }
  });

  return (
    <section className="absolute top-45 left-25 z-0">
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">
          {/* Top Row */}
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

          {/* Summary / Filters Section */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Data Table / Entries */}
          <div className="w-full min-h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4 overflow-x-auto">
            {accounts?.length === 0 ? (
              <p>No accounts found.</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="py-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getPaginationRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center w-full px-2">
            <span className="text-sm text-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <div className="flex gap-4">
              <button
                className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Prev
              </button>
              <button
                className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF] disabled:opacity-40"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountsPage;

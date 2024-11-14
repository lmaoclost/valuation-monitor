import { DataTable, columns, Payment } from "./components/table";

async function getData(): Promise<Payment[]> {
  // Dados de exemplo ou a chamada para sua API
  return [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="w-full sm:w-1/3 bg-gray-900 text-white rounded-lg shadow-lg p-6">
        <main className="flex flex-col gap-8">
          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
}

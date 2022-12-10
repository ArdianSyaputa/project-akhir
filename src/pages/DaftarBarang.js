import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

// method yang berfungsi get/menampilkan melalui db.json yang di buat
// ada method untuk delte data melalui id yang di baca oleh sistem
export default function Home() {
  const [barang, setBarang] = useState([]);

  const history = useHistory();

  const getAll = async () => {
    await axios
      .get("http://localhost:8000/daftarBarang")
      .then((res) => {
        setBarang(res.data);
      })
      .catch((error) => {
        alert("Terjadi keasalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const deleteUser = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(" http://localhost:8000/daftarBarang/" + id);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
    getAll();
  };

  const loginn = () => {
    history.push("/login")
  } 

  const beli = async (barang) => {
    await axios.post("http://localhost:8000/cart", barang);
    console.log(barang);
  };

  return (
    <div className="container my-5" >
       <h1 class="text-center text-2xl font-bold text-indigo-100 sm:text-3xl">
      Silahkan Memilih Menu Di Bawah 
    </h1>
    <br />
      {barang.length !== 0 ? (
        <>
          <div className="grid grid-cols-4 gap-3">
            {barang.map((makanan) => {
              return (
                <p class="relative block overflow-hidden group">
                 

                  <img
                    src={makanan.image}
                    alt=""
                    class="object-cover w-full h-64 transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <div class="relative p-6 bg-slate-900 border border-gray-100">
                    <span class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                      {makanan.kadarluwasa}
                    </span>

                    <h1 class="mt-4 text-lg font-medium text-gray-100">
                      {makanan.nama}
                    </h1>

                    <h3 class="mt-1.5 text-sm text-white">
                      Rp.{makanan.harga}
                    </h3>

                    <p class="mt-1.5 text-sm text-gray-100">{makanan.deskripsi}</p>


                    {localStorage.getItem("id") === null ? (
                      <>
                        <button 
                              onClick={loginn}
                              className="block w-full py-3 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105"
                            >
                            Login Terlebih Dahulu
                            </button>
                      </>
                    ) : (
                      <>
                        {localStorage.getItem("role") === "admin" ? (
                          <>
                            <button
                              onClick={() => deleteUser(makanan.id)}
                              className="block w-full py-3 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105"
                            >
                              Hapus
                            </button>
                            <br />
                            <a href={"/edit/" + makanan.id} className="no-underline text-black">
                              <button className="block w-full py-3 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105 ">
                                Ubah
                              </button>
                            </a>
                          </>
                        ) : (
                          <>
                            <button className="block w-full py-3 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105">
                              Add to Cart
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </p>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h1>Belum Ada Data </h1>
        </>
      )}
    </div>
  );
}

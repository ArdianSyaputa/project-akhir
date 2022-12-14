import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useHistory, useParams } from "react-router-dom";
import Cart from "./Cart";

export default function Tampilan() {
  const [barang, setBarang] = useState([]);
  const history = useHistory();

  const param = useParams();

  const getAllById = async () => {
    await axios
      .get("http://localhost:8000/daftarBarang/" + param.id)
      .then((res) => {
        setBarang(res.data);
      })
      .catch((error) => {
        alert("Terjadi keasalahan" + error);
      });
  };
  const beli = async () => {
    await axios.post("http://localhost:8000/carts", barang);
    Swal.fire({
      icon: 'success',
      title: barang.nama + 'Berhasil di pesan',
      showConfirmButton: false,
      timer: 1500
    })
    
  };
  //   console.log(barang);
  useEffect(() => {
    getAllById();
  }, []);
  return (
    <div>
     
      <section>
        <div class="relative max-w-screen-xl px-4 py-8 mx-auto">
          <div class="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
            <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
              <img
                // alt={makanan.image}
                src={barang.image}
                class="object-cover w-full aspect-square rounded-xl"
              />
            </div>

            <div class="sticky top-0">
              <div class="flex justify-between mt-8">
                <div class="max-w-[35ch]">
                  <h1 class="text-2xl font-bold  text-white">
                    {barang.nama}
                  </h1>
                  <div class="mt-2 -ml-0.5 flex"></div>
                </div>
                <p class="text-lg font-bold  text-white">Rp.{barang.harga}</p>
              </div>

              <details class="group relative mt-4">
                <summary class="block">
                  <div>
                    <div class="prose max-w-none text-white">
                      <p>
                      {barang.deskripsi}
                      </p>
                    </div>
                  </div>
                </summary>
              </details>

              <form class="grid grid-cols-6 gap-4">
          <div class="col-span-3">
            <label 
              for="FirstName"
              class="block text-xs font-medium text-gray-100"
            required>
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              class="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div class="col-span-3">
            <label
              for="LastName"
              class="block text-xs font-medium text-gray-100"
            >
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              class="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div class="col-span-6">
            <label for="Email" class="block text-xs font-medium text-gray-100">
              Alamat
            </label>

            <input
              type="email"
              id="Email"
              class="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div class="col-span-6">
            <label for="Phone" class="block text-xs font-medium text-gray-100">
              No.Hp
            </label>

            <input
              type="tel"
              id="Phone"
              class="w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <fieldset class="mt-4">
            <legend class="mb-1 text-sm font-medium">Size</legend>

            <div class="flow-root">
              <div class="-m-0.5 flex flex-wrap">
                <label for="size_xs" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_xs"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    XS
                  </span>
                </label>

                <label for="size_s" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_s"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    S
                  </span>
                </label>

                <label for="size_m" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_m"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    M
                  </span>
                </label>

                <label for="size_l" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_l"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    L
                  </span>
                </label>

                <label for="size_xl" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_xl"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    XL
                  </span>
                </label>
              </div>
            </div>    
          </fieldset>


         

          <div class="col-span-6">
            {/* <a  href={"/cart/"}  className="no-underline"> */}
          <button
                    type="submit"
                    onClick={() => beli()}
                    class="block px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500"
                  >
                    Add to Cart
                  </button>

          </div>
        </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import "../css/Cart.css";
import { Button } from "react-bootstrap";
const Cart = ({ Makanan, setMakanan, handleChange }) => {
const [cart, setCart] = useState([]);

  const getAll = () => {
    axios
      .get("http://localhost:8000/carts")
      .then((res) => {
        setCart(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "memunculkan data",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const deleteCart = async (id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("  http://localhost:8000/carts/" + id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        window.location.reload();
      }
    });

    getAll();
  };
  useEffect(() => {
    getAll();
  }, []);
  console.log(Makanan);

  const TotalHarga = cart.reduce(function (result, item) {
    return result + item.harga;
  }, 0);

  return (
    <div>
      <div>
        <table
          className="table table-bordered mx-10 my-5 "
          style={{ width: 1280 }}
        >
          <thead>
            <tr className="text-white">
              <th className="header">No</th>
              <th className="header">img</th>
              <th className="header">nama</th>
              <th className="header">harga</th>
              <th className="header">Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {cart.map((carts, index) => {
              return (
                <tr key={carts.id}>
                  <td>{index + 1}</td>
                  <td className="w-40">
                    <img src={carts.image} alt="" />{" "}
                  </td>
                  <td>{carts.nama}</td>
                  <td>{carts.harga}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="ml-2 text-white rounded-lg p-2 mb-3"
                      onClick={() => deleteCart(carts.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex text-white">
          <div className="border-2 border-green-500 w-60 m-4 text-center ">
            <p>
              Total Harga:Rp
              {TotalHarga}
            </p>
          </div>
          <div className="pt-2">
            <button className="m-4 bg-amber-700 text-white rounded-lg p-2 hover:bg-amber-600 mb-3 ">
              cekout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
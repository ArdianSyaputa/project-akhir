import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function Home() {
  const [buku, setBuku] = useState([]);

  const history = useHistory();

  const getAll = async () => {
    await axios
      .get("http://localhost:8000/daftarBarang")
      .then((res) => {
        setBuku(res.data);
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
  return (
      <div className="container my-5" >
        <h1 className='text-white'>Selamat Datang Di Warung Online</h1>
        <br />
        <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100 h-80"
          src="https://accurate.id/wp-content/uploads/2021/01/warung-makan-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100  h-80"
          src="https://cdn.idntimes.com/content-images/post/20171228/dscf5546-8c417efd89272b6d226313d6bb3509fe_600x400.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100  h-80"
          src="https://lelogama.go-jek.com/post_featured_image/General_1.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

 <br />
      <br />
        {buku.length !== 0 ? (
          <>
            <div className="grid grid-cols-4 gap-3">
              {buku.map((book) => {
                return (
                  <p class="relative block overflow-hidden group">
                   
  
                    <img
                      src={book.image}
                      alt=""
                      class="object-cover w-full h-64 transition duration-500 group-hover:scale-105 sm:h-72"
                    />
  
                    <div class="relative p-6 bg-slate-900 border border-gray-100">
                      <span class="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                        {book.kadarluwasa}
                      </span>
  
                      <h1 class="mt-4 text-lg font-medium text-gray-100">
                        {book.nama}
                      </h1>
  
                      <h3 class="mt-1.5 text-sm text-white">
                        Rp.{book.harga}
                      </h3>
  
                      <p class="mt-1.5 text-sm text-gray-100">{book.deskripsi}</p>
  
  
                      {localStorage.getItem("id") === null ? (
                        <>
                        <a href='/daftar'>
                          <button 
                                onClick={loginn}
                                className="block w-full py-3 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105"
                              >
                              Detail
                              </button>
                              </a>
                        </>
                      ) : (
                     <br></br>
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

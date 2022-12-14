import React, { useState } from "react";
import { Container, Nav, Navbar, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useHistory } from "react-router-dom";
export default function NavigationBar() {
  const [show, setShow] = useState(false);
  const [nama, setnama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kadarluwasa, setKadarluwasa] = useState("");
  const [harga, setHarga] = useState("");
  const [image, setImage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  const addUser = async (e) => {
    e.preventDefault();
    Swal.fire("Good job!", "You clicked the button!", "success");
    const data = {
      nama: nama,
      deskripsi: deskripsi,
      kadarluwasa: kadarluwasa,
      harga: harga,
      image: image,
    };

    await axios
      .post("http://localhost:8000/daftarBarang", data)
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <Navbar bg='dark' expand="lg">
        <img src="https://p4.wallpaperbetter.com/wallpaper/559/833/229/fate-series-minimalism-black-background-red-wallpaper-preview.jpg" alt=""  style={{ width: 80 }} />
        <Container>
          <Navbar.Brand href="/"  className=" text-white">Warung Sederhana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/daftar" className=" text-white">Daftar Menu</Nav.Link>
             
              {localStorage.getItem("role") === "user" && (
              <Nav.Link className="text-white" href="/cart"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            </Nav.Link>
            )}
            </Nav>
            {localStorage.getItem("role") === "admin" && (
              <button  className="btn text-white" onClick={handleShow}>
                Tambah Menu
              </button>
            )}
           {localStorage.getItem("id") !== null ? (
             <a class="btn text-white" onClick={logout}>
             Logout
           </a>
           ) : (
            <a  className = "btn  text-white" href="/login">
            login
          </a>
           )}

         
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={addUser}>
            <Form.Group className="mb-3">
              <Form.Label>Produk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter nama"
                onChange={(e) => setnama(e.target.value)}
                value={nama}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter deskripsi"
                onChange={(e) => setDeskripsi(e.target.value)}
                value={deskripsi}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kadarluwasa</Form.Label>
              <Form.Control
                type="date"
                placeholder="KadarLuwasa"
                onChange={(e) => setKadarluwasa(e.target.value)}
                value={kadarluwasa}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
           
                placeholder="Input Hrga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="url"
                placeholder="Input Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            {/* Untuk menghilangkan model */}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            ||
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

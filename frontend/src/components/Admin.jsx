import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => (
  <div
    style={{
      padding: "12px 0px",
      backgroundColor: "rgb(232, 227, 227)",
      textAlign: "center",
      position: "sticky",
      top: "0",
      width: "100%",
      height: "85px",
      zIndex: "999",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div className="text-center">
      <h5>
        <a href="/" style={{ textDecoration: "none", color: "blue" }}>
          Admin Panel
        </a>
      </h5>
    </div>
    <div className="text-center pt-1">
      <Link
        to="/admin/products"
        style={{ textDecoration: "none", color: "black", margin: "0 15px" }}
      >
        <i className="bi bi-box-seam mx-2" style={{ fontSize: "20px" }}></i>
        Products
      </Link>
      <Link
        to="/admin/orders"
        style={{ textDecoration: "none", color: "black", margin: "0 15px" }}
      >
        <i className="bi bi-receipt mx-2" style={{ fontSize: "20px" }}></i>
        Orders
      </Link>
      <Link
        to="/profile"
        style={{ textDecoration: "none", color: "black", margin: "0 15px" }}
      >
        <i className="bi bi-person-circle mx-2" style={{ fontSize: "20px" }}></i>
        Profile
      </Link>
      <Link
        to="/login"
        style={{ textDecoration: "none", color: "black", margin: "0 15px" }}
      >
        <i className="bi bi-box-arrow-right mx-2" style={{ fontSize: "20px" }}></i>
        Logout
      </Link>
    </div>
  </div>
);

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    type: "Non-Perishable",
    expiryHours: { hours: "", minutes: "", seconds: "" },
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Expiry Check Logic
  const handleExpiryCheck = () => {
    const updatedProducts = products.map((product) => {
      if (product.type === "Perishable" && product.createdAt) {
        const elapsedTime = Date.now() - product.createdAt;
        const remainingTime = product.expiryHours - elapsedTime;

        if (remainingTime <= 0) {
          return { ...product, stock: 0, remainingTime: "Expired" };
        }

        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        return {
          ...product,
          remainingTime: `${hours}h ${minutes}m ${seconds}s`,
        };
      }
      return { ...product, remainingTime: null };
    });

    setProducts(updatedProducts);
  };

  useEffect(() => {
    const timer = setInterval(handleExpiryCheck, 1000); // Check every second
    return () => clearInterval(timer);
  }, [products]);

  // Add Product Handler
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill all fields!");
      return;
    }

    let expiryInMs = null;
    if (newProduct.type === "Perishable") {
      const { hours = 0, minutes = 0, seconds = 0 } = newProduct.expiryHours || {};
      expiryInMs =
        (parseInt(hours, 10) || 0) * 3600000 +
        (parseInt(minutes, 10) || 0) * 60000 +
        (parseInt(seconds, 10) || 0) * 1000;

      if (!expiryInMs) {
        alert("Please provide a valid expiry time.");
        return;
      }
    }

    const newId = products.length ? products[products.length - 1].id + 1 : 1;

    const newProductData = {
      ...newProduct,
      id: newId,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
      expiryHours: expiryInMs,
      createdAt: newProduct.type === "Perishable" ? Date.now() : null,
    };

    // Handle image upload
    if (newProduct.image) {
      newProductData.image = URL.createObjectURL(newProduct.image);
    }

    setProducts([...products, newProductData]);

    setNewProduct({
      name: "",
      price: "",
      stock: "",
      type: "Non-Perishable",
      expiryHours: { hours: "", minutes: "", seconds: "" },
      image: null,
    });
  };

  // Update Product Handler
  const handleUpdateProduct = () => {
    if (!editingProduct.name || !editingProduct.price || !editingProduct.stock) {
      alert("Please fill all fields!");
      return;
    }

    let expiryInMs = null;
    if (editingProduct.type === "Perishable") {
      const { hours = 0, minutes = 0, seconds = 0 } = editingProduct.expiryHours || {};
      expiryInMs =
        (parseInt(hours, 10) || 0) * 3600000 +
        (parseInt(minutes, 10) || 0) * 60000 +
        (parseInt(seconds, 10) || 0) * 1000;
    }

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? { ...editingProduct, expiryHours: expiryInMs }
        : product
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  // Remove Product Handler
  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handling the changes while editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: value,
    });
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0],
    });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <AdminHeader />
      <h2 className="text-center mb-4">Admin - Manage Products</h2>

      {/* Add Product Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Add New Product</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={newProduct.price}
            min="0"
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Stock"
            value={newProduct.stock}
            min="0"
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          />
          <select
            className="form-control mb-2"
            value={newProduct.type}
            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
          >
            <option value="Non-Perishable">Non-Perishable</option>
            <option value="Perishable">Perishable</option>
          </select>
          {newProduct.type === "Perishable" && (
            <div className="mb-2">
              <label>Expiry Time:</label>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="Hours"
                  value={newProduct.expiryHours.hours}
                  min="0"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      expiryHours: { ...newProduct.expiryHours, hours: e.target.value },
                    })
                  }
                />
                <span>:</span>
                <input
                  type="number"
                  className="form-control me-2"
                  placeholder="Minutes"
                  value={newProduct.expiryHours.minutes}
                  min="0"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      expiryHours: { ...newProduct.expiryHours, minutes: e.target.value },
                    })
                  }
                />
                <span>:</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Seconds"
                  value={newProduct.expiryHours.seconds}
                  min="0"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      expiryHours: { ...newProduct.expiryHours, seconds: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          <div className="mb-2">
            <label>Product Image:</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
          </div>

          <button className="btn btn-primary" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>

      {/* Edit Product Section */}
      {editingProduct && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Edit Product</h5>
            <input
              type="text"
              className="form-control mb-2"
              name="name"
              value={editingProduct.name}
              onChange={handleEditChange}
            />
            <input
              type="number"
              className="form-control mb-2"
              name="price"
              value={editingProduct.price}
              min="0"
              onChange={handleEditChange}
            />
            <input
              type="number"
              className="form-control mb-2"
              name="stock"
              value={editingProduct.stock}
              min="0"
              onChange={handleEditChange}
            />
            <select
              className="form-control mb-2"
              name="type"
              value={editingProduct.type}
              onChange={handleEditChange}
            >
              <option value="Non-Perishable">Non-Perishable</option>
              <option value="Perishable">Perishable</option>
            </select>

            {editingProduct.type === "Perishable" && (
              <div className="mb-2">
                <label>Expiry Time:</label>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control me-2"
                    name="hours"
                    value={editingProduct.expiryHours.hours}
                    min="0"
                    onChange={(e) => {
                      const updatedExpiry = { ...editingProduct.expiryHours, hours: e.target.value };
                      setEditingProduct({ ...editingProduct, expiryHours: updatedExpiry });
                    }}
                  />
                  <span>:</span>
                  <input
                    type="number"
                    className="form-control me-2"
                    name="minutes"
                    value={editingProduct.expiryHours.minutes}
                    min="0"
                    onChange={(e) => {
                      const updatedExpiry = { ...editingProduct.expiryHours, minutes: e.target.value };
                      setEditingProduct({ ...editingProduct, expiryHours: updatedExpiry });
                    }}
                  />
                  <span>:</span>
                  <input
                    type="number"
                    className="form-control"
                    name="seconds"
                    value={editingProduct.expiryHours.seconds}
                    min="0"
                    onChange={(e) => {
                      const updatedExpiry = { ...editingProduct.expiryHours, seconds: e.target.value };
                      setEditingProduct({ ...editingProduct, expiryHours: updatedExpiry });
                    }}
                  />
                </div>
              </div>
            )}

            <button className="btn btn-warning" onClick={handleUpdateProduct}>
              Update Product
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="card">
        <div className="card-body">
          <h5>Product List</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Expiry Time</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.remainingTime || "N/A"}</td>
                  <td>
                    {product.image && <img src={product.image} alt="product" width="50" />}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

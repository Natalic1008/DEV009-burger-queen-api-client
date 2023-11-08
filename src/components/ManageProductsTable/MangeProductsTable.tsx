import NavigateTo from "../Navigate/navigate";
import { products } from "../../Services/Request";
import { useEffect, useState } from "react";
import DropdownButton from "../DropdownButton/DropdownButton";
import AddProduct from "../AddProduct/AddProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import EditProduct from "../EditProduct/EditProduct";
import Table from 'react-bootstrap/Table';

export default function ManageProductsTable() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || "");
  const handleClick = NavigateTo("/admin/dashboard");
  const [allProducts, setAllProducts] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModals, setShowModals] = useState<{ [key: string]: boolean }>({});
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

  function getAllProducts(token:string) {
    products(token)
      .then((response) => {
        console.log("Response getProducts:", response);
        if (!response.ok) {
          throw new Error("No existe productos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data getProducts:", data);
        setAllProducts(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllProducts(token||"");
  }, [token]);

  const handleOpenModal = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
  };

  const handleOpenDelete = (id:string) => {
    setProductIdToDelete(id);
    setShowModalDelete(true);
  };

  const handleCloseDelete = () => {
    setProductIdToDelete(null);
    setShowModalDelete(false);
  };

  const handleDelete = () => {
    getAllProducts(token||"");
  };

  const handleOpenEdit = (id: string) => {
    setShowModals((prevModals) => ({ ...prevModals, [id]: true }));
  };

  const handleCloseEdit = (id: string) => {
    setShowModals((prevModals) => ({ ...prevModals, [id]: false }));
  };

  const addNewProduct = () => {
    setShowModalAdd(false);
    getAllProducts(token||"");
  };

  const updateProduct = () => {
    getAllProducts(token||"");
  };

  return(
  <>
     <div>
        <div >
          <img src="/src/assets/hamburguesa.png" onClick={handleClick} alt="Return to dashboard" />
          <h1>Manage Products</h1>
        </div>
        <img src="/src/assets/hamburguesa.png" onClick={handleOpenModal}  alt="Add new product" />
        {showModalAdd && (
          <AddProduct
            onClose={handleCloseModal}
            token={token}
            onAdd={addNewProduct}
          />
        )}
      </div>
      <Table
        data={allProducts}
        columns={["id", "type", "name", "price"]}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        DropdownButton={DropdownButton}
      />
      {allProducts.map((val, key) => (
        <div key={key}>
          {showModals[val.id] && (
            <EditProduct
              id={val.id}
              name={val.name}
              type={val.type}
              price={Number(val.price)}
              token={token}
              onClose={() => handleCloseEdit(val.id)}
              onEditSuccess={updateProduct}
            />
          )}
          {showModalDelete && (
            <DeleteProduct
              id={productIdToDelete}
              token={token}
              onClose={handleCloseDelete}
              onDelete={handleDelete}
            />
          )}
        </div>
      ))}
  </>

  );
}
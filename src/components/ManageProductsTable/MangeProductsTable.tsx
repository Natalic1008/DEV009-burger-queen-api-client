import NavigateTo from "../Navigate/navigate";
import { products } from "../../Services/Request";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddProduct from "../AddProduct/AddProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import EditProduct from "../EditProduct/EditProduct";

export default function ManageProductsTable() {
  const [token] = useState<string | null>(localStorage.getItem("token") || "");
  const handleClick = NavigateTo("/admin/dashboard");
  const [allProducts, setAllProducts] = useState<{ id: string; name: string; type: string; price: number; image:any; }[]>([]);
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
     <div className="d-flex align-items-center justify-content-between" style={{ width: '95%' }}>
        <div className="d-flex align-items-center">
          <img 
            src="/src/assets/IconoReturn.png"
            width="30"
            height="30" onClick={handleClick} alt="Return to dashboard" />
          <h2 className="ml-2">Manage Products</h2>
        </div>
        <Button variant="success" onClick={handleOpenModal} > Añadir productos </Button>
        {showModalAdd && (
          <AddProduct
            onClose={handleCloseModal}
            token={token||""}
            onAdd={addNewProduct}
          />
        )}
      </div>
      <Table striped bordered hover style={{ width: '95%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allProducts.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.type}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td><img src={product.image} height={30} /></td>
            <td>
              <Button
                variant="primary"
                onClick={() => handleOpenEdit(product.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleOpenDelete(product.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    {allProducts.map((val, key) => (
      <div key={key}>
        {showModals[val.id] && (
          <EditProduct
            id={val.id}
            name={val.name}
            type={val.type}
            price={Number(val.price)}
            image={val.image}
            token={token||""}
            onClose={() => handleCloseEdit(val.id)}
            onEditSuccess={updateProduct}
          />
        )}
        {showModalDelete && (
          <DeleteProduct
            id={Number(productIdToDelete)} 
            token={token||""}
            onClose={handleCloseDelete}
            onDelete={handleDelete}
          />
        )}
      </div>
    ))}
  </>

  );
}
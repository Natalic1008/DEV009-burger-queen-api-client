import { useState } from "react";
import { string, func } from "prop-types";
import { addProduct } from "../../Services/Request";
import Modal from "../Modal/Modal"

interface AddProductProps {
  onClose: () => void;
  token: string;
  onAdd: (product: any) => void; 
}

export default function AddProduct({ onClose, token, onAdd }: AddProductProps) {
  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addType, setAddType] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [error, setError] = useState("");

  function addNewProduct() {
    const priceAsNumber = parseFloat(addPrice);

  if (isNaN(priceAsNumber)) {
    setError("Price must be a number");
    return;
  }

  const data = {
    id: addId,
    name: addName,
    price: priceAsNumber,  // Convertir a número
    type: addType,
  };

    addProduct(data, token)
      .then((response) => {
        if (response.status === 500) {
          setError("ID already in use");
        }
        return response.json();
      })
      .then((product) => {
        onAdd(product);
        onClose();
        return product;
      })
      .catch(() => {
        setError("An error occurred while adding the user.");
      });
  }

  return (
    <Modal
      onClose={onClose}
      title="New Product"
      action={addNewProduct}
      nameAction="Add"
    >
      <div>
        <label>ID</label>
        <input
          type="text"
          value={addId}
          data-testid="id_product"
          onChange={(e) => setAddId(e.target.value)}
        />
        {error && (
          <div>
            <img src="/src/assets/hamburguesa.png"  alt="Error" />
            <span>
              {error}
            </span>
          </div>
        )}
      </div>
      <div>
        <label>Product</label>
        <input
          type="text"
          value={addName}
          data-testid="name_product"
          onChange={(e) => setAddName(e.target.value)}
        />
      </div>
      <div>
        <label>Menu</label>
        <select
          value={addType}
          data-testid="menu_product"
          onChange={(e) => setAddType(e.target.value)}
        >
          <option>--</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch/Dinner">Lunch/Dinner</option>
        </select>
      </div>
      <div>
        <label>Price</label>
        <input
          type="text"
          value={addPrice}
          data-testid="price_product"
          onChange={(e) => setAddPrice(e.target.value)}
        />
      </div>
    </Modal>
  );
}

AddProduct.propTypes = {
  onClose: func.isRequired,
  token: string.isRequired,
  onAdd: func.isRequired,
};
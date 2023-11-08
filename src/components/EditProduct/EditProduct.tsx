import { number, string, func } from "prop-types";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { editProduct } from "../../Services/Request";

interface EditProductProps {
  id: string;
  name: string;
  type: string;
  price: number;
  onClose: () => void;
  token: string;
  onEditSuccess: (data: { id: string; name: string; type: string; price: number }) => void;
}

export default function EditProduct({
  id,
  name,
  type,
  price,
  onClose,
  token,
  onEditSuccess,
}: EditProductProps) {
  const [editedName, setEditedName] = useState<string>(name);
  const [editedType, setEditedType] = useState<string>(type);
  const [editedPrice, setEditedPrice] = useState<string>(price.toString());

  function editProductById() {
    const updatedData = {
      id,
      type: editedType,
      name: editedName,
      price: parseFloat(editedPrice),
    };

    editProduct(id, updatedData, token)
      .then((response) => {
        if (response.ok) {
          onClose();
          onEditSuccess(updatedData);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud de edición", error);
      });
  }
  return (
    <>
      <Modal
        onClose={onClose}
        title="Edit Product"
        action={editProductById}
        nameAction="Save Changes"
      >
        <div>
          <label>ID</label>
          <input
            value={id}
            type="text"
            data-testid="id_edit_product"
            readOnly
          />
        </div>
        <div>
          <label>Product</label>
          <input
            value={editedName}
            type="text"
            data-testid="name_edit_product"
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div>
          <label>Menu</label>
          <select
            value={editedType}
            data-testid="menu_edit_product"
            onChange={(e) => setEditedType(e.target.value)}
          >
            <option>--</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch/Dinner">Lunch/Dinner</option>
          </select>
        </div>
        <div>
          <label>Price</label>
          <input
            value={editedPrice}
            type="text"
            data-testid="price_edit_product"
            onChange={(e) => setEditedPrice(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}
EditProduct.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  price: number.isRequired,
  onClose: func.isRequired,
  token: string.isRequired,
  onEditSuccess: func.isRequired,
};
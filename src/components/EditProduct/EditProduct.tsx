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
  image: any;
}

export default function EditProduct({
  id,
  name,
  type,
  price,
  onClose,
  token,
  onEditSuccess,
  image,
}: EditProductProps) {
  const [editedName, setEditedName] = useState<string>(name);
  const [editedType, setEditedType] = useState<string>(type);
  const [editedPrice, setEditedPrice] = useState<number>(price); 
  const [editedImage, setEditedImage] = useState(image); 

  function editProductById() {
    const updatedData = {
      id,
      type: editedType,
      name: editedName,
      price: editedPrice, 
      image: editedImage,
    };

    editProduct(parseFloat(id), updatedData, token)
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
            type="number" // Cambiado a tipo number
            data-testid="price_edit_product"
            onChange={(e) => setEditedPrice(parseFloat(e.target.value))} 
          />
        </div>
        <div>
          <label>Image</label>
          <input
            value={editedImage}
            type="img" 
            onChange={(e) => setEditedImage(e.target.value)} 
          />
        </div>
      </Modal>
    </>
  );
}
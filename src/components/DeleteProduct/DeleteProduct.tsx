import { deleteProduct } from "../../Services/Request";
import Modal from "../Modal/Modal";

interface DeleteProductProps {
    id: number;
    token: string;
    onClose: () => void;
    onDelete: (id: number) => void;
  }

export default function DeleteProduct({ id, token, onClose,  onDelete }: DeleteProductProps ) {

    function deleteProductById() {
        deleteProduct(id, token)
            .then((response) => {
                if (response.ok) {
                    onClose();
                    onDelete(id);
                } else {
                    console.error(response.status);
                }
            })
    }

    return (
        <>
            <Modal onClose={onClose} title="Delete Product" action={deleteProductById} nameAction="Yes, delete it.">
                <div>
                    <span>Do you want to delete this product?</span>
                </div>       
            </Modal>
        </>
    );
}


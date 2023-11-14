import { useState, useEffect, useRef } from "react";
import { func } from "prop-types";

interface DropdownButtonProps {
  optionEdit: () => void;
  optionDelete: () => void;
}

export default function DropdownButton({ optionEdit, optionDelete }: DropdownButtonProps) {

  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModalEdit = () => {
    optionEdit();
    setIsOpen(false);
  };

  const toggleModalDelete = () => {
    optionDelete();
    setIsOpen(false);
  };

  // Agregar un efecto para detectar clics en cualquier lugar de la página
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Agregar el controlador de eventos al documento cuando el menú está abierto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Limpiar el controlador de eventos cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropDownRef} >
      <img
        src="/src/assets/hamburguesa.png"
        onClick={toggleDropdown}
        alt="Options menu"
      />
      {isOpen && (
        <div>
          <span onClick={toggleModalEdit}>
            Edit
          </span>
          <span onClick={toggleModalDelete}>
            Delete
          </span>
        </div>
      )}
    </div>
  );
}

DropdownButton.propTypes = {
  optionEdit: func.isRequired,
  optionDelete: func.isRequired,
};
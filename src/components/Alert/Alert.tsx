import { Button } from "react-bootstrap";
import style from "../Alert/Alert.module.css"

type AlertProps = {
    type: "success" | "error"; 
    message: string;
    option: string;
    onClose: () => void;  
}

export default function Alert({ type, message, option, onClose }: AlertProps) {

  const alertStyle = type === "success" ? style.success : style.error;

  return (
    <>
      <div className={`modal ${style.alert}`} tabIndex={-1} data-testid="alert">
        <div
          className={`modal-dialog modal-dialog-centered ${style.alert_body}`}
        >
          <div className="modal-content">
            <div className={`modal-header ${style.header}`}>
              <Button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></Button>
            </div>
            <div className={`modal-body ${alertStyle}`}>
              {alertStyle === style.success ?
              <img 
              src="/src/assets/Icono_check.png"
              width="30"
              height="30" 
              className={style.success_icon} 
              alt="Success icon" /> :
              <img 
              src="/src/assets/Icono_exclamación.png"
              width="30"
              height="30" 
              className={style.error_icon} alt="Error icon" />
              }
              <br />
              <span>{message}</span>
            </div>
            <div className={`${style.footer} modal-footer`}>
              <Button
                type="button"
                className={`close ${style.close}`}
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">{option}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


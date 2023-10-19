import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { auth } from "../../Services/Request";
import LoginForm from "./LoginForm";

jest.mock("../../Services/Request", () => ({
  auth: jest.fn().mockResolvedValue(
    {
      ok: true,
      json: jest.fn().mockResolvedValue({
        accessToken: "token1234",
        user: { role: "waiter", name: "WaiterName" },
      }),
    }
  ),
}));
const navigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

describe("LoginForm", () => {
  let emailElement: Node | Window, passwordElement: Node | Window, buttonElement: Node | Window;

  beforeEach(() => {
    render(
      
        <LoginForm />
      
    );
    emailElement = screen.getByTestId("email_login");
    passwordElement = screen.getByTestId("password_login");
    buttonElement = screen.getByTestId("submit_login");
  });
  it("Deberia autenticar las credenciales del usuario como mesero y redirigir a la vista de mesero", async () => {
    
    fireEvent.change(emailElement, { target: { value: "waiter@example.com" } });
    fireEvent.change(passwordElement, { target: { value: "password123" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(auth).toHaveBeenCalledWith("waiter@example.com", "password123");
      expect(navigateMock).toHaveBeenCalledWith("/Waiter/orders");
    });
  });
}
)
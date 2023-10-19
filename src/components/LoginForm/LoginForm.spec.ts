import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { auth } from "../../Services/Request";
import LoginForm from "./LoginForm";

jest.mock("../../Services/Request", () => ({
  auth: jest.fn(),
}));
const navigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

describe("LoginForm", () => {
  
  beforeEach(() => {
    let emailElement, passwordElement, buttonElement;
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    emailElement = screen.getByTestId("email_login");
    passwordElement = screen.getByTestId("password_login");
    buttonElement = screen.getByTestId("submit_login");
  });
  it("Deberia autenticar al usuario como mesero", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        accessToken: "token123",
        user: { role: "Waiter", name: "WaiterName" },
      }),
    };

    auth.mockResolvedValueOnce(mockResponse);

    fireEvent.change(emailElement, { target: { value: "waiter@example.com" } });
    fireEvent.change(passwordElement, { target: { value: "password123" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(auth).toHaveBeenCalledWith("waiter@example.com", "password123");
      expect(navigateMock).toHaveBeenCalledWith("/waiter/order");
    });
  });}
)
import logo from "../../assets/hamburguesa.png"
export default function OrderList() {
    return (
      <main>
        <div className="Principal">
          <h1> BURGER QUEEN </h1>
          <img src={logo} alt="Logo hamburguesa" height={200} width={250}></img>
          <h2> MESERO 1</h2>
        </div>
      </main>
    )
}
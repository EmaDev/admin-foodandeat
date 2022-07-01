import { useState } from "react";
import { Modal } from "./components/Modal";
import { Product, Products } from "./components/Products";

const initialState = { id: '', img: '', ingredients: '', name: '', price: 0 };
function App() {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Product>(initialState);
  const [anyChangeInProducts, setAnyChangeInProducts] = useState<number>(0);

  const openModalWithData = (data: Product) => {
    setModalIsActive(true);
    setModalData(data);
  }

  const closeModal = () => {
    setModalIsActive(false);
    setModalData(initialState);
  }

  return (
    <>
      {
        (modalIsActive) &&
        <Modal
          dataProduct={modalData}
          closeModal={closeModal}
          setChangeInProds={() => setAnyChangeInProducts((prev) => prev + 1)}
        />
      }
      <div className="marginGlobal">
        <h1>Administrador</h1>
        <Products
          setDataModal={openModalWithData}
          openModal={() => setModalIsActive(true)}
          anyChanges={anyChangeInProducts}
          setChangeInProds={() => setAnyChangeInProducts((prev) => prev + 1)}
        />
      </div>
    </>
  );
}

export default App;

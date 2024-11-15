import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import OrderCard from '../../components/Cards/OrderCard';
import Modal from "react-modal";
import AddOrderCard from './AddOrderCard';

const Home = () => {
  const [openAddEditJob, setOpenAddEditJob] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const toggleModal = () => {
    setOpenAddEditJob(prevState => ({
      ...prevState,
      isShown: !prevState.isShown
    }));
  };

  return (
    <>
      <Navbar />


      <OrderCard />
      <div className='flex justify-center mt-10'>
      <button
        className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        onClick={() => {
          setOpenAddEditJob({ isShown: true, type: 'add', data: null });
        }}
      >
        Post a Job
      </button></div>

      <Modal
        isOpen={openAddEditJob.isShown}
        onRequestClose={toggleModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
        }}
        className="custom-modal-class"
      >
        <AddOrderCard toggleModal={toggleModal} />
      </Modal>
    </>
  );
};

export default Home;

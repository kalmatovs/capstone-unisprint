// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/mycomponents/Navbar/Navbar';
// import OrderCard from '../../components/mycomponents/Cards/OrderCard';
// import Modal from "react-modal";
// import AddOrderCard from './AddOrderCard';
// import axiosInstance from '@/utils/axiosInstance';
// import { Link } from 'react-router-dom';



// const Home = () => {
//   const [orders, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [openAddEditJob, setOpenAddEditJob] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   const fetchPosts = async () => {
//     try {
//         setLoading(true);
//         const response = await axiosInstance.get("/get-all-orders");
//         setPosts(response.data.orders);
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//     } finally {
//         setLoading(false);
//     }
// };

//   const toggleModal = () => {
//     setOpenAddEditJob(prevState => ({
//       ...prevState,
//       isShown: !prevState.isShown
//     }));
//   };

//   useEffect(() => {
//     fetchPosts();
// }, []);

// if (loading) {
//   return <p>Loading posts...</p>;
// }

//   return (
//     <>
//       <Navbar />

//       <div className='flex flex-row justify-center space-x-5'>
//       {orders && orders.length === 0 ? (
//                 <p>No posts available</p>
//             ) : (
//                 orders.map((order) => (
//                     <OrderCard
//                         // key={order._id}
//                         title={order.title}
//                         content={order.content}
//                         category={order.category}
//                         location={order.location}
//                         price={order.payment}
//                         urgency={order.urgency}
//                         date={order.datePosted}
//                     />
//                 ))
//             )} 
//             </div>  
//             <div className='flex justify-center mt-10'>
//       <button
//         className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
//       ><Link to={"/create-post"}>Post a Job</Link>
//       </button></div>

//       <Modal
//         isOpen={openAddEditJob.isShown}
//         onRequestClose={toggleModal}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)"
//           },
//         }}
//         className="custom-modal-class"
//       >
//       </Modal>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import Navbar from '../../components/mycomponents/Navbar/Navbar';
import OrderCard from '../../components/mycomponents/Cards/OrderCard';
import Modal from "react-modal";
import AddOrderCard from './AddOrderCard';
import axiosInstance from '@/utils/axiosInstance';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, CheckCircle, Users, Zap, Shield, ArrowRight } from 'lucide-react'


const Home = () => {
  const [orders, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [funFact, setFunFact] = useState("");

  const funFacts = [
    "Did you know? Students who study in groups perform 20% better on tests!",
    "Tip: A 25-minute focus followed by a 5-minute break boosts productivity.",
    "Fun Fact: College students drink 22 million cups of coffee every day!"
  ];

  const [openAddEditJob, setOpenAddEditJob] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const fetchPosts = async () => {
    try {
        setLoading(true);
        const response = await axiosInstance.get("/get-all-orders");
        setPosts(response.data.orders);
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        setLoading(false);
    }
  };

  const toggleModal = () => {
    setOpenAddEditJob(prevState => ({
      ...prevState,
      isShown: !prevState.isShown
    }));
  };

  const randomFunFact = () => {
    const index = Math.floor(Math.random() * funFacts.length);
    setFunFact(funFacts[index]);
  };

  useEffect(() => {
    fetchPosts();
    randomFunFact();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-row justify-center space-x-5 mt-5'>
        {orders && orders.length === 0 ? (
          <p>No posts available</p>
        ) : (
          orders.map((order) => (
            <OrderCard
              title={order.title}
              content={order.content}
              category={order.category}
              location={order.location}
              price={order.payment}
              urgency={order.urgency}
              date={order.datePosted}
            />
          ))
        )}
      </div>
      
      <div className='flex justify-center mt-10'>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          <Link to={"/create-post"}>Post a Job</Link>
        </button>
      </div>
      <div className="mt-10 text-center bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="font-bold text-lg mb-2">Fun Fact of the Day</h2>
        <p className="text-gray-700">{funFact}</p>
      </div>
      <Modal
        isOpen={openAddEditJob.isShown}
        onRequestClose={toggleModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
        }}
        className="custom-modal-class"
      ></Modal>
    </>
  );
};

export default Home;

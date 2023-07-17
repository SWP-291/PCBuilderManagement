import React from "react";
import "./newPc.css";

export default function NewPC() {
  return (
    <div className="newPC">
      <h1 className="addPcTitle">New PC</h1>
      <form className="addPcForm">
        <div className="addPcItem">
          <label>ID</label>
          <input type="text" placeholder="PC ID" />
        </div>
        <div className="addPcItem">
          <label>Name</label>
          <input type="text" placeholder="Name PC" />
        </div>
        <div className="addPcItem">
          <label>Description</label>
          <input type="text" placeholder="PC Description" />
        </div>
        <div className="addPcItem">
          <label>Price</label>
          <input type="text" placeholder="Price ID" />
        </div>
        <div className="addPcItem">
          <label>Discount</label>
          <input type="text" placeholder="Discount ID" />
        </div>
        <div className="addPcItem">
          <label>Template ID</label>
          <input type="text" placeholder="Template ID" />
        </div>
        <div className="addPcItem">
          <label>IsPublic</label>
          <input type="text" placeholder="IsPublic ID" />
        </div>
        <div className="addPcItem">
          <label>Design By</label>
          <input type="text" placeholder="Design PC" />
        </div>
        <div className="addPcItem">
          <label>Image</label>
          <input type="text" placeholder="Image" />
        </div>
        <button className="addPcButton">Create</button>
      </form>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import "./newPc.css";

// const URL = 'https://localhost:7262/api/PC';

// const initialState = {
//     name: '',
//     sumary: '', 
//     price: '',
//     discount: '',
//     templateId: '',
//     isPublic: '', 
//     designBy: '', 
//     image: '', 
// }

// const error_init = {
//     name_err: '',
//     sumary_err: '', 
//     price_err: '',
//     discount_err: '',
//     templateId_err: '',
//     isPublic_err: '', 
//     designBy_err: '', 
//     image_err: '', 
// }

// const NewPC = () => {

//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [state, setState] = useState(initialState);
//     const { name, sumary, price, discount, templateId, isPublic, designBy, image  } = state;
//     const [errors, setErrors] = useState(error_init);

//     // const getOnePc = async (id) => {
//     //     const res = await axios.get(`${URL}/${id}`);
//     //     if (res.status === 200) {
//     //         setState(res.data);
//     //     }
//     // }

//     // useEffect(() => {
//     //     if (id) getOnePc(id);
//     // }, [id]);

//     // const updatePc = async (pcId, data) => {
//     //     const res = await axios.put(`${URL}/${pcId}`, data);
//     //     if (res.status === 200) {
//     //         toast.success(`Updated Pc successfully ~`);
//     //         navigate('/dashboard');
//     //     }
//     // }

//     // const addNewPc = async (data) => {
//     //     const res = await axios.post(`${URL}`, data);
//     //     if (res.status === 200 || res.status === 201) {
//     //         toast.success("New Pc has been added successfully ~");
//     //         navigate('/dashboard');
//     //     }
//     // }

//     // validate
//     const validateForm = () => {
//         let isValid = true;
//         let errors = { ...error_init };

//         if (name.trim() === '' || name.length < 2) {
//             errors.name_err = 'Name is Required';
//             if (name.length < 2) {
//                 errors.name_err = 'Name must be more than 2 words';
//             }
//             isValid = false;
//         }

//         if (sumary.trim() === '') {
//             errors.sumary_err = 'Sumary is required';
//             isValid = false;
//         }

//         if (isNaN(price) || parseInt(price) < 1 || price === '') {
//             errors.price_err = 'Price must be a positive number and more than 0';
//             isValid = false;
//         }

//         if (isNaN(discount) || parseInt(discount) < 1 || discount === '') {
//           errors.discount_err = 'Discount must be a positive number and more than 0';
//           isValid = false;
//         }

//         if (parseInt(designBy) < 1 || parseInt(designBy) > 3 || designBy === '') {
//           errors.discount_err = '0 < Design by < 4';
//           isValid = false;
//         }

//         if (image.trim() === '') {
//             errors.image_err = 'Image is required';
//             isValid = false;
//         }

//         setErrors(errors);
//         return isValid;
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // if (validateForm()) {
//         //     if (id) updatePc(id, state);
//         //     else addNewPc(state);
//         // } else {
//         //     toast.error("Some info is invalid ~ Pls check again");
//         // }
//     }

//     const handleInputChange = (event) => {
//         let { name, value } = event.target;
//         setState((state) => ({ ...state, [name]: value }));
//     }

//     return (
//         <div className='container'>
//             <div className="form">
//                 <h2>{id ? "Update Form" : "Create Pc"}</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="name">Name: </label>
//                         <input type="text" name='name' value={state.name} onChange={handleInputChange} />
//                         {errors.name_err && <span className='error'>{errors.name_err}</span>}
//                     </div>
//                     <div>
//                         <label htmlFor="sumary">Sumary: </label>
//                         <input type="text" name='sumary' value={state.sumary} onChange={handleInputChange} />
//                         {errors.sumary_err && <span className='error'>{errors.sumary_err}</span>}
//                     </div>
//                     <div>
//                         <label htmlFor="price">Price: </label>
//                         <input type="number" name='price' value={state.price} onChange={handleInputChange} />
//                         {errors.price_err && <span className='error'>{errors.price_err}</span>}
//                     </div>
//                     <div>
//                         <label htmlFor="discount">Discount: </label>
//                         <input type="number" name='discount' value={state.discount} onChange={handleInputChange} />
//                         {errors.discount_err && <span className='error'>{errors.discount_err}</span>}
//                     </div>
//                     <div>
//                         <label htmlFor="templateId">Template ID : </label>
//                         <input type="number" name='templateId' value={state.templateId} onChange={handleInputChange} />
//                         {errors.templateId_err && <span className='error'>{errors.templateId_err}</span>}
//                     </div>
//                     <div>
//                         <label htmlFor="isPublic"> Is public ? </label>
//                         <input type="radio" id="true" name="isPublic" value={state.isPublic} onChange={handleInputChange}/>
//                         <label for="true">True</label>
//                         <input type="radio" id="false" name="isPublic" value={state.isPublic} onChange={handleInputChange}/>
//                         <label for="false">False</label>
//                     </div>
//                     <div>
//                         <label htmlFor="image">Image: </label>
//                         <input type="text" name='image' value={state.image} onChange={handleInputChange} />
//                         {errors.image_err && <span className='error'>{errors.image_err}</span>}
//                     </div>
//                     <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default NewPC();
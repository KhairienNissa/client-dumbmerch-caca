import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import AlertDelete from './alert';
import { API } from '../Config/api';
import { useQuery, useMutation } from 'react-query';



const Table = ({item, number}) => {
    const navigate = useNavigate()
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
  
    // Create init useState & function for handle show-hide modal confirm here ...
    // Modal Confirm delete data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.data;
      });
    
        const handleDelete = (id) => {
          setIdDelete(id);
          handleShow();
        };
      
        // Create function for handle delete product here ...
        // If confirm is true, execute delete data
        const deleteById = useMutation(async (id) => {
          try {
            await API.delete(`/category/${id}`);
            refetch();
          } catch (error) {
            console.log(error);
          }
        });
        // Call function for handle close modal and execute delete data with useEffect here ...
        useEffect(() => {
          if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
          }
        }, [confirmDelete]);
        
    return (
                <tr>
            <th scope="row px-2">{number}</th>
            <td>{item.name}</td>
            <td>
                <div className="row">
                <div className="col ">
                <button className='buttonEdit'  onClick={() => navigate(`/edit-category/${item.id}`)}>
                Edit </button></div>
                <div className="col">
                    <button className='buttonDelete'  onClick={() => {
                            handleDelete(item.id); }}>
                delete </button></div>
                
                <div className="col">
                <AlertDelete
                 setConfirmDelete={setConfirmDelete}
                 show={show}
                 handleClose={handleClose}/>
                </div>
                </div>

            </td>
            </tr>
    )
}
export default Table;





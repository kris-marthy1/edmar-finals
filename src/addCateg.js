import Container from 'react-bootstrap/Container';
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';

export default function ChildComponent({ onSendArrayToCateg }) {
    const [catToEdit, setCatToEdit] = useState('');
    const [catName, setCatName] = useState('');
    const [arrayToSend, setArrayToSend] = useState([]);
    const [id, setId] = useState(0);
  
    function SaveCateg() {
      if(catName === ''){ 
        alert('Enter Category')
        return;
      }else{
        setId(prevId => prevId + 1);
        setArrayToSend([...arrayToSend, [id, catName]]);
        setCatName(''); 
      }
      
    }
  
    function SaveEdit(id) {
      if(catName === ''){ 
        alert('Enter Category')
        return;
      }else{
        const updatedCateg = arrayToSend.map((item, index) => {
        if (index === id) {
          return [item[0], catName];
        }
        return item;
        });
    
        setArrayToSend(updatedCateg);
        setCatToEdit('');
        setCatName('');
      }
    }
  
    function Del(id) {
      const updatedArray = arrayToSend.filter((item , index) => index !== id);
      setArrayToSend(updatedArray); 
    }
  
    function handleEdit(index) {
      setCatToEdit(index);
      setCatName(arrayToSend[index][1]);
    }
  
    function handleInputChange(e) {
      setCatName(e.target.value);
    }
  
    // Function from parameter
    useEffect(() => {
      onSendArrayToCateg(arrayToSend);
    }, [arrayToSend, onSendArrayToCateg]);
  
    return (
      <Container>
        Name: 
        <input 
          value={catName}
          onChange={handleInputChange}
        /><br/>
        <button onClick={SaveCateg}>Send Array to Parent</button>
        <Table responsive striped="columns">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayToSend.map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>
                  {catToEdit === index ? (
                    <input 
                      value={catName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item[1]
                  )}
                </td>
                <td>
                  {catToEdit === index ? (
                    <button onClick={() => SaveEdit(index)}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => Del(index)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
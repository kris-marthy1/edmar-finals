import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';

export default function AddProduct({categList, onSendArrayToProd, prodList}){
    const [products, setProducts] = useState([]);
    const [prodInfo, setProdInfo] = useState({
        prodID : 0,
        prodName: '',
        prodPrice: 0,
        prodStocks: 0,
        category: -1
      })
      useEffect(() => {
        setProducts(prodList);
      }, [prodList]);
      
      useEffect(() => {
        onSendArrayToProd(products);
      }, [products, onSendArrayToProd]);
      
    const [editProdInfo, setEditProdInfo] = useState({
        prodName: '',
        prodPrice: 0,
        prodStocks: 0,
        category: 0
    })
    const [prodToEdit, setProdToEdit] = useState('');
    function Reset(){
        setProdInfo({...prodInfo,  
            prodName: '',
            prodPrice: 0,
            prodStocks: 0
        })
        setEditProdInfo({
            prodName: '',
            prodPrice: 0,
            prodStocks: 0,
            category: 0
        })
        setProdToEdit('');

    }
    function handleEdit(id){
        const editedProduct = products.find(prod => prod.prodID === id);

        if (editedProduct) {
            setEditProdInfo({
                prodName: editedProduct.prodName,
                prodPrice: editedProduct.prodPrice,
                prodStocks: editedProduct.prodStocks,
                category: editedProduct.category
            });
            setProdToEdit(id);
        } else {
            console.error('Product not found.');
        }
    }
    function Del(id){
        const updatedArray = products.filter(prod => prod.prodID !== id);
        setProducts(updatedArray);
    }
    function SaveEdit(id){
        if(editProdInfo.prodName === ''){
            alert("please fill")
        }else{
            const updatedProducts = products.map(product =>
                product.prodID === id
                  ? {
                      ...product,
                      prodName: editProdInfo.prodName,
                      prodPrice: editProdInfo.prodPrice,
                      prodStocks: editProdInfo.prodStocks,
                      category: editProdInfo.category
                    }
                  : product
              );
            
              setProducts(updatedProducts);
              Reset()
        }
    }

    console.log(products)
    return(
        <Container>
             ID: 
             <input 
                value={prodInfo.prodID+1}
                readOnly
            /><br/>
            Name: 
             <input 
                value={prodInfo.prodName}
                onChange={e => 
                   setProdInfo({...prodInfo, prodName: e.target.value})
                    
            }
                
            /><br/>
            Price: 
            <input 
                type='number'
                value={prodInfo.prodPrice}
                onChange={e => setProdInfo({...prodInfo, prodPrice: e.target.value})}
            /><br/>
            Stock:
            <input 
                type='number'
                value={prodInfo.prodStocks}
                onChange={e => setProdInfo({...prodInfo, prodStocks: e.target.value})}
            /><br/>
            <select
                  value={prodInfo.category}
                  onChange={e => setProdInfo({...prodInfo, category: parseInt(e.target.value)})}
                >
                    <option value=''>--Select Category--</option>
                    {categList.map((item, index) => (
                    <option value={item[0]}>{item[1]}</option>
                    ))}
               </select>
            <button onClick={() => 
                prodInfo.prodName === '' ? alert("Enter Name") : prodInfo.category === -1 ? alert('Enter Category') :
                [
                    setProdInfo({...prodInfo, prodID: prodInfo.prodID+=1}),
                    setProducts([...products, prodInfo]),
                    Reset()
                ]
                
            
            }>Add</button>
            
        <Table responsive striped="columns">
            <thead >
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {products.map(prod => 
                prodToEdit === prod.prodID ?
                (
                    <tr>
                    <td>
                        <input 
                            value={prod.prodID}
                            readOnly
                        />
                    </td>
                    <td>
                        <input placeholder={prod.prodName}
                            value={editProdInfo.prodName}
                            onChange={e => 
                            setEditProdInfo({...editProdInfo, prodName: e.target.value})}
                        />
                    </td>
                    
                    <td>
                        <input 
                            type='number'
                            value={editProdInfo.prodPrice}
                            onChange={e => setEditProdInfo({...editProdInfo, prodPrice: e.target.value})}
                        />
                    </td>
                    <td>
                        <input 
                            type='number'
                            value={editProdInfo.prodStocks}
                            onChange={e => setEditProdInfo({...editProdInfo, prodStocks: e.target.value})}
                        />
                    </td>
                    {
                    categList.map((items,index)=>
                      items[0] === prodInfo.category ?
                      (
                      <select
                        value={editProdInfo.category}
                        onChange={e => setEditProdInfo({...editProdInfo, category: parseInt(e.target.value)})}
                      >
                          <option value=''>--Select Category--</option>
                          {categList.map((item, index) => (
                          <option value={item[0]}>{item[1]}</option>
                          ))}
                     </select>
                     )
                      :
                      <></>
                    )}
                    <td>
                    {prodToEdit === prod.prodID ? (
                          <button onClick={() => SaveEdit(prod.prodID)}>Save</button>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(prod.prodID)}>Edit</button>
                            <button onClick={() => Del(prod.prodID)}>Delete</button>
                          </>
                        )}
                    </td>
                    </tr>
                  )
                  :
                  (
                    <tr>
                    <td>{prod.prodID}</td>
                    <td>{prod.prodName}</td>
                    <td>{prod.prodPrice}</td>
                    <td>{prod.prodStocks}</td>
                    {
                    categList.map((items,index)=>
                      items[0] === prod.category ?
                      <td>{items[1]}</td>
                      :
                      <></>
                    )}
                    <td>
                    {prodToEdit === prod.prodID ? (
                          <button onClick={() => SaveEdit(prod.prodID)}>Save</button>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(prod.prodID)}>Edit</button>
                            <button onClick={() => Del(prod.prodID)}>Delete</button>
                          </>
                        )}
                    </td>
                    </tr>
                  )
                  
            )}
            </tbody>
        </Table>
        </Container>
        
    )
}


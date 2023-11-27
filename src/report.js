// import React, { useState, useEffect }  from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/esm/Table';


export default function Report({ prodList, categList, report}){
   return(
    <Table>
    <thead>
        <tr>
            <th>Customer Name</th>
            <th>Item Name</th>
            <th>Stock</th>
            <th>Category</th>
        </tr>
    </thead>
    <tbody>
        {report.map(report=>(
          
          <tr>

            <td>{report.name}</td>
            {
                prodList.map(prod=>{
                    if(report.prodID === prod.prodID){
                        return(
                            <>
                                <td>{prod.prodName}</td>
                                <td>{report.stock}</td>

                               {
                                categList.map((item, index)=>{
                                    if(prod.category === item[0]){
                                        return (<td>{item[1]}</td>)
                                    }
                                    return null;
                                })
                                }
                            </>
                        )
                    }
                    return null;
                })
                }
          </tr>  
          
        ))}
    </tbody>
</Table>
   )
}

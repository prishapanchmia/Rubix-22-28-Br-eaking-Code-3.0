import React from 'react';
import { Alert, Table } from 'react-bootstrap';
import "./styles/Donate.css";

function Donate() {
  return(
  <div className='donatePage'>
        <div className='donateListFlex'>
      <div className='donateList'>
    <p className='intro'>Donate Item List</p>
            
            <div className='donate-list-items'> 
                <Table  className='donateTable'>
                    <thead  >
                        <tr>
                        <th className='itemColumn'>
                            Item
                        </th>
                        <th className='deleteColumn'>
                            Remove
                        </th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td>Burger</td>
                            <td><button className="deleteBtn">Delete </button></td>
                        </tr>
                        <tr>
                            <td>Kanda Bhaji</td>
                            <td><button className="deleteBtn">Delete </button></td>
                        </tr>
                        <tr>
                            <td>Pasta</td>
                            <td><button className="deleteBtn">Delete </button></td>
                        </tr>
                        <tr>
                            <td>Burger</td>
                            <td><button className="deleteBtn">Delete </button></td>
                        </tr>
                        <tr>
                            <td>French Fries</td>
                            <td><button className="deleteBtn">Delete </button></td>
                        </tr>
                    </tbody>
                </Table>
            
            
            </div> 
            <button className="donateBtn"> Donate 
            <Alert variant="success">
            <Alert.Heading>Thank you for donating your food!</Alert.Heading>
            <hr />
            <p className="mb-0">
                Your initiative to prevent food wastage is appreciated!
            </p>
            </Alert>
            </button>
        )
            </div>

            <div className='howWorks'>
              <h2 className='worksTitle'>How it works?</h2> 
              <img src='images/donate-how.png' className='howImage'  alt="donate" width="400"  />
            </div>
            </div> 
            <div className='donateBanner'>
          <img src='images/donate-png.png' className='flashImg' alt="donate" width="300"  />
          <div>
           <h1 className='bannerName'>DONATE FOOD TO AVOID WASTAGE</h1>
          </div>
            </div>
  </div>
  )
}

export default Donate;

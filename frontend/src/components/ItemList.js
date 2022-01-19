import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/CategoryItems.css';
import AddItem from './AddItem';
import { Button } from 'react-bootstrap';
import { QuantityPicker } from 'react-qty-picker';
import { updateItemQuantityAction } from '../actions';

function ItemList({ items, setItems, selectedCategory, byProducts }) {
  const dispatch = useDispatch();

  // modal states
  const { userId } = useSelector((state) => state.auth);
  const [modalShow, setModalShow] = useState(false);
  const [itemInput, setItemInput] = useState({
    name: '',
    expiryDate: Date.now(),
    quantity: 0,
    category: '',
    imageURL: '',
    userId
  });

  const currentItems = items.filter(
    (item) => item.category === selectedCategory.title
  );
  currentItems.map((curItem) => {
    curItem['byProduct'] = [];
    byProducts.map((bp) => {
      if (curItem.name === bp.itemName) {
        curItem.byProduct.push(bp);
      }
    });
  });

  const handleOnItemInputChange = (e) => {
    setItemInput({ ...itemInput, [e.target.name]: e.target.value });
  };

  const addItemOptions = {
    method: 'POST',
    body: JSON.stringify(itemInput),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const addItem = async () => {
    const response = await fetch('/api/items', addItemOptions);
    const data = await response.json();
    if (data.error === '') {
      setItemInput({
        name: '',
        expiryDate: Date.now(),
        quantity: 0,
        category: '',
        imageURL: ''
      });
      setItems([...items, data.newItem]);
      setModalShow(false);
    } else {
      alert(data.error);
    }
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    addItem();
  };

  return (
    <div className="btn-cards">
      <div className="addBtn">
        <Button
          className="modal-btn"
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Add Item
        </Button>
        <AddItem
          show={modalShow}
          itemInput={itemInput}
          handleOnItemInputChange={handleOnItemInputChange}
          handleAddItemSubmit={handleAddItemSubmit}
          onHide={() => setModalShow(false)}
        />
      </div>

      <div className="itemList">
        {currentItems.length === 0 && (
          <div className="noCatItems">
            <img
              src="images/product-not-found.jpg"
              alt="Product Not Found"
              width="600"
            />
          </div>
        )}
        {currentItems.map((item) => (
          <div className="catItems" key={item._id}>
            <div className="itemData">
              <div className="itemImage">
                {item.imageURL && (
                  <img
                    src={item.imageURL}
                    className="flashImg"
                    alt="abcd"
                    width="120"
                    height="120"
                  />
                )}
              </div>
              <div>
                <h3 className="itemName">
                  <b> {item.name}</b>
                </h3>
                <p className="itemInfo">
                  <span className="expDate">
                    <b>
                      Exp. Date : {new Date(item.expiryDate).getUTCDate()}/
                      {new Date(item.expiryDate).getUTCMonth() + 1}/
                      {new Date(item.expiryDate).getUTCFullYear()}
                    </b>
                  </span>

                  <QuantityPicker
                    value={item.quantity}
                    onChange={(value) => {
                      dispatch(
                        updateItemQuantityAction({
                          _id: item._id,
                          quantity: value
                        })
                      );
                    }}
                    min={0}
                    smooth
                  />
                  <br />
                  {item.calories && (
                    <>
                      <span className="calorieInfo">
                        Calories : {item.calories}{' '}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {item.byProduct &&
              item.byProduct.map((bp) => (
                <>
                  <p className="byData">
                    Use of By-Product: {bp.itemByproduct}
                    <br />
                    Details: {bp.use}
                  </p>
                </>
              ))}
            <div className="card-buttons">
              <button className="deleteBtn">Delete</button>
              <button className="donateBtn">Donate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;

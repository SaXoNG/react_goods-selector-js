import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const notSelectedTitle = (
    <h1 className="title is-flex is-align-items-center">No goods selected</h1>
  );

  const [titleElement, setTitle] = useState(
    <h1 className="title is-flex is-align-items-center">
      Jam is selected
      <button
        onClick={() => {
          setTitle(notSelectedTitle);
        }}
        data-cy="ClearButton"
        type="button"
        className="delete ml-3"
      />
    </h1>,
  );

  const [selectedElement, setSelectedElement] = useState([]);

  const removeItem = () => {
    setSelectedElement([]);
    setTitle(notSelectedTitle);
  };

  const addItem = item => {
    if (!selectedElement.includes(item)) {
      setSelectedElement([item]);
      setTitle(
        <h1 className="title is-flex is-align-items-center">
          {`${item} is selected`}
          <button
            onClick={() => {
              removeItem();
            }}
            data-cy="ClearButton"
            type="button"
            className="delete ml-3"
          />
        </h1>,
      );
    }
  };

  return (
    <main className="section container">
      {titleElement}

      <table className="table">
        <tbody>
          {goods.map(nameOfProduct => {
            const isSelected = selectedElement.includes(nameOfProduct);
            let something = '';

            if (isSelected) {
              something = 'has-background-success-light';
            }

            return (
              <tr data-cy="Good" className={something} key={nameOfProduct}>
                <td>
                  <button
                    onClick={() => {
                      if (isSelected) {
                        removeItem();
                      } else {
                        addItem(nameOfProduct);
                        setTitle(
                          <h1 className="title is-flex is-align-items-center">
                            {`${nameOfProduct} is selected`}
                            <button
                              onClick={() => {
                                removeItem();
                                setTitle(notSelectedTitle);
                              }}
                              data-cy="ClearButton"
                              type="button"
                              className="delete ml-3"
                            />
                          </h1>,
                        );
                      }
                    }}
                    data-cy="AddButton"
                    type="button"
                    className="button"
                  >
                    {isSelected ? '-' : '+'}
                  </button>
                </td>

                <td data-cy="GoodTitle" className="is-vcentered">
                  {nameOfProduct}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

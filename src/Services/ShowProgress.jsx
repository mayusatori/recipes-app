import React, { useEffect, useState } from 'react';
import { FcShare } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import favoriteRecipeFood, { favoriteRecipeDrink,
  getFavoriteRecipeFood } from './favoriteRecipe';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import finishRecipe from '../utils/FinishRecipe';
import '../css/details.css';

export default function ShowProgress({ recipe, ingredients, pathID, type }) {
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const [ingre, setIngre] = useState([]);
  const localStorageObj = (
    type === 'comidas' ? { alcoholicOrNot: '',
      area: recipe.strArea,
      category: recipe.strCategory,
      id: recipe.idMeal,
      image: recipe.strMealThumb,
      name: recipe.strMeal,
      tags: recipe.strTags,
      type: 'comida' } : { alcoholicOrNot: recipe.strAlcoholic,
      area: '',
      category: recipe.strCategory,
      id: recipe.idDrink,
      image: recipe.strDrinkThumb,
      name: recipe.strDrink,
      tags: recipe.strTags,
      type: 'bebida' }
  );

  useEffect(() => {
    // const checkedIngre = JSON.parse(localStorage.getItem('ingredientsCheck'));
    // if (checkedIngre[pathID]) {
    //   setIngre([...checkedIngre[pathID]]);
    // }
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', '[]');
    }
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', '[]');
    }
  }, [pathID]);

  function copyToClipboard() {
    const notify = () => toast('Link copiado!');
    const linkShare = `http://localhost:3000/${type}/${pathID}`;
    navigator.clipboard.writeText(linkShare);
    notify();
  }

  function checkStep({ target }) {
    const { value } = target;
    const findIngredient = ingre.find((search) => value === search);
    if (findIngredient) {
      const result = ingre.filter((ingredient) => ingredient !== value);
      setIngre(result);
      return;
    }
    setIngre([...ingre, value]);
    const test = [...ingre, value];
    const checkedIngre = JSON.parse(localStorage.getItem('ingredientsCheck'));
    localStorage.setItem('ingredientsCheck',
      JSON.stringify({ ...checkedIngre, [pathID]: test }));
  }

  // function onClickFunction() {
  //   const oldStore = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const check = oldStore !== [] && oldStore
  //     .find((element) => element.name === localStorageObj.name);
  //   if (check === undefined) {
  //     const newStore = [...oldStore, localStorageObj];
  //     localStorage.setItem('doneRecipes', JSON.stringify(newStore));
  //   }
  //   history.push('/receitas-feitas');
  // }

  return (
    <>
      <div className="details-img-container">
        <img
          src={ recipe.strDrinkThumb ? recipe.strDrinkThumb : recipe.strMealThumb }
          width={ 100 }
          alt="recipe"
          data-testid="recipe-photo"
          className="details-img"
        />
      </div>
      <div className="details-title-container">
        <h4 data-testid="recipe-title">
          { recipe.strDrink ? recipe.strDrink : recipe.strMeal}
        </h4>
        <p data-testid="recipe-category">
          { recipe.strAlcoholic ? recipe.strAlcoholic : recipe.strCategory }
        </p>
      </div>
      <h4 className="details-ingredientes-title">Preparo:</h4>
      <div className="progress-ingredients-container">
        { ingredients.map((ingredient, index) => (
          <ul key={ ingredient }>
            <li data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ ingredient[index] }>
                <input
                  type="checkbox"
                  name="ingredients"
                  id={ ingredient[index] }
                  value={ ingredient }
                  onChange={ checkStep }
                  defaultChecked={ ingre.find((value) => value === ingredient) }
                />
                { ingredient }
              </label>
            </li>
          </ul>
        )) }
      </div>
      <h4 className="how-to">Como fazer:</h4>
      <div className="desc-container">
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <div className="btn-container">
        <button type="button" className="copy-btn" onClick={ copyToClipboard }>
          <FcShare fontSize={ 40 } data-testid="share-btn" />
          <ToastContainer />
        </button>
        <button
          type="button"
          className="favorite-btn"
          onClick={ () => {
            setFavorite(!favorite);
            return type === 'bebidas' ? favoriteRecipeDrink([recipe], pathID)
              : favoriteRecipeFood([recipe], pathID);
          } }
        >
          { getFavoriteRecipeFood(pathID)
            ? <img src={ blackHeartIcon } alt="favorite" data-testid="favorite-btn" />
            : <img src={ whiteHeartIcon } alt="favorite" data-testid="favorite-btn" /> }
        </button>
      </div>
      <div className="separator" />
      <div className="details-footer">
        <div className="footer-flex">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="details-footer-btn"
            disabled={ ingre.length !== ingredients.length }
            // onClick={ () => history.push('/receitas-feitas') }
            onClick={ () => finishRecipe(history, localStorageObj) }
          >
            Finalizar Receita
          </button>
          <button
            type="button"
            className="details-footer-btn"
            onClick={ () => history.push('/comidas') }
          >
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}

ShowProgress.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  pathID: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

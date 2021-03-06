import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/mycontext';
import Filter from './Filter';
import Header from './Header';
import Footer from './Footer';
import ReceitaCard from './ReceitaCard';
import '../css/telaPrincipal.css';

export default function PageComidas() {
  const { meals, categoryStyle } = useContext(myContext);
  const NUMBER = 120;
  const URL_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const URL_FOODSCATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const TYPE = 'meals';
  const PAGE = 'comidas';
  const styleFilter = categoryStyle === true ? { display: 'none' } : { display: 'flex' };
  const styleMain = categoryStyle === true ? { display: 'flex' } : { display: 'none' };

  return (
    <div className="principal">
      <Header />
      <Filter
        urlCategory={ URL_CATEGORY }
        type={ TYPE }
        urlCategoryCard={ URL_FOODSCATEGORY }
        styleFilter={ styleFilter }
      />
      <br />
      <div className="cardContainer" style={ styleMain }>
        { meals.map((comida, index) => {
          if (index < NUMBER) {
            return (
              <Link
                to={ {
                  pathname: `/comidas/${comida.idMeal}`,
                  state: { name: comida.strMeal },
                } }
                key={ comida.idMeal }
                className="principalLink"
              >
                <ReceitaCard
                  thumb={ comida.strMealThumb }
                  index={ index }
                  name={ comida.strMeal }
                  page={ PAGE }
                  id={ comida.idMeal }
                />
              </Link>
            );
          }
          return false;
        }) }
      </div>
      <div className="separator" />
      <Footer />
    </div>
  );
}

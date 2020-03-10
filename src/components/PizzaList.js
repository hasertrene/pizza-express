import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux"
import './PizzaList.css'


const selectUser = reduxState => {
  console.log(reduxState)
  return reduxState.user;
};

const selectPizzas = (reduxState) => {
  return reduxState.pizzas;
}

const selectIngredients = reduxState => {
  return reduxState.user.ingredients;
}

const AllIngredients = reduxState => {
  return [
    ...new Set(reduxState.pizzas.flatMap(pz => pz.ingredients))]
}

export default function PizzaList() {
  const user = useSelector(selectUser);
  const pizzas = useSelector(selectPizzas)
  const ingredients = useSelector(AllIngredients)
  const dispatch = useDispatch()

  const [orderBy, set_orderBy] = useState("Popularity")
  const [zutaten, set_zutaten] = useState([])

  const checked = event => {
    const e = event.target.value
    zutaten.includes(e) 
    ? set_zutaten(zutaten.filter(item => item !== e))
    : set_zutaten(zutaten.concat(e))
  }

  const pizzaByIngredient = pizzas.filter(pizza => !zutaten.some(ingredient => pizza.ingredients.includes(ingredient)))

  const order = event => {
    set_orderBy(event.target.value)
  }
  
  switch(orderBy){
      case "Popularity":
        pizzaByIngredient.sort((a,b)=> b.bought - a.bought)
        console.log(pizzaByIngredient)
        break;
      case "Health":
        pizzaByIngredient.sort((a,b)=> a.ingredients.length - b.ingredients.length)
        console.log(pizzaByIngredient)
        break;
      case "Name":
        pizzaByIngredient.reverse().sort((a,b)=> a.name.toUpperCase() - b.name.toUpperCase())
        console.log(pizzaByIngredient)
        break;
      default:
        break;
    }
  
  return (
    <div className="list">
      <h1>Pizza Explorer</h1>
      <p>
      Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <div>
        <em>I don't want this ingredient:</em>
        <ul>
          {ingredients.map(item => {
            return ( 
              <li key={item}>
              {item}
                <input type="checkbox" value={item} onClick={checked}/>
              </li>
            )
          }
          )}
        </ul>
      </div>
      <p>
        <select onChange={order}>
          <option name="popularity" value="Popularity">Popularity</option>
          <option name="health" value="Health">Health</option>
          <option name="name" value="Name">Name</option>
        </select>
      </p>
      <div className="pizzas">
      <ul>{pizzaByIngredient.map(pizza => {
        const toggle = () => {
          dispatch({
            type: "TOGGLE_FAVORITE_PIZZA",
            payload: pizza.id
            });
          }
        const favorite = user.favorites.includes(pizza.id) ? '♥' : '♡'
        return(
          <li key={pizza.id}><p className="title">{pizza.name} <button onClick={toggle}>{favorite}</button></p>
          <p className="description">{pizza.description}</p>
          <p className="ordered">Ordered: {pizza.bought} times</p></li>
        )
      }
      )}</ul>
      </div>
    </div>
  );
}

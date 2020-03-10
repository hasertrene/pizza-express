// src/store/reducer.js
const initialState = {
  user: {
    name: "Helva",
    favorites: [
      161235,
      357311
    ]
  },
  pizzas: [
    {
      id: 161235,
      name: "Pizza Margherita",
      description:
        "The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.",
      bought: 5,
      ingredients: ["tomatoes", "mozzarella", "basil", "oil"]
    },
    {
      id: 67283,
      name: "Pizza Napoletana",
      description:
        "Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",
      bought: 2,
      ingredients: ["tomatoes", "mozzarella", "oil"]
    },
    {
      id: 357311,
      name: "Pizza Bianca",
      description:
        "White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.",
      bought: 10,
      ingredients: ["ricotta", "mozzarella", "garlic"]
    }
  ]
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_PIZZA": {
      // => Ask yourself: what is action.payload?
      return {
        ...state,
        pizzas: [
          ...state.pizzas,
          {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            ingredients: action.payload.ingredients,
            bought: 0
          }
        ]
      };
    }
    case "TOGGLE_FAVORITE_PIZZA":{
      console.log(action.payload)
      if(state.user.favorites.includes(action.payload)){
        return { 
          ...state, 
          user:{
            ...state.user,
              favorites:
                state.user.favorites.filter(id => id !== action.payload)
          }        
        }
      } else if(!state.user.favorites.includes(action.payload)) {
        return { 
          ...state, 
          user:{
            ...state.user,
            favorites:
                [...state.user.favorites, action.payload]
          }        
        }
      }
    }
    default: {
      return state;
    }
  }
}
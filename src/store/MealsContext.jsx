import { createContext, useEffect, useState } from 'react';

export const MealsContext = createContext({
    meals: []
});

async function loadMeals(setMeals) {
    const response = await fetch("http://localhost:3000/meals");
    const meals = await response.json();
    setMeals(meals);
}

export function MealsContextProvider({children}) {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        loadMeals(setMeals);
    }, []);

    const contextValue = {
        meals
    };

    return <MealsContext value={contextValue}>{children}</MealsContext>;
}
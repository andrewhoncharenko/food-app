import { use } from "react";
import { MealsContext } from "../../store/MealsContext";
import MealItem from "./MealItem";


export default function Meals() {
    
    const { meals } = use(MealsContext);

    return (
        <ul id="meals">
            {meals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );    
}
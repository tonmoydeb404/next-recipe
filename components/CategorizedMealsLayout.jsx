import React from "react";
import { Col, Row } from "react-bootstrap";
import useCategory from "../hooks/useCategory";
import MealCard from "./MealCard";

const CategorizedMealsLayout = ({ category = "" }) => {
  const { categoryLoading, categoryError, categoryData } =
    useCategory(category);

  if (categoryLoading && !categoryError && !categoryData) {
    return "loading...";
  }

  if (!categoryLoading && categoryError && !categoryData) {
    return "sorry something went to wrong :(";
  }

  return categoryData ? (
    <Row className="row-cols-4 g-3 py-5">
      {categoryData.map((meal) => (
        <Col key={meal.idMeal}>
          <MealCard
            title={meal.strMeal}
            image={meal.strMealThumb}
            url={`/${category.toLocaleUpperCase().split(" ").join("-")}/${
              meal.idMeal
            }`}
            className="h-100 shadow-sm"
          />
        </Col>
      ))}
    </Row>
  ) : (
    "loading..."
  );
};

export default CategorizedMealsLayout;

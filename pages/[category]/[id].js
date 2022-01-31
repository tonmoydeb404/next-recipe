import Head from "next/head";
import mealDB from "../../api/mealDB";
import MealDetails from "../../components/MealDetails";

const getData = async () => {
  const categoriesResponse = await mealDB.get("/categories.php");
  const categories = categoriesResponse.data.categories;

  const categoryData = await Promise.all(
    categories.map(async (category) => {
      const mealsResponse = await mealDB.get("/filter.php", {
        params: { c: category.strCategory.split(" ").join("-").toLowerCase() },
      });
      const meals = mealsResponse.data.meals;

      const mealsData = await Promise.all(
        meals.map((meal) => ({
          params: {
            id: meal.idMeal.toString(),
            category: category.strCategory.split(" ").join("-").toLowerCase(),
          },
        }))
      );

      return mealsData;
    })
  );

  const modifiedData = categoryData.reduce(
    (result, current) => result.concat(current),
    []
  );

  return modifiedData;
};

export const getStaticPaths = async () => {
  const paths = await getData();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await mealDB.get("/lookup.php", {
    params: { i: params.id },
  });
  const meals = await response.data.meals;

  const meal = {
    title: meals[0].strMeal,
    text: meals[0].strInstructions,
    tags: meals[0].strTags,
    category: meals[0].strCategory,
    area: meals[0].strArea,
    url: `${params.category}/${params.id}`,
    id: meals[0].idMeal,
    image: meals[0].strMealThumb,
    ytVideoID: meals[0].strYoutube
      ? new URL(meals[0].strYoutube).searchParams.get("v")
      : null,
  };

  return {
    props: {
      meal,
    },
  };
};

const MealId = ({ meal }) => {
  return (
    <>
      <Head>
        <title>{meal.title}</title>
        <meta name="description" content={meal.text} />
        {meal.tags ? <meta name="keywords" content={meal.tags} /> : ""}

        <meta property="og:title" content={meal.title} />
        <meta property="og:site_name" content="Next Recipe" />
        <meta property="og:url" content={`/${meal.url}`} />
        <meta property="og:description" content={meal.text} />
        <meta property="og:type" content="restaurant.menu" />
        <meta property="og:image" content={`${meal.image}`}></meta>
      </Head>
      <div className="py-5">
        <MealDetails
          title={meal.title}
          text={meal.text}
          tags={meal.tags ? meal.tags.split(",") : null}
          image={meal.image}
          ytVideoID={meal.ytVideoID}
          area={meal.area}
          category={meal.category}
        />
      </div>
    </>
  );
};

export default MealId;

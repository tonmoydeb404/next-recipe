import Head from "next/head";
import mealDB from "../../api/mealDB";
import CategorizedMealsLayout from "../../components/CategorizedMealsLayout";

export const getStaticPaths = async () => {
  const response = await mealDB.get("/categories.php");
  const categories = response.data.categories;

  // making paths
  const paths = categories.map((category) => {
    const modifiedUrl = category.strCategory.split(" ").join("-").toLowerCase();
    return {
      params: { category: modifiedUrl },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const response = await mealDB.get("/categories.php");
  const categories = response.data.categories;

  // inital category
  let categoryData = {};
  // filter through categories
  const filterCategory = categories.filter((cate) => {
    const categoryName = cate.strCategory.split(" ").join("-").toLowerCase();
    return categoryName === params.category;
  });
  // checking the filtered category
  if (filterCategory) {
    categoryData = {
      name: filterCategory[0].strCategory,
      text: filterCategory[0].strCategoryDescription,
      image: filterCategory[0].strCategoryThumb,
      url: params.category,
    };
  }

  return { props: { categoryData: categoryData } };
};

const Category = ({ categoryData }) => {
  return (
    <>
      <Head>
        <title>{categoryData.name}</title>
        <meta name="description" content={categoryData.text} />

        <meta property="og:title" content={categoryData.name} />
        <meta property="og:site_name" content="Next Recipe" />
        <meta property="og:url" content={`/${categoryData.url}`} />
        <meta property="og:description" content={categoryData.text} />
        <meta property="og:type" content="restaurant.menu" />
        <meta property="og:image" content={`${categoryData.image}`}></meta>
      </Head>

      <CategorizedMealsLayout category={categoryData.name} />
    </>
  );
};

export default Category;

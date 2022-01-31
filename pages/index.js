import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import mealDB from "../api/mealDB";
import MealCard from "../components/MealCard";

export const getStaticProps = async () => {
  const response = await mealDB.get("/categories.php");
  const data = await response.data;

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Next Recipe</title>
        <meta property="og:title" content={"Next recipe"} />
        <meta property="og:site_name" content="Next Recipe" />
        <meta property="og:url" content={`/`} />
        <meta property="og:description" content="next js project practice" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://media.cnn.com/api/v1/images/stellar/prod/211006114703-best-meal-delivery-service-freshly.jpg`}
        ></meta>
      </Head>

      {data ? (
        <Row className="row-cols-4 g-3 py-5">
          {data.categories.map((category) => (
            <Col key={category.idCategory}>
              <MealCard
                title={category.strCategory}
                text={category.strCategoryDescription}
                image={category.strCategoryThumb}
                url={`/${category.strCategory}`}
                className="h-100 shadow-sm"
              />
            </Col>
          ))}
        </Row>
      ) : (
        ""
      )}
    </>
  );
}

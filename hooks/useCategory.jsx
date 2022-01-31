import { useEffect, useState } from "react";
import mealDB from "../api/mealDB";

const useCategory = (category = "") => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (typeof category === "string" && category.length) {
      const fetchData = async () => {
        try {
          // setup initial data
          setLoading(true);
          setError(false);
          // get response
          const response = await mealDB.get("/filter.php", {
            params: { c: category },
          });
          const data = await response.data.meals;
          // update data
          setData(data);
          setLoading(false);
        } catch (err) {
          // handle error
          setError(true);
          setLoading(false);
          console.log(err);
        }
      };

      fetchData();
    }
  }, [category]);

  return { categoryLoading: loading, categoryError: error, categoryData: data };
};

export default useCategory;

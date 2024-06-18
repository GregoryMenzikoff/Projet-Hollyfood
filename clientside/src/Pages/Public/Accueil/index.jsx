import React, { useEffect, useContext, useRef, useState } from "react";
import Carrousel from "../../../Components/public/carrousel";
import { boxOfficeSort, lastReleaseSort } from "../../../Utils/sortFunction";
import apiFetch from "../../../Utils/apiFetch";
import MyState from "../../../Components/public/MyContext";

const Home = () => {
  const { recipes, setRecipes } = useContext(MyState);
  const [sortedBoxOfficeRecipes, setSortedBoxOfficeRecipes] = useState([]);
  const [sortedLastReleaseRecipes, setSortedLastReleaseRecipes] = useState([]);
  const slider = useRef();
  const slider2 = useRef();

  const getRecipes = async () => {
    try {
      const data = await apiFetch("recettes", {}, "GET");
      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      const sortedBoxOffice = boxOfficeSort([...recipes]);
      const sortedLastRelease = lastReleaseSort([...recipes]);
      setSortedBoxOfficeRecipes(sortedBoxOffice);
      setSortedLastReleaseRecipes(sortedLastRelease);
    }
  }, [recipes]);

  return (
    <>
      <main>
        <section>
          <h2 className="my-8 text-center lg:text-left lg:ml-16 font-bold text-4xl">
            Box office
          </h2>
          <Carrousel slider={slider} recipes={sortedBoxOfficeRecipes} />
          <div className="flex justify-center mt-14">
            <div className="mx-2">
              <button
              aria-label="afficher les recettes précédentes"
                className="bg-yellow-400 rounded-full hover:scale-110 p-1 shadow-lg shadow-yellow-600"
                onClick={() => slider?.current?.slickPrev()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                </svg>
              </button>
            </div>
            <div className="mx-2">
              <button
              aria-label="afficher les recettes suivantes"
                className="bg-yellow-400 rounded-full hover:scale-110 p-1 shadow-lg shadow-yellow-600"
                onClick={() => slider?.current?.slickNext()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
        <section>
          <h2 className="my-8 text-center lg:text-left lg:ml-16 font-bold text-4xl">
            Dernières sorties
          </h2>        
          <Carrousel slider={slider2} recipes={sortedLastReleaseRecipes} />
          <div className="flex justify-center my-10">
            <div className="mx-2">
              <button
              aria-label="afficher les recettes précédentes"
                className="bg-yellow-400 rounded-full hover:scale-110 p-1 shadow-lg shadow-yellow-600"
                onClick={() => slider2?.current?.slickPrev()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                </svg>
              </button>
            </div>
            <div className="mx-2">
              <button
              aria-label="afficher les recettes suivantes"
                className="bg-yellow-400 rounded-full hover:scale-110 p-1 shadow-lg shadow-yellow-600"
                onClick={() => slider2?.current?.slickNext()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

import { FC, useCallback, useEffect, useState } from "react";
import { DELETE_RECIPE, SHOW_RECIPES } from "views/util/constants";
import { deleteApi, getApi } from "views/util/fetch";
import { Recipe } from "..";

interface Props {
  added: boolean | undefined;
  setAdded: (added: boolean | undefined) => void;
}

export const RecipeListScreen: FC<Props> = ({added, setAdded}) => {
  const [recipePage, setRecipePage] = useState<Recipe[]>([]);
  const [,setDeleted] = useState<boolean>(false);

  const deleteRecipe = async (recipesId: number | undefined) => {
    await deleteApi(DELETE_RECIPE + "/" + recipesId).then(async (response) => {
      await response.json();
    });
    setDeleted(true);
  };

  const fetchData = useCallback(async (): Promise<void> => {
    await getApi(SHOW_RECIPES).then(async (response) => {
      const res = await response.json();
      setRecipePage(res);
    });
  }, [setRecipePage]);

  useEffect(() => {
    fetchData();
  }, [fetchData, added, setAdded, setRecipePage, setDeleted]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th> Recipe Name</th>
            <th> Recipe Type</th>
            <th> No. of People</th>
            <th> Ingredients</th>
            <th> Cooking Instructions</th>
            <th> Updated Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipePage && recipePage?.length > 0 ? (
            recipePage?.map((item, index) => {
              return (
                <tr key={index} style={{ backgroundColor: "#f2f2f2" }}>
                  <td>{item?.recipesName}</td>
                  <td>{item?.recipesType}</td>
                  <td>{item?.noOfPerson}</td>
                  <td>
                    {item?.selectedIngredientsList?.map((select: any) => {
                return select.selectedIngredientsName;
              })
              .join(", ")}
                  </td>
                  <td>{item?.cookingInstruction}</td>
                  <td>{item.updatedAt}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm('Do you want to delete this recipe?')) {
                            deleteRecipe(item.recipesId);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>No recipe found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

import React, { FC, useCallback, useEffect, useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import { ADD_RECIPE, GET_INGREDIENTS } from 'views/util/constants';
import { getApi, postApi } from 'views/util/fetch';
import { RecipeListScreen } from './recipeList';

export interface Recipe {
  recipesId?: number | undefined;
  recipesName?: string | undefined;
  recipesType?: string | undefined;
  noOfPerson?: number | undefined;
  cookingInstruction?: string | undefined;
  selectedIngredientsList?: SelectedIngredients[] | undefined;
  updatedAt?: Date;
  showSelectedIngredients?: string;
}

export interface SelectedIngredients {
  selectedIngredientId?: number | undefined;
  selectedIngredientsName?: string | undefined;
}

export const RecipeScreen: FC = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [ingredients, setIngredients] = useState<[]>();
  const [selected, setSelected] = useState<any[]>([]);
  const [added, setAdded] = useState<boolean | undefined>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postApi(ADD_RECIPE, recipe).then(async (response) => {
      setMessage("Recipe is added to the system");
      setAdded(true);
      await response.json();
    });
  };

  const fetchData = useCallback(async (): Promise<void> => {
    await getApi(GET_INGREDIENTS).then(async (response) => {
      const res = await response.json();
      if(res){
        const ingredientsList = res.map((item : any)=> {
          return { label: item.ingredientsName, value: item.ingredientId }
        })
        setIngredients(ingredientsList);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const select: SelectedIngredients[] | undefined = [];
    selected.map((item): number => select?.push({selectedIngredientId: item?.value, selectedIngredientsName: item?.label}))
    setRecipe((recipe) => ({
      ...recipe,
      selectedIngredientsList: select,
    }))
  }, [selected, setSelected]);

  const mystyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <div className='recipe-in-wrapper'>
        <h1>Please Enter recipe details</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Recipe Name : </span>
            <input
              type='text'
              onChange={(e) =>
                setRecipe((recipe) => ({
                  ...recipe,
                  recipesName: e.target.value,
                }))
              }
            />
          </label>
          <br />
          <br />
          <label>
            <span>Recipe Type : </span>
          </label>
          <label>
            <input
              type='radio'
              value='Veg'
              checked={recipe?.recipesType === 'Veg'}
              onChange={(e) =>
                setRecipe((recipe) => ({
                  ...recipe,
                  recipesType: e.target.value,
                }))
              }
            />
            Veg
          </label>
          <label>
            <input
              type='radio'
              value='Non-Veg'
              checked={recipe?.recipesType === 'Non-Veg'}
              onChange={(e) =>
                setRecipe((recipe) => ({
                  ...recipe,
                  recipesType: e.target.value,
                }))
              }
            />
            Non-Veg
          </label>
          <label>
            <br />
            <br />
            <span>No. of Person : </span>
            <input
              type='text'
              onChange={(e) =>
                setRecipe((recipe) => ({
                  ...recipe,
                  noOfPerson: parseInt(e.target.value),
                }))
              }
            />
          </label>

          <div style={mystyle}>
            <div>
          <label>
            <br />
            <br />
            <span>Ingredients : </span>

            <MultiSelect
              options={ingredients ? ingredients : []}
              value={selected}
              onChange={setSelected}
              labelledBy='Select'
            />
          </label>
          </div>
          </div>
          <label>
            <br />
            <br />
            <span>Cooking instructions : </span>
            <textarea
              onChange={(e) =>
                setRecipe((recipe) => ({
                  ...recipe,
                  cookingInstruction: e.target.value,
                }))
              }
            />
          </label>

          <div>
            <br />
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      <div>
          <br/>
          <span style={{color: 'green'}}>{message}</span>
        </div>
      <div className='recipe-list-in-wrapper'>
        <RecipeListScreen added={added} setAdded={setAdded}/>
      </div>
    </>
  );
};

'use client';
import { Recipe, Info } from 'libs/types';
import Image from 'next/image';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import localStorageService from 'libs/utils/localStorage';
import RecipeService from '@lib/service/RecipeService';
import {
  dietaryRequirements,
  initialRecipeState,
  units,
} from '@lib/service/data';
import styles from '@components/elements/recipe_elemnts/form_items/Form.module.scss';
import { InputField, AddButton, Dialog } from 'ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import RecipeFrom from '@components/elements/recipe_elemnts/form_items/logic';
import {
  Ingredient,
  IngredientContainer,
  StepContainer,
  TextArea,
} from '@components/elements/recipe_elemnts/form_items';
import ImageUpload from '@components/elements/ImageUpload';

const RecipeFromLayout = () => {
  const [recipe, dispatch] = useReducer(
    RecipeFrom.recipeReducer,
    initialRecipeState
  );
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  function handleChange(event: any) {
    dispatch({
      type: 'SET_' + event.target.name.toUpperCase(),
      payload: event.target.value,
    });
  }

  function handleImageChange(payload: any) {
    const imgUrl = payload[0]?.imgUrl;
    const imgAlt = payload[0]?.imgAlt;
    dispatch({ type: 'SET_IMAGE_URL', payload: imgUrl });
    dispatch({ type: 'SET_IMAGE_ALT', payload: imgAlt });
  }

  const handleArrayChange = (name: string, payload: string[]) => {
    dispatch({ type: 'SET_' + name.toUpperCase(), payload: payload });
  };

  async function setAdditionalInformation() {
    dispatch({ type: 'SET_ID', payload: recipe.recipeName });
    // dispatch({ type: 'SET_CREATED_BY', payload: 'Meally' });
    dispatch({ type: 'SET_CREATED_AT', payload: new Date() });
    dispatch({ type: 'SET_VERSION', payload: '1.0' });
    dispatch({
      type: 'SET_TOTAL',
      payload: parseInt(recipe.info.prep) + parseInt(recipe.info.cook),
    });
  }

  async function handleSubmit(event: any) {
    await event.preventDefault();
    await RecipeService.createRecipe(recipe).then((res) => console.log(res));
    console.log('recipe sent: ', recipe);
  }

  useEffect(() => {
    localStorageService.setLocal('recipe', recipe);
  }, [recipe]);

  useEffect(() => {
    if (recipe.recipeName !== '') {
      setAdditionalInformation();
    }
  }, [recipe.recipeName, recipe.info.prep, recipe.info.cook]);

  return (
    <>
      <div className="flex w-screen p-3">
        <div className="flex flex-col justify-center items-center">
          <h1>Recipe Creation Form</h1>
          <p>
            This is the recipe creation from before you start please read the
            conditions of use and tips for a better experience:
          </p>
          <ul>
            <li>
              If you refresh the page you will lose all your work (this will be
              change in the future)
            </li>
            <li>
              If you have any problems while creating a recipe please tell me
              before trying to submit
            </li>
            <li>
              If you have any improvement ideas please add them{' '}
              <a href="#">here</a>
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.recipeForm}>
        <InputField
          value={recipe.recipeName}
          type="text"
          required
          placeholder="Recipe name"
          name="recipe_name"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.prep}
          type="number"
          required
          placeholder="Prep Time in minutes"
          name="prep"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.cook}
          type="number"
          required
          placeholder="Cook TIme in minutes"
          name="cook"
          min="0"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.serves}
          type="number"
          required
          placeholder="Number of Serves"
          name="serves"
          min="0"
          onChange={handleChange}
        />
        <label className="flex flex-col">
          Dietary requirements
          <select
            name="dietary"
            id="dietary"
            value={recipe.dietary}
            onChange={handleChange}
          >
            {dietaryRequirements.map((dietaryRequirement, index) => (
              <option value={dietaryRequirement} key={index}>
                {dietaryRequirement}
              </option>
            ))}
          </select>
        </label>
        <TextArea
          name="allergens"
          label="contains:"
          onTagsChange={handleArrayChange}
          placeholder="E.g gluten, dairy, nuts"
        />
        <select
          name="sweet_savoury"
          id="sweet_savoury"
          value={recipe.sweet_savoury}
          onChange={handleChange}
        >
          <option value="sweet">sweet</option>
          <option value="savoury">savoury</option>
          <option value="both">both sweet and savoury</option>
        </select>

        <ImageUpload handleChange={handleImageChange} />
        <textarea
          value={recipe.recipeDescription}
          required
          placeholder="Recipe Description"
          name="recipe_description"
          onChange={handleChange}
        />
        <select
          name="meal_time"
          id="meal_time"
          value={recipe.meal_time}
          onChange={handleChange}
        >
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <TextArea
          name="keywords"
          label="keywords:"
          onTagsChange={handleArrayChange}
        />
        <InputField
          value={recipe.created_by}
          type="email"
          required
          placeholder="Email"
          name="created_by"
          onChange={handleChange}
        />

        <span className="w-full h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>

        <div className={styles.IngredientMethodContainer}>
          <IngredientContainer
            handleArrayChange={handleArrayChange}
            name="ingredients"
          />
          <StepContainer handleArrayChange={handleArrayChange} name="steps" />
        </div>

        <button type="submit" className="text-xl mt-14">
          Submit
        </button>
      </form>
    </>
  );
};

export default RecipeFromLayout;
import { Ingredient } from '@/src/common/types/recipe';
import React from 'react';
import { Checkbox } from '@components/ui/checkbox';

interface IngredientProps {
  ingredient: Ingredient;
}

const Ingredient = ({ ingredient }: IngredientProps) => {
  return (
    <div className="flex flex-row items-center py-1 gap-3">
      {/*TODO:change the style of this checkbox */}
      <input type="checkbox" id='checkbox' className='w-4 h-4 checked:text-white border-white rounded-xl' />
      <h3>
        {ingredient.title} {ingredient.quantity} {ingredient.amount}{' '}
        {ingredient.unit}
      </h3>
    </div>
  ); 
};

export default Ingredient;

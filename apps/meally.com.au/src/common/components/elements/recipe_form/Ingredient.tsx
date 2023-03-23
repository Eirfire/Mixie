import { TrashIcon } from '@heroicons/react/24/outline';
import { index } from 'mathjs';
import { useEffect, useState } from 'react';
import { AddButton, InputField } from 'ui';
import styles from './Form.module.scss';
import { units } from '@lib/service/data';

/* 
====================================
          Interfaces
====================================
*/

interface IngredientProps {
  index: number;
  value: string;
  handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

interface CupSelectProps {
  unit: string;
  value: string | undefined;
  handleChange: (data: any) => void;
}

/* 
====================================
        Amount component
====================================
*/

const CupSelect = ({ unit, value, handleChange }: CupSelectProps) => {
  const [cupSelect, setCupSelect] = useState<undefined | string>('');

  useEffect(() => {
    handleChange(cupSelect);
  }, [cupSelect]);

  if (unit.trim() == 'cup') {
    return (
      <select
        value={value || cupSelect}
        onChange={(event: any) => setCupSelect(event)}
        name="select"
      >
        <option value=""></option>
        <option value="1/4">1/4 cup</option>
        <option value="1/2">1/2 cup</option>
        <option value="3/4">3/4 cup</option>
      </select>
    );
  }

  return false;
};

/* 
====================================
          Ingredient
====================================
*/

const Ingredient = ({
  index,
  value,
  handleChange,
  handleDelete,
}: IngredientProps) => {
  const [ingredientArray, setIngredientArray] = useState<string>('');
  const [ingredientItem, setIngredientItem] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [cupSelect, setCupSelect] = useState<string>('');
  const [unit, setUnit] = useState<string>('gram');

  useEffect(() => {
    handleChange(index, ingredientArray);
  }, [ingredientArray]);

  useEffect(() => {
    setIngredientArray(`${ingredientItem} ${amount} ${unit}`);
  }, [ingredientItem, amount, unit]);

  useEffect(() => {
    setAmount(`${amount} ${cupSelect}`);
  }, [cupSelect]);

  return (
    <section key={index} className={styles.ingredient}>
      <input
        // value={recipe.recipeDescription}
        type="text"
        required
        placeholder="ingredient"
        name="ingredient"
        onChange={(event: any) => setIngredientItem(event.target.value)}
      />
      <select
        name="unit"
        id="unit"
        className=""
        value={unit}
        onChange={(event: any) => setUnit(event?.target.value)}
      >
        {units.map((unit, index) => {
          return (
            <option value={unit} key={index}>
              {unit}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        placeholder="Amount"
        min={0}
        value={amount.split(' ')[0] || amount}
        onChange={(event: any) => setAmount(event.target.value)}
      />
      {/* <CupSelect
        handleChange={handleAmountChange}
        value={cupSelect}
        unit={unit}
      /> */}
      {unit == 'cup' && (
        <select
          name="select"
          id="select"
          value={cupSelect}
          onChange={(event: any) => setCupSelect(event?.target.value)}
        >
          <option value=" "></option>
          <option value="1/4">1/4 cup</option>
          <option value="1/2">1/2 cup</option>
          <option value="3/4">3/4 cup</option>
        </select>
      )}
      <button onClick={() => handleDelete(index)} type="button">
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Ingredient };
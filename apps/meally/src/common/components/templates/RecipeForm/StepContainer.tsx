import React, { useCallback } from 'react';

import { Step } from './Step';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { DraggAbleCard } from './Dragableitem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '../../ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { recipeFormSchema } from './form';
import * as z from 'zod';

const StepContainer = () => {
  const { control } = useFormContext<z.infer<typeof recipeFormSchema>>();
  const { fields, append, remove, move } = useFieldArray<
    z.infer<typeof recipeFormSchema>
  >({
    control,
    name: 'steps',
  });

  const handleDelete = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleAddClick = useCallback(() => {
    append({ step_body: '' });
  }, [append]);

  const handleSwap = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      move(sourceIndex, targetIndex);
    },
    [move]
  );

  return (
    <section className="w-full flex flex-col gap-2">
      <DndProvider backend={HTML5Backend}>
        {fields.map((field, index: number) => {
          return (
            <DraggAbleCard
              key={field.id}
              index={index}
              id={field.id}
              acceptType="step"
              moveCard={handleSwap}
            >
              <Step index={index} handleDelete={handleDelete} key={field.id} />
            </DraggAbleCard>
          );
        })}
      </DndProvider>
      <Button
        ariaLabel="Add an Step"
        className="flex flex-row items-center gap-2 h-9 text-step--2 mt-3 border rounded-xl"
        onClick={() => handleAddClick()}
        name="Ingredient"
        type="button"
        variant={'secondary'}
      >
        <PlusCircleIcon className="w-5 h-5" />
        Add Step
      </Button>
    </section>
  );
};

export { StepContainer };
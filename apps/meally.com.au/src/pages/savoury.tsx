import React from 'react';
import styles from '@styles/modules/Home.module.scss';
import Navbar from '@components/elements/Navbar';
import Footer from '@components/elements/Footer';
import Algolia_Search_Dialog from '@components/elements/algolia_search_dialog';
import { CardSquare } from '@components/elements/Cards';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types';
import { PageSeo } from 'ui';
import { NextPage } from 'next';

interface SavouryProps {
  savoury: Recipe[];
}

const Savoury: NextPage<SavouryProps> = ({ savoury }: SavouryProps) => {
  return (
    <>
      <PageSeo
        title="Meally Cook, Collaborate & Create"
        url="meally.com.au"
        imgUrl=""
        description="A directory of folder full things."
      />
      <Navbar />
      <main className="flex flex-col gap-4 w-full h-full p-2">
        <section className={styles.heroSection}>
          <h1 className={`${styles.heroTitle} pb-2`}>Want Tasty Recipes</h1>
          <Algolia_Search_Dialog buttonType="searchBar" />
        </section>
        <section className="grid grid-flow-dense ">
          {/* {savoury.map((item: Recipe) => (
            <CardSquare
              title={item.recipeName}
              totalTime={item.info.total}
              key={item.id}
              handleClick={() => console.log('clicked')}
              image={{
                imgUrl: item.image.imgUrl || '',
                imgAlt: item.image.imgAlt || '',
              }}
            />
          ))} */}
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSquare
              title="Recipe Name"
              totalTime={20}
              key={i}
              handleClick={() => console.log('clicked')}
              image={{
                imgUrl: '',
                imgAlt: '',
              }}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const savoury = await RecipeService.getRecipesByCategory('savoury', 1000);
  return {
    props: {
      savoury: savoury,
    },
  };
}

export default Savoury;

alter table "public"."blog" add column "slug" text not null;

CREATE UNIQUE INDEX blog_slug_key ON public.blog USING btree (slug);

CREATE UNIQUE INDEX blog_title_key ON public.blog USING btree (title);

alter table "public"."blog" add constraint "blog_slug_key" UNIQUE using index "blog_slug_key";

alter table "public"."blog" add constraint "blog_title_key" UNIQUE using index "blog_title_key";



create type "public"."user_role" as enum ('user', 'admin');

create table "public"."profiles" (
    "profile_id" uuid not null,
    "full_name" text,
    "profile_picture" text,
    "bio" text,
    "first_name" text,
    "last_name" text,
    "user_name" text,
    "email" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "user_role" user_role not null default 'user'::user_role
);


CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (profile_id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (profile_id, full_name, profile_picture, bio, first_name, last_name, user_name, email)
  values (
        new.id,
        new.raw_user_meta_data ->> 'full_name',
        new.raw_user_meta_data ->> 'picture',
        null,
        new.raw_user_meta_data ->> 'first_name',
        new.raw_user_meta_data ->> 'last_name',
        null,
        new.email
    );
  return new;
end;
$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";



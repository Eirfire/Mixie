-- Blog table to store blog posts
create type blog_type as enum ('blog', 'release', 'announcement', 'event');

create table blog (
    blog_id uuid not null primary key default gen_random_uuid(),
    title text not null,
    image_url text,
    image_alt text,
    content text not null,
    tags text[],
    blog_type blog_type not null default 'blog',
    author_id uuid not null references auth.users(id),
    published boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace view blog_view as select 
    b.blog_id,
    b.title,
    b.image_url,
    b.image_alt,
    b.content,
    b.tags,
    b.blog_type,
    b.author_id,
    a.raw_user_meta_data as author_meta,
    b.published,
    b.created_at,
    b.updated_at
from blog as b 
left join auth.users as a 
on b.author_id = a.id;

-- Documents table to store items such as privacy policy and terms of service
create type document_type as enum ('privacy_policy', 'terms_of_service');

create table documents (
    document_id uuid not null primary key default gen_random_uuid(),
    title text not null,
    content text not null,
    document_type document_type not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
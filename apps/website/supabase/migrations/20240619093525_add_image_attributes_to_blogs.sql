drop view blog_view;

alter table blog
drop column image_alt;


alter table blog
add column image_attributes json;

create or replace view blog_view as select 
    b.blog_id,
    b.title,
    b.image_url,
    b.image_attributes,
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

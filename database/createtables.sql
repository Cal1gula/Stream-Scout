create table Users (
id integer primary key,
login varchar(25) not null,
display_name varchar(25) not null,
broadcaster_type varchar(50) not null default '',
description varchar(300) not null default '',
profile_image_url varchar(300) not null default '',
offline_image_url varchar(300) not null default '',
view_count bigint
);

create table Games (
id int primary key,
name varchar(300) not null default '',
box_art_url varchar(300) not null default ''
);

create table UsersFollows (
from_id integer references Users (id),
to_id integer references Users (id),
followed_at	datetime not null
);

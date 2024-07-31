create table task (
  id integer primary key autoincrement,
  task_name text not null,
  display_number integer not null
);

create table task_history (
  id integer primary key autoincrement,
  task_id integer not null,
  datetime text not null,
  foreign key (task_id) references task(id) on delete cascade
);

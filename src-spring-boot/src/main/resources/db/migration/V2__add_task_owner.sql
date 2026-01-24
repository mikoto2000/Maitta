alter table task
  add column owner_login text not null default 'unknown';

create index if not exists idx_task_owner_login on task(owner_login);

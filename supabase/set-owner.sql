begin;

drop policy if exists moments_insert on public.moments;
create policy moments_insert on public.moments
  for insert to authenticated
  with check (
    -- 替换成 Authentication > Users 中你自己账号的 User UID。
    (select auth.uid()) = '00000000-0000-0000-0000-000000000000'::uuid
  );

commit;

begin;

do $$
declare
  -- 替换成 Authentication > Users 中你自己账号的 User UID，与 VITE_SUPABASE_OWNER_ID 一致。
  owner_id uuid := '00000000-0000-0000-0000-000000000000';
begin
  if owner_id = '00000000-0000-0000-0000-000000000000'::uuid then
    raise exception '请先把 owner_id 替换为作者的 Supabase User UID';
  end if;

  drop policy if exists moments_owner_read on public.moments;
  execute format(
    'create policy moments_owner_read on public.moments
      for select to authenticated
      using ((select auth.uid()) = %L::uuid)',
    owner_id
  );

  drop policy if exists moments_insert on public.moments;
  execute format(
    'create policy moments_insert on public.moments
      for insert to authenticated
      with check ((select auth.uid()) = %L::uuid)',
    owner_id
  );

  drop policy if exists moments_update on public.moments;
  execute format(
    'create policy moments_update on public.moments
      for update to authenticated
      using ((select auth.uid()) = %L::uuid)
      with check ((select auth.uid()) = %L::uuid)',
    owner_id,
    owner_id
  );
end;
$$;

commit;

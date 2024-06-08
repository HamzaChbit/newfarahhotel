"use client"
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';


import { ChangeEvent,  useTransition } from 'react';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <div className='rounded-3xl border-none bg-white  text-2xl font-semibold  cursor-pointer'>
     
      <select
     defaultValue={localActive}
        className='bg-transparent text-slate-700   outline-none rounded-lg border-none '
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en' className='text-slate-700 '>en</option>
        <option value='fr'  className='text-slate-700 '>fr</option>
      </select>
    </div>
  );
}
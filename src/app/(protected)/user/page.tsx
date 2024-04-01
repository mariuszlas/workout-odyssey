import { FC, Suspense } from 'react';

import { _t, Heading } from '@/components';
import { getUsernameFromCookie } from '@/server/helpers';
import { getAllUserData } from '@/server/services';
import { AccountSettings } from '@/views';

import { Sidebar } from './sidebar';

const StreamAccountSettings: FC = async () => {
    const data = await getAllUserData();
    return <AccountSettings data={data} />;
};

export default async function NewPage() {
    const username = getUsernameFromCookie();

    if (typeof username !== 'string') {
        return null;
    }

    return (
        <main className="mx-auto px-4 py-6">
            <Heading className="pb-8 md:px-4" value={_t.accountSettings} />

            <div className=" flex max-w-screen-lg gap-8 md:px-4">
                <div>
                    <Suspense
                        fallback={
                            <AccountSettings data={undefined} isLoading />
                        }
                    >
                        <StreamAccountSettings />
                    </Suspense>
                </div>

                <div className="visible hidden w-[30rem] lg:block">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
}

import type { FC } from 'react';

import { _t, InformationIcon, Text } from '@/components';

export const FileInfo: FC = () => (
    <div className="flex items-center gap-2 rounded-lg border-l-4 border-l-blue-600 bg-blue-100 p-2">
        <InformationIcon className="h-10 w-10 text-blue-600" />
        <Text className="text-info-content" value={_t.fileUploadInfo} />
    </div>
);

import { UserData } from '@/interfaces';

export interface Props {
    data?: UserData;
    isLoading?: boolean;
}

export enum ID {
    DISPLAY_NAME = 'displayName',
    EMAIL = 'email',
    PASSWORD = 'password',
    BASIC_INFO = 'basicInfo',
    ACCOUNT_DELETION = 'accountDeletion',
}

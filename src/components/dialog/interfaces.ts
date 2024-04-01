import { ReactNode } from 'react';

interface CommonProps {
    onClose: () => void;
    children?: ReactNode;
}

interface DialogProps extends CommonProps {
    isOpen: boolean;
}

export interface ModalHeaderProps extends CommonProps {
    className?: string;
}

export interface DrawerProps extends DialogProps {
    size?: 'sm' | 'md' | 'lg';
    unmount?: boolean;
}

export interface ModalProps extends DialogProps {
    full?: boolean;
    large?: boolean;
}

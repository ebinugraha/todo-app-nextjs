import { create } from 'zustand'
// make use modal using zustand

interface useModalType {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useModal = create<useModalType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))

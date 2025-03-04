import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"

type ModalProps = {
    title: string,
    open: boolean,
    children: React.ReactNode,
    onClose: () => void
}

export const Modal = ({open, children, onClose, title}: ModalProps) => {
    
    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={onChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
            </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}
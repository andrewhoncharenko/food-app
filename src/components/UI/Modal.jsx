import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"; 

export default function Modal({ open, onClose, children, className = "" }) {
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current;
        if(open) {
            modal.showModal();
        }
        
        return () => modal.close();

    }, [open]);

    return createPortal(<dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>{open ? children : null}</dialog>, 
        document.getElementById("modal"));
}
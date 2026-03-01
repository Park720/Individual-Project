import { useEffect } from 'react';

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title;
        return () => { document.title = 'Instagram'; };
    }, [title]);
}

export default useDocumentTitle;
// Scroll to top on React Routes
// Author: Samuel Adamson
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
    useEffect(() => {
        // Unlisten to historical page component
        const unlisten = history.listen(() => {
            // Scroll top (0,0)
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);
    
    return(null);
}

export default withRouter(ScrollToTop);
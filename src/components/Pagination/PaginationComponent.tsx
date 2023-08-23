import { useEffect, useState } from 'react';
import './styles.css';

interface PaginationComponentProps {
    total: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}

function PaginationComponent(props: PaginationComponentProps) {
    const { total, page, setPage } = props;
    const [numPages, setNumPages] = useState<number>(1);

    const getNumPages = () => {
        var qtdPages = Math.ceil(total/13);

        setNumPages(qtdPages === 0 ? 1 : qtdPages);
    }

    const fillPages = () => {
        var array:any = [];

        for(let i = 1; i <= numPages; i++) {
            array.push(<button key={i} onClick={() => setPage(i)} className={`number-button ${page == i && "active"}`}>{i}</button>)
        }

        return array;
    }

    useEffect(() => {
        getNumPages();
    }, [total]);

    return (
        <div className='pagination-container'>
            <button onClick={() => setPage(page-1)} disabled={page == 1} className='back-button'>{"<"}</button>
            {fillPages()}
            <button onClick={() => setPage(page+1)} disabled={page == numPages} className='next-button'>{">"}</button>
        </div>
    )
}

export default PaginationComponent;
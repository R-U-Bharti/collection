import { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const Pagination = ({ totalPages, jump, next, prev }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const goToNextPage = () => {
        if (currentPage < totalPages){
            setCurrentPage(currentPage + 1)
            next()
        };
    };
    const goToPreviousPage = () => {
        if (currentPage > 1){
            setCurrentPage(currentPage - 1)
            prev()
        };
    };
    const goToPage = (page) => {
        setCurrentPage(page);
        jump(page)
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, 5);
                pageNumbers.push('..');
                pageNumbers.push(totalPages);
            } else if (currentPage > 3 && currentPage < totalPages - 2) {
                pageNumbers.push(1, '...');
                pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
                pageNumbers.push('..');
                pageNumbers.push(totalPages);
            } else {
                pageNumbers.push(1, '..');
                pageNumbers.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="flex md:justify-center space-x-2 overflow-auto w-full">
            <button
                onClick={goToPreviousPage}
                className={`flex items-center gap-2 text-white pr-3 pl-2 py-1.5 border rounded-full text-sm ${currentPage === 1 ? 'cursor-not-allowed bg-zinc-300' : ' bg-[#132438] text-white'}`}
                disabled={currentPage === 1}
            >
                <span><IoIosArrowDropleft size={19} /></span> <span>Previous</span>
            </button>
            {renderPageNumbers().map((number, index) => (
                <button
                    key={index}
                    onClick={() => typeof number === 'number' && goToPage(number)}
                    className={`px-3 py-1 rounded-xl text-sm ${currentPage === number ? 'bg-[#E59515] text-white' : 'bg-slate-100'}`}
                    disabled={number === '...'}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={goToNextPage}
                className={`flex items-center gap-2 text-white pl-3 pr-2 py-1.5 border rounded-full text-sm ${currentPage === totalPages ? 'cursor-not-allowed bg-zinc-300' : ' bg-[#132438] text-white'}`}
                disabled={currentPage === totalPages}
            >
                <span>Next</span> <span><IoIosArrowDropright size={19} /></span>
            </button>
        </div>
    );
};
export default Pagination;
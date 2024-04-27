import closeIcon from './close.svg'

const SearchHistory = ({ items, onDelete, onSearchItemClick }) => {
    return (
        <div className="search-history">
            <h2>Search History</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {items.map((item, index) => (
                    <li key={index} onClick={() => onSearchItemClick(item)}>
                        {item}
                        <img
                            src={closeIcon}
                            alt='delete'
                            onClick={() => onDelete(index)} // Pass the index to the onDelete function
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default SearchHistory;
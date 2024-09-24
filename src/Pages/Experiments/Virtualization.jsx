import React, { useState, useRef, useEffect } from 'react';

const data = Array.from({ length: 1000000 }, (_, index) => new Object({ id: index, name: `Item ${index}` }));

const ITEM_HEIGHT = 35; // Height of each item
const VIEWPORT_HEIGHT = window.innerHeight; // Height of the visible area

const Virtualization = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const containerRef = useRef(null);
    const listRef = useRef(null); // Ref for the inner list container

    const calculateVisibleItems = () => {
        if (containerRef.current) {
            const scrollTop = containerRef.current.scrollTop;
            const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
            const endIndex = Math.min(
                data.length - 1,
                Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ITEM_HEIGHT)
            );

            console.log("ScrollTop: ", scrollTop, "\nItem Height: ", ITEM_HEIGHT, "\nViewport Height: ", VIEWPORT_HEIGHT, "\nTotal Height: ", data.length * ITEM_HEIGHT, "\nStart Index: ", startIndex, "\nEnd Index: ", endIndex)

            setVisibleItems(data.slice(startIndex, endIndex + 1));
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', calculateVisibleItems);

        // Initial calculation
        calculateVisibleItems();

        // Log dimensions of the list container
        if (listRef.current) {
            console.log('List container dimensions:', listRef.current.getBoundingClientRect());
        }

        return () => container.removeEventListener('scroll', calculateVisibleItems);
    }, []);

    const totalHeight = data.length * ITEM_HEIGHT;

    return (
        <div
            ref={containerRef}
            style={{ height: VIEWPORT_HEIGHT, overflowY: 'auto', position: 'relative' }}
        >
            <div
                ref={listRef} // Ref for the inner container
                style={{ height: totalHeight, width: '100%', position: 'relative' }}
            >
                {visibleItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            height: ITEM_HEIGHT,
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: 10,
                            position: 'absolute',
                            top: (index + Math.floor(containerRef.current.scrollTop / ITEM_HEIGHT)) * ITEM_HEIGHT // Positioning
                        }}
                    >
                        <span>{item.id}: {item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Virtualization;
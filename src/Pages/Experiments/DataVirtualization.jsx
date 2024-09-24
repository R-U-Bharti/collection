import { FixedSizeList } from 'react-window';

const DataVirtualization = () => {

  const data = Array.from({ length: 1000000 }, (_, index) => index);

  const renderRow = ({ index, style }) => {
    return (
      <div style={style} key={index}>
        {index} -&gt; DataVirtualization
      </div>
    );
  };

  return (
    <>
      <FixedSizeList
        height={700}
        itemCount={data.length} // Number of items in the data array
        itemSize={35} // Height of each item
        width={1000} // Width of the list viewport
      >
        {renderRow}
      </FixedSizeList>
    </>
  )
}

export default DataVirtualization
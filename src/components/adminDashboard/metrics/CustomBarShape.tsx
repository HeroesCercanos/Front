const CustomBarShape = ({ x, y, width, height, fill }: any) => {
  const centerX = x + width / 2;
  return (
    <path
      d={`M${x},${y + height} L${centerX},${y} L${x + width},${y + height} Z`}
      fill={fill}
    />
  );
};

export default CustomBarShape;

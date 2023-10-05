interface IGapProps {
    size: number;
}

export const Gap = ({size}: IGapProps) => {
    return <div style={{height: `${size.toString()}px`}} />;
};

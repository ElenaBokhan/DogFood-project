interface IGapProps {
    size: number;
}

export const Gap = ({size}: IGapProps) => <div style={{height: `${size.toString()}px`}} />;

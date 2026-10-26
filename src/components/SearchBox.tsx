
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({
  value,
  onChange,
}: SearchBoxProps) {
  return (
    <div className="search-box">
      <span aria-hidden="true">⌕</span>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search React, TypeScript, JavaScript..."
        aria-label="Search learning resources"
      />
    </div>
  );
}

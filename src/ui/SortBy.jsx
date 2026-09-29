import { useSearchParams } from "react-router-dom";

import Select from "./Select";

function SortBy({ options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || options[0]?.value || "";

  function handleChange(event) {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("sortBy", event.target.value);

    if (nextSearchParams.has("page")) {
      nextSearchParams.set("page", "1");
    }

    setSearchParams(nextSearchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
      aria-label="Sort items"
    />
  );
}

export default SortBy;

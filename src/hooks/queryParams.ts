import React from 'react';

function useQuery(search: string) {
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default useQuery;

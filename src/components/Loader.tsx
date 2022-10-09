import React from 'react';

export type LoaderProps = {
  isLoading: boolean
}

const Loader = ({ isLoading = false }: LoaderProps) => {
  return <div className={`${isLoading ? "block":"hidden"} text-6xl animate-pulse`}>
    ...
  </div>
}

export default Loader;
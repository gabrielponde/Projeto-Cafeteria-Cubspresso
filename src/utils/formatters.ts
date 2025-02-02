export const formatPrice = (value: number): string => {
    return (value / 100).toFixed(2).replace('.', ',');
  };
  
  export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
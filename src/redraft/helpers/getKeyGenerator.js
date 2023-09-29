// return a new generator wich produces sequential keys for nodes
const getKeyGenerator = () => {
  let key = 0;
  const keyGenerator = () => {
    const current = key;
    key += 1;
    return current;
  };
  return keyGenerator;
};

export default getKeyGenerator;
